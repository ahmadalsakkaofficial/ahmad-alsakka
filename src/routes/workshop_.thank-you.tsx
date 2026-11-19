import { createFileRoute, Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { InstagramIcon, LinkedInIcon, TikTokIcon, YouTubeIcon } from "@/components/site/icons";

const w = siteConfig.workshop;

export const Route = createFileRoute("/workshop_/thank-you")({
  head: () => ({
    meta: [{ title: "تم تسجيلك بالندوة | أحمد السقا" }, { name: "robots", content: "noindex" }],
  }),
  component: WorkshopThankYou,
});

function calendarUrl() {
  if (!w.startIso) return "";
  const start = new Date(w.startIso);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const p = new URLSearchParams({ action: "TEMPLATE", text: `ندوة أحمد السقا: ${w.title}`, dates: `${fmt(start)}/${fmt(end)}`, details: "رابط الندوة بيوصلك عالواتساب والإيميل" });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function outlookUrl() {
  if (!w.startIso) return "";
  const start = new Date(w.startIso);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const p = new URLSearchParams({ path: "/calendar/action/compose", rru: "addevent", subject: `ندوة أحمد السقا: ${w.title}`, startdt: start.toISOString(), enddt: end.toISOString(), body: "رابط الندوة بيوصلك عالإيميل" });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${p.toString()}`;
}

const calBtn = "focus-ring inline-flex items-center justify-center rounded-[10px] px-4 py-2.5 text-sm font-bold";

function WorkshopThankYou() {
  const cal = calendarUrl();
  const steps = [
    {
      t: "شوف إيميلك",
      d: "وصلك إيميل تأكيد هلّق، وقبل الندوة بيوم وبساعة بيوصلك الرابط. إذا ما لقيته شيّك عالـ Spam أو Promotions",
    },
    {
      t: w.dateLabel ? `حط الموعد بتقويمك: ${w.dateLabel} · ${w.timeLabel}` : "الموعد حيوصلك أول ما يتحدد",
      d: "الندوة لايف، واللي بيحضر من أولها بياخد أكتر شي",
      href: cal,
      cta: "ضيفها للتقويم",
    },
    {
      t: "جهّز سؤال واحد",
      d: "أكتر سؤال بيسألوك ياه عملاءك أو مرضاك، رح نشتغل عليه بالندوة",
    },
  ];
  return (
    <main className="flex min-h-screen items-center bg-panel px-5 py-16 text-cream">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-base font-semibold text-bronze">تم التسجيل</p>
        <h1 className="mt-4 text-4xl leading-[1.4] font-bold sm:text-6xl">مكانك محجوز</h1>
        <p className="mt-5 text-lg leading-[1.9] text-cream/75">باقي 3 شغلات صغيرة مشان ما تفوتك الندوة</p>

        <ol className="mt-10 space-y-4">
          {steps.map((s, i) => (
            <li key={s.t} className="glow-card rounded-[18px] border border-cream/15 bg-cream/[0.04] p-6">
              <span className="font-latin text-sm font-semibold tracking-[0.2em] text-bronze">0{i + 1}</span>
              <h2 className="mt-2 text-xl font-bold">{s.t}</h2>
              <p className="mt-2 text-base leading-[1.8] text-cream/70">{s.d}</p>
              {s.href && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={`btn-shine ${calBtn} bg-bronze text-[#070707]`}>
                    Google Calendar
                  </a>
                  <a href="/workshop.ics" className={`${calBtn} border border-bronze/50 text-cream hover:bg-bronze/10`}>
                    آيفون / Apple
                  </a>
                  <a href={outlookUrl()} target="_blank" rel="noopener noreferrer" className={`${calBtn} border border-bronze/50 text-cream hover:bg-bronze/10`}>
                    Outlook
                  </a>
                  <a href="/workshop.ics" className={`${calBtn} text-cream/60 underline-offset-4 hover:underline`}>
                    تقويم تاني؟ نزّل الملف
                  </a>
                </div>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          {w.whatsappNumber && (
            <a href={`https://wa.me/${w.whatsappNumber}?text=${encodeURIComponent("سجّلت بالندوة")}`} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-[12px] bg-surface px-6 py-3.5 text-base font-bold text-navy">
              ابعتلي «سجّلت» عالواتساب
            </a>
          )}
          <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-shine focus-ring inline-flex items-center gap-2.5 rounded-[12px] bg-gradient-to-r from-[#833ab4] via-[#e1306c] to-[#f77737] px-6 py-3.5 text-base font-bold text-white">
            <InstagramIcon className="size-5" />
            تابعني على انستقرام
          </a>
          <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="تيك توك" className="focus-ring inline-flex size-[52px] items-center justify-center rounded-[12px] border border-cream/25 text-cream hover:border-bronze hover:text-bronze">
            <TikTokIcon className="size-5" />
          </a>
          <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="يوتيوب" className="focus-ring inline-flex size-[52px] items-center justify-center rounded-[12px] border border-cream/25 text-cream hover:border-bronze hover:text-bronze">
            <YouTubeIcon className="size-5" />
          </a>
          <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="لينكدإن" className="focus-ring inline-flex size-[52px] items-center justify-center rounded-[12px] border border-cream/25 text-cream hover:border-bronze hover:text-bronze">
            <LinkedInIcon className="size-5" />
          </a>
          <Link to="/" className="focus-ring rounded-[12px] border border-cream/25 px-6 py-3.5 text-base font-bold text-cream hover:bg-cream/10">
            الموقع الرئيسي
          </Link>
        </div>
      </div>
    </main>
  );
}
