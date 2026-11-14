import { createFileRoute, Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

const w = siteConfig.workshop;

export const Route = createFileRoute("/workshop_/thank-you")({
  head: () => ({
    meta: [{ title: "تم تسجيلك بالورشة | أحمد السقا" }, { name: "robots", content: "noindex" }],
  }),
  component: WorkshopThankYou,
});

function calendarUrl() {
  if (!w.startIso) return "";
  const start = new Date(w.startIso);
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const p = new URLSearchParams({ action: "TEMPLATE", text: `ورشة أحمد السقا: ${w.title}`, dates: `${fmt(start)}/${fmt(end)}`, details: "رابط الورشة بيوصلك عالواتساب والإيميل" });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function WorkshopThankYou() {
  const cal = calendarUrl();
  const steps = [
    {
      t: "شوف الواتساب والإيميل",
      d: "حتوصلك رسالة تأكيد، وقبل الورشة بيوم وبساعة حيوصلك الرابط",
    },
    {
      t: w.dateLabel ? `حط الموعد بتقويمك: ${w.dateLabel} · ${w.timeLabel}` : "الموعد حيوصلك أول ما يتحدد",
      d: "الورشة لايف، واللي بيحضر من أولها هو اللي ممكن أختاره للتجربة الحية",
      href: cal,
      cta: "ضيفها للتقويم",
    },
    {
      t: "جهّز سؤال واحد",
      d: "أكتر سؤال بيسألوك ياه عملاءك أو مرضاك، رح نشتغل عليه بالورشة",
    },
  ];
  return (
    <main className="flex min-h-screen items-center bg-navy px-5 py-16 text-cream">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-base font-semibold text-bronze">تم التسجيل</p>
        <h1 className="mt-4 text-4xl leading-[1.4] font-bold sm:text-6xl">مكانك محجوز</h1>
        <p className="mt-5 text-lg leading-[1.9] text-cream/75">باقي 3 شغلات صغيرة مشان ما تفوتك الورشة</p>

        <ol className="mt-10 space-y-4">
          {steps.map((s, i) => (
            <li key={s.t} className="rounded-[18px] border border-cream/15 bg-cream/[0.04] p-6">
              <span className="font-latin text-sm font-semibold tracking-[0.2em] text-bronze">0{i + 1}</span>
              <h2 className="mt-2 text-xl font-bold">{s.t}</h2>
              <p className="mt-2 text-base leading-[1.8] text-cream/70">{s.d}</p>
              {s.href && (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="focus-ring mt-4 inline-flex rounded-[10px] bg-bronze px-5 py-2.5 text-sm font-bold text-cream">
                  {s.cta}
                </a>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          {w.whatsappNumber && (
            <a href={`https://wa.me/${w.whatsappNumber}?text=${encodeURIComponent("سجّلت بالورشة")}`} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-[12px] bg-cream px-6 py-3.5 text-base font-bold text-navy">
              ابعتلي «سجّلت» عالواتساب
            </a>
          )}
          <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-[12px] border border-cream/25 px-6 py-3.5 text-base font-bold text-cream hover:bg-cream/10">
            تابعني على انستقرام
          </a>
          <Link to="/" className="focus-ring rounded-[12px] border border-cream/25 px-6 py-3.5 text-base font-bold text-cream hover:bg-cream/10">
            الموقع الرئيسي
          </Link>
        </div>
      </div>
    </main>
  );
}
