import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { siteConfig } from "@/config/site";
import { submitWorkshopRegistration } from "@/lib/workshop/registration.functions";
import { trackAuthorityEvent, trackMetaEvent } from "@/lib/authority-engine/analytics";

const w = siteConfig.workshop;

const countries = [
  { label: "السعودية", code: "+966" },
  { label: "الإمارات", code: "+971" },
  { label: "الكويت", code: "+965" },
  { label: "قطر", code: "+974" },
  { label: "البحرين", code: "+973" },
  { label: "عُمان", code: "+968" },
  { label: "الأردن", code: "+962" },
  { label: "مصر", code: "+20" },
  { label: "كندا / أمريكا", code: "+1" },
  { label: "بلد تاني", code: "+" },
];

const professions = ["دكتور أو عيادة", "محامي أو مستشار", "محاسب أو مالي", "عقارات واستثمار", "صاحب شركة", "موظف بمجالي", "مجال تاني"];
const stages = ["ما بنزّل محتوى أبدًا", "بنزّل كل فترة وبوقف", "بنزّل بس ما عم يجيب عملاء"];

const learn = [
  { t: "مين انت؟", d: "شو الشي اللي بدك تنعرف فيه، بجملة بيفهمها أي حدا بيفتح حسابك" },
  { t: "منجم الأفكار", d: "أفكار شهر كامل من أسئلة عملائك، بدون ما تفتح ChatGPT" },
  { t: "السكربت", d: "أول تلت ثواني، وكيف تحكي متل ما بتحكي مو متل الـAI" },
  { t: "يوم التصوير", d: "بالموبايل، وبيوم واحد بالشهر" },
  { t: "واجهة الثقة", d: "شو بيلاقي العميل لما يدوّر عليك قبل ما يتصل" },
  { t: "من المشاهد للعميل", d: "الطريق من الفيديو للرسالة للمكالمة" },
  { t: "ماكينة الاستمرار", d: "كيف ما يوقف المحتوى أول ما ينضغط شغلك" },
];

function Chips({ options, value, onChange, name }: { options: string[]; value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`focus-ring rounded-full border px-4 py-2 text-sm transition-colors ${value === o ? "border-bronze bg-bronze text-[var(--ws-bg)]" : "border-white/20 text-cream/80 hover:border-bronze"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function glowMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}



const zones = [
  { c: "السعودية · الكويت · قطر · الأردن · سوريا", t: "8 م" },
  { c: "الإمارات · عُمان", t: "9 م" },
  { c: "مصر · لبنان · فلسطين", t: "7 م" },
  { c: "لندن (GMT)", t: "5 م" },
  { c: "تورنتو · نيويورك", t: "12 الظهر" },
];

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!w.startIso || now === null) return null;
  const diff = new Date(w.startIso).getTime() - now;
  if (diff <= 0) return null;
  return { d: Math.floor(diff / 86400000), h: Math.floor(diff / 3600000) % 24, m: Math.floor(diff / 60000) % 60, s: Math.floor(diff / 1000) % 60 };
}

function LocalTime() {
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!w.startIso) return;
    try {
      const d = new Date(w.startIso);
      const time = new Intl.DateTimeFormat("ar", { hour: "numeric", minute: "2-digit", numberingSystem: "latn" }).format(d);
      const day = new Intl.DateTimeFormat("ar", { weekday: "long", day: "numeric", month: "long", numberingSystem: "latn" }).format(d);
      setLabel(`${day}، الساعة ${time}`);
    } catch {
      /* ignore */
    }
  }, []);
  if (!label) return null;
  return (
    <p className="mt-3 text-sm text-cream/75">
      يعني عندك: <span className="font-bold text-bronze">{label}</span>
    </p>
  );
}

function TimeZones() {
  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-cream/60">الموعد حسب بلدك</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {zones.map((z) => (
          <li key={z.c} className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-sm text-cream/80">
            {z.c} <span className="font-bold text-bronze">{z.t}</span>
          </li>
        ))}
      </ul>
      <LocalTime />
    </div>
  );
}

function Ticker() {
  const cd = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");
  const items = [
    "🔴 ندوة لايف مجانية",
    `${w.dateLabel} · ${w.timeLabel}`,
    cd ? `⏳ باقي ${cd.d} يوم و${pad(cd.h)}:${pad(cd.m)}:${pad(cd.s)}` : "⏳ قرّب الموعد",
    "ليش الأقل خبرة منك معروف أكتر؟",
    "احجز مكانك مجاناً هلّق ←",
  ];
  const row = (
    <div className="flex shrink-0 items-center gap-10 pe-10">
      {items.map((t, i) => (
        <span key={i} className="whitespace-nowrap">
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <a href="#register" className="ticker block overflow-hidden bg-bronze py-3 text-sm font-bold text-[var(--ws-bg)] sm:text-base" aria-label="احجز مكانك بالندوة المجانية">
      <div className="ticker-track flex w-max">
        {row}
        {row}
        {row}
        {row}
      </div>
    </a>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!w.startIso || now === null) return null;
  const diff = new Date(w.startIso).getTime() - now;
  if (diff <= 0) return null;
  const parts = [
    { v: Math.floor(diff / 86400000), l: "يوم" },
    { v: Math.floor(diff / 3600000) % 24, l: "ساعة" },
    { v: Math.floor(diff / 60000) % 60, l: "دقيقة" },
    { v: Math.floor(diff / 1000) % 60, l: "ثانية" },
  ];
  return (
    <div className="mt-8" aria-label="الوقت الباقي للندوة">
      <p className="text-sm font-medium text-cream/60">باقي على الندوة</p>
      <div className="mt-3 flex gap-3" dir="ltr">
        {[...parts].reverse().map((p) => (
          <div key={p.l} className="w-[4.6rem] rounded-[14px] border border-bronze/35 bg-white/[0.04] py-3 text-center shadow-[0_10px_30px_-18px_rgba(var(--acc),0.9)]">
            <div className="font-latin text-2xl font-bold tabular-nums text-cream">{String(p.v).padStart(2, "0")}</div>
            <div className="text-xs text-cream/60">{p.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const proof = [
  { n: "12+", t: "سنة ورا الكاميرا بين دبي وكندا" },
  { n: "+100K", t: "مشاهدة لواحد من كل 5 فيديوهات عملناها لعملائنا" },
  { n: "مئات الآلاف", t: "مشاهدات لحسابات عملائنا من أول شهر" },
];

const steps = [
  { t: "سجّل هلّق", d: "دقيقة وحدة، وبيوصلك إيميل التأكيد فوراً" },
  { t: "احضر اللايف", d: `${w.dateLabel}، ساعة وحدة، والرابط بيوصلك عالإيميل` },
  { t: "طبّق أول خطوة", d: "بتطلع عارف شو أول شي لازم تعمله بحسابك، وليش" },
];

const faqs = [
  { q: "هل الندوة مجانية فعلاً؟", a: "إي، مجانية بالكامل. ما في دفع ولا بطاقة بنك، بس اسمك وإيميلك." },
  { q: "لمين هالندوة؟", a: "لكل حدا عنده خبرة بمجاله ومو ظاهر أونلاين: دكاترة، محامين، مستشارين، أصحاب شركات… وموظفين بدهم يكبّروا اسمهم بمجالهم." },
  { q: "إمتى بالزبط؟", a: `${w.dateLabel}: 8 م بتوقيت السعودية والكويت وقطر والأردن وسوريا، 9 م الإمارات وعُمان، 7 م مصر ولبنان وفلسطين، 5 م لندن (GMT)، و12 الظهر تورنتو ونيويورك.` },
  { q: "قديش مدتها؟", a: "حوالي ساعة، كلها محتوى عملي وأمثلة حقيقية." },
  { q: "رح يكون في تسجيل للندوة؟", a: "لأ، ما رح ينبعت تسجيل. الندوة لايف بس، فاحجز ساعتها من هلّق." },
  { q: "لازم أكون عم بنزّل محتوى؟", a: "لأ. الندوة معمولة للي ما بلّش أبداً، أو بلّش ووقف، أو عم ينزّل وما عم يجيه عملاء." },
  { q: "رح تبيع شي بالندوة؟", a: "بآخرها رح احكي عن برنامج مدفوع للي بدو يكمّل معي خطوة بخطوة. بس الساعة كلها محتوى بتقدر تطبّقه لحالك حتى لو ما اشتركت." },
];

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

function CtaButton({ children = "احجز مكانك مجاناً ↓" }: { children?: React.ReactNode }) {
  return (
    <a
      href="#register"
      className="btn-shine focus-ring inline-flex w-full items-center justify-center rounded-[14px] bg-bronze px-8 py-4 text-lg font-bold text-[var(--ws-bg)] shadow-[0_10px_40px_-10px_rgba(var(--acc),0.8)] transition-transform hover:-translate-y-0.5 sm:w-auto"
    >
      {children}
    </a>
  );
}

export function WorkshopLanding() {
  const navigate = useNavigate();
  const submit = useServerFn(submitWorkshopRegistration);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(countries[0]);
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [stage, setStage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);


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
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const digits = phone.replace(/[^\d]/g, "");
    if (name.trim().length < 2) return setError("اكتب اسمك");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("الإيميل مو صحيح");
    if (digits.length < 7) return setError("اكتب رقم الواتساب، عليه حيوصلك رابط الندوة");
    if (!profession) return setError("اختار شغلك");
    if (!stage) return setError("اختار وين إنت اليوم بالمحتوى");
    setBusy(true);
    const eventId = crypto.randomUUID();
    const q = new URLSearchParams(window.location.search);
    try {
      await submit({
        data: {
          name: name.trim(),
          email: email.trim(),
          whatsapp: `${country.code}${digits}`,
          country: country.label,
          profession,
          contentStage: stage,
          workshopKey: w.key,
          utmSource: q.get("utm_source") ?? "",
          utmMedium: q.get("utm_medium") ?? "",
          utmCampaign: q.get("utm_campaign") ?? "",
          utmContent: q.get("utm_content") ?? "",
          fbclid: q.get("fbclid") ?? "",
          referrer: document.referrer,
          landingPageUrl: window.location.origin + window.location.pathname,
          eventId,
        },
      });
      trackAuthorityEvent("workshop_register", { event_id: eventId, profession });
      trackMetaEvent("Lead", { content_name: "workshop" }, eventId);
      await navigate({ to: "/workshop/thank-you", search: { n: name.trim().split(/\s+/).slice(0, 2).join(" ") } });
    } catch {
      setError("ما انحفظ التسجيل، جرّب مرة تانية");
      setBusy(false);
    }
  }

  const input =
    "focus-ring w-full rounded-[12px] border border-white/15 bg-white/[0.06] px-4 py-3.5 text-base text-cream placeholder:text-cream/40";

  return (
    <main data-ws-theme className="ws-theme min-h-screen overflow-hidden bg-[var(--ws-bg)] text-cream">
      <Ticker />

      {/* Hero */}
      <section className="relative px-5 pt-10 pb-6 sm:px-8 sm:pt-14">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--acc),0.28),transparent)] blur-2xl" />
        <div className="relative mx-auto grid w-full max-w-6xl items-end gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="pb-6 lg:pb-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-bronze/10 px-4 py-1.5 text-sm font-medium text-bronze">
              لأصحاب الخبرة: دكاترة، محامين، مستشارين، أصحاب شركات… وموظفين كمان
            </p>
            <h1 className="mt-6 text-cream text-[2.2rem] leading-[1.35] font-bold sm:text-[3.6rem] sm:leading-[1.25]">
              ليش{" "}
              <mark className="rounded-[10px] bg-bronze px-2 text-[var(--ws-bg)]">الأقل خبرة</mark>{" "}
              منك معروف أكتر؟
            </h1>
            <p className="mt-5 text-xl leading-[1.7] text-cream/85 sm:text-2xl">{w.subtitle}</p>
            <p className="mt-6 max-w-xl text-base leading-[1.95] text-cream/70 sm:text-lg">
              إذا إنت شاطر بشغلك وما حدا بيعرف، فهاد مو لانك أقل من غيرك… ولكن لانه غيرك أوضح منك أونلاين. ساعة
              لايف بشرح فيها الأنظمة السبعة بأمثلة حقيقية، وبتطلع منها عارف شو أول خطوة لازم تعملها
            </p>
            <a
              href="#register"
              className="btn-shine focus-ring mt-8 inline-flex w-full items-center justify-center rounded-[14px] bg-bronze px-8 py-4 text-lg font-bold text-[var(--ws-bg)] shadow-[0_10px_40px_-10px_rgba(var(--acc),0.8)] transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              احجز مكانك مجاناً ↓
            </a>
            <Countdown />
            <TimeZones />
          </div>

          {w.videoUrl ? (
            <div className="glow-card glow-card--always relative overflow-hidden rounded-[22px] border border-bronze/40 bg-black shadow-[0_30px_80px_-30px_rgba(var(--acc),0.6)]">
              {(w.videoUrl as string).endsWith(".mp4") ? (
                <video src={w.videoUrl} controls playsInline poster="/images/ahmad-cutout.webp" className="aspect-video w-full" />
              ) : (
                <iframe src={w.videoUrl} title="دعوة الندوة" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="aspect-video w-full" />
              )}
            </div>
          ) : (
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div aria-hidden className="absolute inset-x-6 bottom-0 top-16 rounded-full bg-[radial-gradient(closest-side,rgba(var(--acc),0.55),rgba(var(--acc),0.08)_70%,transparent)] blur-xl" />
            <img src="/images/ahmad-cutout.webp" alt="أحمد السقا" className="relative mx-auto w-full [mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
            <div className="absolute inset-x-0 bottom-6 mx-auto w-max rounded-[14px] border border-white/15 bg-[color-mix(in_srgb,var(--ws-bg)_80%,transparent)] px-5 py-3 text-center backdrop-blur">
              <p className="text-base font-bold">أحمد السقا</p>
              <p className="text-sm text-cream/70">12 سنة ورا الكاميرا · دبي وكندا</p>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Seven systems */}
      <section className="relative px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-cream sm:text-4xl">
            الأنظمة <span className="text-bronze">السبعة</span> اللي رح نحكي عنها
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learn.map((l, i) => (
              <li
                key={l.t}
                onMouseMove={glowMove}
                className="glow-card group rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-[0_20px_60px_-35px_rgba(var(--acc),0.6)]"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-bronze/15 font-latin text-sm font-bold text-bronze ring-1 ring-bronze/40">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-bold text-cream">{l.t}</h3>
                <p className="mt-2 text-base leading-[1.8] text-cream/70">{l.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-cream sm:text-4xl">
            ليش <span className="text-bronze">تسمعني</span> أنا؟
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {proof.map((p) => (
              <div key={p.t} onMouseMove={glowMove} className="glow-card rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 text-center">
                <div className="font-latin text-4xl font-bold text-bronze sm:text-5xl" dir="ltr">{p.n}</div>
                <p className="mt-3 text-base leading-[1.8] text-cream/75">{p.t}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-[1.9] text-cream/65">
            من جريدة البيان وMotionArabia لوثائقي للجزيرة، ومع عيادات وشركات ومكاتب استشارات
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-cream sm:text-4xl">
            تلات خطوات <span className="text-bronze">وبس</span>
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((st, i) => (
              <li key={st.t} onMouseMove={glowMove} className="glow-card rounded-[20px] border border-white/10 bg-white/[0.04] p-6">
                <span className="font-latin text-sm font-bold text-bronze">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold text-cream">{st.t}</h3>
                <p className="mt-2 text-base leading-[1.8] text-cream/70">{st.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* Register */}
      <section className="relative px-5 pb-20 sm:px-8">
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--acc),0.18),transparent)] blur-2xl" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div className="space-y-5 lg:pt-6">
            <h2 className="text-2xl font-bold text-cream sm:text-4xl">
              مين <span className="text-bronze">أحمد السقا</span>؟
            </h2>
            <p className="text-base leading-[1.95] text-cream/75 sm:text-lg">
              12 سنة ورا الكاميرا بين دبي وكندا، من جريدة البيان وMotionArabia لوثائقي للجزيرة. اشتغلت مع عيادات
              وشركات ومؤسسات، وحسابات عملاء وصلت لمئات آلاف المشاهدات من أول شهر
            </p>
            <div onMouseMove={glowMove} className="glow-card rounded-[18px] border border-bronze/30 bg-bronze/10 p-5">
              <p className="text-base leading-[1.9] text-cream/85">
                مو لصنّاع المحتوى ولا للي بدو يصير انفلونسر، ولكن لكل حدا عنده خبرة بمجاله، صاحب شغل أو موظف
              </p>
            </div>
          </div>

          <form
            id="register"
            onSubmit={onSubmit}
            noValidate
            className="glow-card glow-card--always scroll-mt-6 rounded-[24px] border border-bronze/40 bg-[color-mix(in_srgb,var(--ws-panel)_90%,transparent)] p-6 shadow-[0_0_0_1px_rgba(var(--acc),0.15),0_30px_80px_-30px_rgba(var(--acc),0.55)] backdrop-blur sm:p-8"
          >
            <h2 className="text-2xl font-bold text-cream">احجز مكانك مجاناً</h2>
            <p className="mt-2 text-sm text-cream/60">رابط الندوة والتذكير بيوصلوك عالإيميل</p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-cream/85">الاسم</span>
                <input className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-cream/85">الإيميل</span>
                <input className={input} type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </label>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-cream/85">رقم الواتساب</span>
                <div className="flex gap-2" dir="ltr">
                  <select
                    aria-label="البلد"
                    className="focus-ring rounded-[12px] border border-white/15 bg-[var(--ws-panel)] px-2 py-3.5 text-sm text-cream"
                    value={country.label}
                    onChange={(e) => setCountry(countries.find((c) => c.label === e.target.value) ?? countries[0])}
                  >
                    {countries.map((c) => (
                      <option key={c.label} value={c.label}>
                        {c.label} {c.code}
                      </option>
                    ))}
                  </select>
                  <input className={input} type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel-national" />
                </div>
              </div>
              <div>
                <span className="mb-2 block text-sm font-medium text-cream/85">شو شغلك؟</span>
                <Chips options={professions} value={profession} onChange={setProfession} name="شو شغلك" />
              </div>
              <div>
                <span className="mb-2 block text-sm font-medium text-cream/85">وين إنت اليوم بالمحتوى؟</span>
                <Chips options={stages} value={stage} onChange={setStage} name="وين إنت اليوم بالمحتوى" />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm font-medium text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="btn-shine focus-ring mt-6 w-full rounded-[14px] bg-bronze px-6 py-4 text-lg font-bold text-[var(--ws-bg)] shadow-[0_10px_40px_-10px_rgba(var(--acc),0.8)] transition-opacity hover:opacity-95 disabled:opacity-60"
            >
              {busy ? "عم نسجّلك" : "سجّلني بالندوة"}
            </button>
            <p className="mt-3 text-center text-xs text-cream/50">الندوة لايف ومجانية</p>
          </form>
        </div>
      </section>
      {/* FAQ */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-cream sm:text-4xl">
            عندك <span className="text-bronze">سؤال</span>؟
          </h2>
          <Faq />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-5 pt-6 pb-24 sm:px-8">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[360px] max-w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(var(--acc),0.22),transparent)] blur-2xl" />
        <div className="glow-card glow-card--always relative mx-auto w-full max-w-3xl rounded-[28px] border border-bronze/40 bg-[color-mix(in_srgb,var(--ws-panel)_90%,transparent)] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold leading-[1.5] text-cream sm:text-4xl">
            خبرتك موجودة.<br />
            اللي ناقص إنه <span className="text-bronze">الناس تشوفها</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.95] text-cream/70 sm:text-lg">
            ساعة وحدة مجاناً، {w.dateLabel}. بتطلع منها عارف ليش غيرك معروف أكتر منك، وشو أول خطوة لتصير إنت الاسم اللي ببال الناس بمجالك. والقرار بعدها إلك.
          </p>
          <div className="mt-8">
            <CtaButton>احجز مكانك مجاناً</CtaButton>
          </div>
        </div>
      </section>
    </main>
  );
}
