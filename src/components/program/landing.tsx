import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { trackMetaEvent } from "@/lib/authority-engine/analytics";

const p = siteConfig.program;

/** The 14 days: each of the seven systems gets two days. */
const days = [
  { d: "1 و2", t: "مين انت؟", out: "جملة وحدة بتقول شو بتعمل ولمين، بيفهمها أي حدا بيفتح حسابك" },
  { d: "3 و4", t: "منجم الأفكار", out: "أفكار شهر كامل من أسئلة عملائك وشغلك اليومي" },
  { d: "5 و6", t: "السكربت", out: "سكربتات جاهزة بطريقة حكيك إنت، وأول تلت ثواني بتوقّف الناس" },
  { d: "7 و8", t: "يوم التصوير", out: "يوم تصوير واحد بالموبايل بيطلّع فيديوهات الشهر" },
  { d: "9 و10", t: "واجهة الثقة", out: "حسابك مرتب: البايو، المثبّتات، وشو بيلاقي العميل لما يدوّر عليك" },
  { d: "11 و12", t: "من المشاهد للعميل", out: "الطريق من الفيديو للرسالة للمكالمة، مكتوب وجاهز" },
  { d: "13 و14", t: "ماكينة الاستمرار", out: "خطة بسيطة حتى ما يوقف المحتوى أول ما ينضغط شغلك" },
];

const outcomes = ["جملة واضحة", "أفكار لشهر", "سكربتات جاهزة", "يوم تصوير خلّصته", "حساب بيحكي عنك"];

/** Value stack. Values are anchored on Ahmad's real prices ($120/hour session, $3,000/month service). */
const stackCore = [
  { t: "مين انت؟", v: 97 },
  { t: "منجم الأفكار", v: 97 },
  { t: "السكربت", v: 147 },
  { t: "يوم التصوير", v: 97 },
  { t: "واجهة الثقة", v: 97 },
  { t: "من المشاهد للعميل", v: 147 },
  { t: "ماكينة الاستمرار", v: 97 },
  { t: "4 لايفات معي لمراجعة شغلك (مسجّلة)", v: 480 },
  { t: "مجموعة المشتركين", v: 97 },
];

const bonuses = [
  { t: "فريق المحتوى على Claude", d: "Skills بتطلّعلك أفكار، وبتكتب السكربت بلهجتك، والهوكات والكابشن. بيشتغل على أي حساب Claude، حتى المجاني. بيوصلك يوم السكربت", v: 297 },
  { t: "بنك أفكار لكل الاختصاصات", d: "أفكار جاهزة لكل مهنة: طب، محاماة، استشارات، عقارات، مالية، هندسة، وموظفين", v: 97 },
  { t: "50 هوك عربي", d: "قوالب جاهزة، بتعبّي الفراغ وبتصوّر", v: 47 },
  { t: "دليل التصوير بالموبايل", d: "إعدادات الآيفون، الضو، والكاميرا الخلفية", v: 47 },
  { t: "قوالب واجهة الحساب", d: "بايو، منشورات مثبّتة، وهايلايتس لكل مهنة", v: 47 },
  { t: "رسائل من المتابع للعميل", d: "ردود جاهزة للكومنت والرسائل لحد حجز المكالمة", v: 47 },
];

const stackTotal = [...stackCore, ...bonuses].reduce((a, x) => a + x.v, 0);
const fmt = (n: number) => n.toLocaleString("en-US");

const fits = [
  "عندك خبرة بمجالك وما حدا بيعرف عنها أونلاين",
  "بلّشت محتوى ووقفت، أو ما بلّشت أبداً",
  "دكتور، محامي، مستشار، صاحب شركة، أو موظف بدّه يكبّر اسمه",
  "مستعد تعطي تقريباً ساعة باليوم لمدة أسبوعين",
];
const notFits = ["بدّك تصير مؤثر أو تجيب متابعين وبس", "بدّك حدا يعمل الشغل عنك (هاد إله خدمة تانية)", "ما عندك وقت أبداً هالأسبوعين"];

const faqs = [
  { q: "إمتى بيبلش وإمتى بيخلص؟", a: `${p.datesLabel}. مواعيد اللايفات الأربعة بتوصلك بعد التسجيل، ومنختارها بوقت المسا حسب توقيت الخليج.` },
  { q: "اللايفات بتتسجّل؟", a: "إي. كل لايف بيتسجّل وبيضل عندك، فإذا فاتك واحد بتتفرج عليه بعدين." },
  { q: "قديش بدّه وقت باليوم؟", a: "تقريباً ساعة. كل يوم في مهمة صغيرة، ويوم التصوير هو الأطول." },
  { q: "لازم أطلع بوجهي؟", a: "أحسن إذا طلعت، بس مو شرط من أول يوم. منلاقي الطريقة اللي بتريحك." },
  { q: "شو الفرق بينه وبين الخدمة الكاملة؟", a: `بالخدمة الكاملة أنا وفريقي منعمل الشغل عنك، وسعرها ${p.servicePrice} دولار (3 شهور). هون إنت بتعمله، وأنا بمشي معك.` },
  { q: "ليش السعر هيك؟", a: `لأنها الدفعة الأولى. السعر ${p.price} دولار لحد ما يسكّر التسجيل ${p.closesLabel}.` },
  { q: "الدفع صعب عليّ هلّق، شو بعمل؟", a: "ابعتلي رسالة على إنستغرام ومنشوف شو منعمل." },
];

function glowMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function BuyButton({ label = `سجّل بالبرنامج · ${p.price}$` }: { label?: string }) {
  const cls =
    "btn-shine focus-ring inline-flex w-full items-center justify-center rounded-[14px] bg-bronze px-8 py-4 text-lg font-bold text-[var(--ws-bg)] shadow-[0_10px_40px_-10px_rgba(var(--acc),0.8)] transition-transform hover:-translate-y-0.5 sm:w-auto";
  if (!p.checkoutUrl) {
    return (
      <Link to="/workshop" className={cls}>
        احجز مكانك بالندوة المجانية
      </Link>
    );
  }
  return (
    <a
      href={p.checkoutUrl}
      className={cls}
      onClick={() => trackMetaEvent("InitiateCheckout", { content_name: "program-14-days", value: Number(p.price), currency: "USD" })}
    >
      {label}
    </a>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="mt-10 space-y-3">
      {faqs.map((f, i) => (
        <li key={f.q} className="glow-card rounded-[18px] border border-white/10 bg-white/[0.04]" onMouseMove={glowMove}>
          <button
            type="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            className="focus-ring flex w-full items-center justify-between gap-4 rounded-[18px] px-6 py-5 text-start text-lg font-bold text-cream"
          >
            {f.q}
            <span className={`text-bronze transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          {open === i && <p className="px-6 pb-5 text-base leading-[1.9] text-cream/75">{f.a}</p>}
        </li>
      ))}
    </ul>
  );
}

export function ProgramLanding() {
  useEffect(() => {
    const pixelId = siteConfig.authorityEngine.metaPixelId;
    if (!pixelId || window.fbq) return;
    const f = function (...args: unknown[]) {
      (f as unknown as { queue: unknown[][] }).queue.push(args);
    } as unknown as ((...args: unknown[]) => void) & { queue: unknown[][] };
    f.queue = [];
    window.fbq = f;
    const sc = document.createElement("script");
    sc.async = true;
    sc.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(sc);
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
    window.fbq("track", "ViewContent", { content_name: "program-14-days" });
  }, []);

  return (
    <main data-ws-theme className="ws-theme min-h-screen overflow-hidden bg-[var(--ws-bg)] text-cream">
      {/* Hero */}
      <section className="relative px-5 pt-12 pb-10 sm:px-8 sm:pt-16">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--acc),0.28),transparent)] blur-2xl" />
        <div className="relative mx-auto grid w-full max-w-6xl items-end gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="pb-6 lg:pb-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-bronze/10 px-4 py-1.5 text-sm font-medium text-bronze">
              برنامج لايف · {p.datesLabel}
            </p>
            <h1 className="mt-6 text-[2.4rem] leading-[1.35] font-bold text-cream sm:text-[3.8rem] sm:leading-[1.25]">
              <mark className="rounded-[10px] bg-bronze px-2 text-[var(--ws-bg)]">14 يوم</mark> لتنعرف
            </h1>
            <p className="mt-5 text-xl leading-[1.7] text-cream/85 sm:text-2xl">
              منطبّق الأنظمة السبعة مع بعض، نظام نظام، لحتى الناس تعرف شو بتعمل وليش إنت
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {outcomes.map((o) => (
                <li key={o} className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-sm text-cream/85">
                  ✓ {o}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <BuyButton />
            </div>
            <p className="mt-3 text-sm text-cream/60">
              سعر الدفعة الأولى لحد ما يسكّر التسجيل {p.closesLabel}
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div aria-hidden className="absolute inset-x-6 bottom-0 top-16 rounded-full bg-[radial-gradient(closest-side,rgba(var(--acc),0.55),rgba(var(--acc),0.08)_70%,transparent)] blur-xl" />
            <img src="/images/ahmad-cutout.webp" alt="أحمد السقا" className="relative mx-auto w-full [mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
          </div>
        </div>
      </section>

      {/* The 14 days */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-cream sm:text-4xl">
            شو منعمل <span className="text-bronze">كل يومين</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-[1.9] text-cream/65">
            كل نظام إله يومين: يوم منفهمه، ويوم بتطبّقه على شغلك إنت
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {days.map((x) => (
              <li
                key={x.t}
                onMouseMove={glowMove}
                className="glow-card rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-[0_20px_60px_-35px_rgba(var(--acc),0.6)]"
              >
                <span className="text-sm font-bold text-bronze">
                  اليوم {x.d}
                </span>
                <h3 className="mt-2 text-xl font-bold text-cream">{x.t}</h3>
                <p className="mt-2 text-base leading-[1.8] text-cream/70">{x.out}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bonuses */}
      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-cream sm:text-4xl">
            وكمان <span className="text-bronze">بتاخد</span>
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bonuses.map((x) => (
              <li key={x.t} onMouseMove={glowMove} className="glow-card rounded-[20px] border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-cream">{x.t}</h3>
                  <span className="shrink-0 rounded-full bg-bronze/15 px-3 py-1 font-latin text-sm font-bold text-bronze" dir="ltr">${x.v}</span>
                </div>
                <p className="mt-2 text-base leading-[1.8] text-cream/70">{x.d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-cream/60">وشهادة إتمام مني للي بيطبّق المهام (مو شهادة معتمدة من جهة رسمية)</p>
        </div>
      </section>

      {/* Fit */}
      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2">
          <div onMouseMove={glowMove} className="glow-card rounded-[20px] border border-bronze/35 bg-bronze/10 p-7">
            <h2 className="text-2xl font-bold text-cream">البرنامج إلك إذا</h2>
            <ul className="mt-5 space-y-3">
              {fits.map((f) => (
                <li key={f} className="flex gap-3 text-base leading-[1.8] text-cream/85">
                  <span className="text-bronze">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div onMouseMove={glowMove} className="glow-card rounded-[20px] border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-bold text-cream">مو إلك إذا</h2>
            <ul className="mt-5 space-y-3">
              {notFits.map((f) => (
                <li key={f} className="flex gap-3 text-base leading-[1.8] text-cream/70">
                  <span className="text-cream/40">✕</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Price */}
      <section className="relative px-5 py-16 sm:px-8">
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--acc),0.18),transparent)] blur-2xl" />
        <div className="glow-card glow-card--always relative mx-auto w-full max-w-2xl rounded-[24px] border border-bronze/40 bg-[color-mix(in_srgb,var(--ws-panel)_90%,transparent)] p-8 text-center shadow-[0_30px_80px_-30px_rgba(var(--acc),0.55)] sm:p-10">
          <h2 className="text-2xl font-bold text-cream sm:text-3xl">شو بتاخد بالزبط</h2>
          <ul className="mt-6 space-y-2 text-start">
            {[...stackCore, ...bonuses].map((x) => (
              <li key={x.t} className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 text-base text-cream/85">
                <span>{x.t}</span>
                <span className="font-latin text-cream/60" dir="ltr">${x.v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between text-lg font-bold text-cream">
            <span>المجموع</span>
            <span className="font-latin text-cream/60 line-through decoration-bronze/70" dir="ltr">${fmt(stackTotal)}</span>
          </div>
          <h3 className="mt-8 text-xl font-bold text-cream">سعر الدفعة الأولى</h3>
          <div className="mt-2 font-latin text-6xl font-bold text-bronze" dir="ltr">
            ${p.price}
          </div>
          <p className="mt-2 text-base text-cream/70">دفعة وحدة · {p.datesLabel}</p>
          <p className="mx-auto mt-5 max-w-md text-base leading-[1.9] text-cream/75">
            السعر هيك لحد ما يسكّر التسجيل {p.closesLabel}
          </p>
          <div className="mt-8">
            <BuyButton />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-cream sm:text-4xl">
            مين <span className="text-bronze">أحمد السقا</span>؟
          </h2>
          <p className="mt-6 text-base leading-[1.95] text-cream/75 sm:text-lg">
            12 سنة ورا الكاميرا بين دبي وكندا، من جريدة البيان وMotionArabia لوثائقي للجزيرة. اشتغلت مع عيادات وشركات
            ومكاتب استشارات، وحسابات عملاء وصلت لمئات آلاف المشاهدات من أول شهر
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-cream sm:text-4xl">
            عندك <span className="text-bronze">سؤال</span>؟
          </h2>
          <Faq />
          <div className="mt-12 text-center">
            <BuyButton />
          </div>
        </div>
      </section>
    </main>
  );
}
