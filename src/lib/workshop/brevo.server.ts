import { siteConfig } from "@/config/site";

const API = "https://api.brevo.com/v3";
const w = siteConfig.workshop;

async function brevo(path: string, init: RequestInit = {}) {
  const key = process.env["BREVO_API_KEY"];
  if (!key) throw new Error("missing BREVO_API_KEY");
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json", ...(init.headers ?? {}) },
  });
  const text = await res.text();
  const body = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`brevo ${path} ${res.status}: ${body?.message ?? text}`.slice(0, 300));
  return body;
}

let cachedListId: number | null = null;

async function workshopListId(): Promise<number> {
  if (cachedListId) return cachedListId;
  const lists = await brevo("/contacts/lists?limit=50&offset=0");
  const found = (lists.lists ?? []).find((l: { name: string }) => l.name === w.brevoListName);
  if (found) return (cachedListId = found.id);
  const folders = await brevo("/contacts/folders?limit=10&offset=0");
  let folderId: number | undefined = folders.folders?.[0]?.id;
  if (!folderId) folderId = (await brevo("/contacts/folders", { method: "POST", body: JSON.stringify({ name: "Webinars" }) })).id;
  const created = await brevo("/contacts/lists", { method: "POST", body: JSON.stringify({ name: w.brevoListName, folderId }) });
  return (cachedListId = created.id);
}

export async function addWorkshopContact(p: { name: string; email: string }) {
  const listId = await workshopListId();
  await brevo("/contacts", {
    method: "POST",
    body: JSON.stringify({ email: p.email, attributes: { FIRSTNAME: p.name }, listIds: [listId], updateEnabled: true }),
  });
}

export function workshopCalendarUrl() {
  if (!w.startIso) return "";
  const start = new Date(w.startIso);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: `ندوة أحمد السقا: ${w.title}`, dates: `${fmt(start)}/${fmt(end)}`, details: "رابط الندوة بيوصلك عالإيميل قبل ما نبلش" });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export function emailShell(inner: string) {
  return `<!doctype html><html dir="rtl" lang="ar"><body style="margin:0;background:#f4f1ea;font-family:Tahoma,Arial,sans-serif;color:#1f2937">
<div style="max-width:560px;margin:0 auto;padding:28px 18px">
<div style="background:#0a0f1a;border-radius:18px 18px 0 0;padding:22px 24px;color:#c4a06e;font-size:14px;font-weight:bold">أحمد السقا · ندوة مجانية لايف</div>
<div style="background:#ffffff;border-radius:0 0 18px 18px;padding:26px 24px;font-size:16px;line-height:1.9;text-align:right">${inner}</div>
<p style="text-align:center;color:#8a8478;font-size:12px;margin-top:18px">وصلك هالإيميل لأنك سجّلت بالندوة على ahmad-alsakka.com</p>
</div></body></html>`;
}

export async function sendWorkshopConfirmation(p: { name: string; email: string }) {
  const first = esc(p.name.split(/\s+/)[0] ?? p.name);
  const cal = workshopCalendarUrl();
  const html = emailShell(`
<p style="margin:0 0 14px">هلا ${first} 👋</p>
<p style="margin:0 0 14px">تم تسجيلك بالندوة: <strong>${esc(w.title)}</strong></p>
<div style="background:#f7f3ec;border-right:4px solid #c4a06e;border-radius:10px;padding:14px 16px;margin:0 0 18px">
<strong>${esc(w.dateLabel)}</strong><br>${esc(w.timeLabel)}<br>ساعة لايف، مجانية
</div>
<p style="margin:0 0 14px">رابط الدخول رح يوصلك عالإيميل قبل الندوة بيوم، ومرة تانية قبلها بساعة. فخلّي عينك عالإيميل، وإذا ما لقيته شيّك عالـ Spam أو Promotions.</p>
${cal ? `<p style="text-align:center;margin:22px 0"><a href="${cal}" style="background:#c4a06e;color:#0a0f1a;text-decoration:none;font-weight:bold;padding:13px 26px;border-radius:12px;display:inline-block">حطّها بالكالندر</a></p>` : ""}
<p style="margin:0 0 14px">وقبل الندوة، فكّر بسؤال واحد: <strong>إذا حدا شاف حسابك اليوم، بيعرف بثانيتين شو بتعمل وليش إنت؟</strong> جاوب عليه لحالك، ومنحكي فيه باللايف.</p>
<p style="margin:0">بشوفك هناك،<br>أحمد</p>`);
  await brevo("/smtp/email", {
    method: "POST",
    body: JSON.stringify({
      sender: { name: w.senderName, email: w.senderEmail },
      to: [{ email: p.email, name: p.name }],
      replyTo: { email: w.replyToEmail, name: w.senderName },
      subject: `تم تسجيلك ✅ ${w.title}`,
      htmlContent: html,
      tags: [w.key, "confirmation"],
    }),
  });
}
