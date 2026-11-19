import { siteConfig } from "@/config/site";
import { brevo, emailShell, workshopCalendarUrl } from "./brevo.server";

const w = siteConfig.workshop;
type Kind = "day" | "hour" | "live";
const MIN = 60_000;

const timesHtml = `<div style="background:#fff8e8;border-right:4px solid #F5B942;border-radius:10px;padding:14px 16px;margin:0 0 18px;line-height:2">
<strong>${w.dateLabel}</strong><br>
8 م السعودية والكويت وقطر والأردن وسوريا · 9 م الإمارات وعُمان<br>
7 م مصر ولبنان وفلسطين · 5 م لندن (GMT) · 12 الظهر تورنتو ونيويورك</div>`;

const btn = (href: string, label: string) =>
  `<p style="text-align:center;margin:22px 0"><a href="${href}" style="background:#F5B942;color:#070707;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:12px;display:inline-block;font-size:17px">${label}</a></p>`;

function content(kind: Kind): { subject: string; html: string } {
  const link = w.meetingUrl;
  if (kind === "day") {
    return {
      subject: `بكرا منلتقي 👋 ${w.title}`,
      html: emailShell(`
<p style="margin:0 0 14px">هلا {{params.FIRST}}،</p>
<p style="margin:0 0 14px">بكرا الندوة: <strong>${w.title}</strong></p>
${timesHtml}
${link ? btn(link, "رابط الدخول للندوة") + `<p style="margin:0 0 14px">احفظ الرابط، ورح ابعتلك ياه مرة تانية قبل الندوة بساعة.</p>` : `<p style="margin:0 0 14px">رابط الدخول بيوصلك عالإيميل بكرا قبل الندوة بساعة.</p>`}
${workshopCalendarUrl() ? `<p style="margin:0 0 14px">إذا لسا ما حطيتها بالكالندر، <a href="${workshopCalendarUrl()}" style="color:#b7841f">حطّها من هون</a>.</p>` : ""}
<p style="margin:0 0 14px">وجهّز سؤال واحد: <strong>شو أكتر سؤال بيسألوك ياه عملاءك أو مرضاك؟</strong> رح نشتغل عليه باللايف.</p>
<p style="margin:0">بشوفك بكرا،<br>أحمد</p>`),
    };
  }
  if (kind === "hour") {
    return {
      subject: `بعد ساعة منبلّش 🔴 هاد رابط الدخول`,
      html: emailShell(`
<p style="margin:0 0 14px">هلا {{params.FIRST}}،</p>
<p style="margin:0 0 14px">بعد ساعة بالزبط منبلّش <strong>${w.title}</strong></p>
${btn(link, "ادخل للندوة")}
<p style="margin:0 0 8px"><strong>مشان تطلع بأكتر شي:</strong></p>
<p style="margin:0 0 14px">• فوت قبل بـ 5 دقايق<br>• جيب ورقة وقلم، رح نكتب سوا<br>• إذا فيك، افتح من الكمبيوتر</p>
<p style="margin:0">بشوفك هلّق،<br>أحمد</p>`),
    };
  }
  return {
    subject: `بلّشنا هلّق 🔴 فوت`,
    html: emailShell(`
<p style="margin:0 0 14px">{{params.FIRST}}، بلّشنا هلّق.</p>
${btn(link, "ادخل للندوة")}
<p style="margin:0">لحقنا،<br>أحمد</p>`),
  };
}

function dueKinds(now: number): Kind[] {
  const start = new Date(w.startIso).getTime();
  const due: Kind[] = [];
  if (now >= start - 24 * 60 * MIN && now < start - 90 * MIN) due.push("day");
  if (w.meetingUrl && now >= start - 60 * MIN && now < start) due.push("hour");
  if (w.meetingUrl && now >= start && now < start + 20 * MIN) due.push("live");
  return due;
}

export async function runWorkshopTick(now = Date.now()) {
  if (!w.startIso) return { skipped: "no_date" };
  const kinds = dueKinds(now);
  if (!kinds.length) return { due: [] };
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: regs, error } = await supabaseAdmin
    .from("workshop_registrations" as never)
    .select("event_id,name,email")
    .eq("workshop_key" as never, w.key as never);
  if (error) throw new Error(`load registrations: ${error.message}`);
  const out: Record<string, number> = {};
  for (const kind of kinds) {
    const { data: sent } = await supabaseAdmin.from("workshop_reminders_sent" as never).select("event_id").eq("kind" as never, kind as never);
    const done = new Set(((sent ?? []) as { event_id: string }[]).map((r) => r.event_id));
    const seen = new Set<string>();
    const todo = ((regs ?? []) as { event_id: string; name: string; email: string }[]).filter((r) => {
      const key = r.email.trim().toLowerCase();
      if (done.has(r.event_id) || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (!todo.length) {
      out[kind] = 0;
      continue;
    }
    const { subject, html } = content(kind);
    for (let i = 0; i < todo.length; i += 900) {
      const chunk = todo.slice(i, i + 900);
      let status = "sent";
      try {
        await brevo("/smtp/email", {
          method: "POST",
          body: JSON.stringify({
            sender: { name: w.senderName, email: w.senderEmail },
            replyTo: { email: w.replyToEmail, name: w.senderName },
            subject,
            htmlContent: html,
            tags: [w.key, `reminder-${kind}`],
            messageVersions: chunk.map((r) => ({
              to: [{ email: r.email, name: r.name }],
              params: { FIRST: r.name.split(/\s+/)[0] || r.name },
            })),
          }),
        });
      } catch (e) {
        status = `error: ${(e as Error).message}`.slice(0, 300);
        console.error("reminder send failed", kind, status);
      }
      await supabaseAdmin
        .from("workshop_reminders_sent" as never)
        .upsert(chunk.map((r) => ({ event_id: r.event_id, kind, status })) as never, { onConflict: "event_id,kind" } as never);
    }
    out[kind] = todo.length;
  }
  return { due: kinds, sent: out };
}

export async function checkJobToken(request: Request) {
  const given = request.headers.get("x-job-token") ?? "";
  if (!given) return false;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("job_tokens" as never).select("token").eq("name" as never, "workshop_tick" as never).maybeSingle();
  const token = (data as { token?: string } | null)?.token;
  return !!token && token === given;
}
