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
  { t: "الرسالة", d: "شو الشي اللي بدك تنعرف فيه، بجملة بيفهمها أي حدا بيفتح حسابك" },
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
          className={`focus-ring rounded-full border px-4 py-2 text-sm transition-colors ${value === o ? "border-bronze bg-bronze text-cream" : "border-navy/20 text-navy hover:border-bronze"}`}
        >
          {o}
        </button>
      ))}
    </div>
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

  const hasDate = Boolean(w.dateLabel);

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
      await navigate({ to: "/workshop/thank-you" });
    } catch {
      setError("ما انحفظ التسجيل، جرّب مرة تانية");
      setBusy(false);
    }
  }

  const input = "focus-ring w-full rounded-[12px] border border-navy/20 bg-background px-4 py-3.5 text-base text-navy placeholder:text-subtle/70";

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-navy px-5 py-3 text-center text-sm text-cream sm:text-base">
        <span className="font-semibold text-bronze">ندوة مجانية لايف</span>
        <span className="mx-2 text-cream/40">·</span>
        {hasDate ? (
          <span>
            {w.dateLabel} · {w.timeLabel}
          </span>
        ) : (
          <span>الموعد بينعلن قريب، سجّل حتى يوصلك أول واحد</span>
        )}
      </div>

      <section className="px-5 pt-10 pb-16 sm:px-8 sm:pt-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-bronze/40 px-4 py-1.5 text-sm font-medium text-bronze">
              لأصحاب الخبرة: دكاترة، محامين، مستشارين، أصحاب شركات… وموظفين كمان
            </p>
            <h1 className="mt-6 text-[2rem] leading-[1.4] font-bold text-navy sm:text-[3.1rem] sm:leading-[1.3]">
              {w.title}
              <span className="mt-3 block text-xl leading-[1.6] text-bronze sm:text-3xl sm:leading-[1.5]">{w.subtitle}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-[1.95] text-ink/80">
              إذا إنت شاطر بشغلك وما حدا بيعرف، فهاد مو لانك أقل من غيرك… ولكن لانه غيرك أوضح منك أونلاين
            </p>
            <p className="mt-3 max-w-xl text-base leading-[1.95] text-subtle">
              ساعة لايف بشرح فيها الأنظمة السبعة بأمثلة حقيقية، وبتطلع منها عارف شو أول خطوة لازم تعملها
            </p>

            <a href="#register" className="focus-ring mt-6 inline-flex w-full items-center justify-center rounded-[12px] bg-navy px-6 py-4 text-base font-bold text-cream lg:hidden">
              سجّل ببلاش ↓
            </a>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {learn.map((l, i) => (
                <li key={l.t} className="rounded-[16px] border border-border bg-surface p-5">
                  <span className="font-latin text-sm font-semibold tracking-[0.2em] text-bronze">0{i + 1}</span>
                  <h2 className="mt-2 text-lg font-bold text-navy">{l.t}</h2>
                  <p className="mt-2 text-base leading-[1.8] text-subtle">{l.d}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4 rounded-[18px] border border-border bg-surface p-5">
              <img src="/images/ahmad-hero.webp" alt="أحمد السقا" loading="lazy" className="size-20 shrink-0 rounded-full object-cover object-[50%_20%]" />
              <div>
                <p className="text-base font-bold text-navy">مع أحمد السقا</p>
                <p className="mt-1 text-sm leading-[1.8] text-subtle">
                  12 سنة ورا الكاميرا بين دبي وكندا، من جريدة البيان وMotionArabia لوثائقي للجزيرة، وحسابات عملاء
                  وصلت لمئات آلاف المشاهدات من أول شهر
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-subtle">مو لصنّاع المحتوى ولا للي بدو يصير مؤثر، ولكن لكل حدا عنده خبرة بمجاله، صاحب شغل أو موظف</p>
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <form id="register" onSubmit={onSubmit} noValidate className="rounded-[22px] border border-bronze/40 bg-surface p-6 shadow-raised sm:p-8">
              <h2 className="text-2xl font-bold text-navy">احجز مكانك ببلاش</h2>
              <p className="mt-2 text-sm text-subtle">رابط الندوة والتذكير بيوصلوك عالواتساب والإيميل</p>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">الاسم</span>
                  <input className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">الإيميل</span>
                  <input className={input} type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                </label>
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-navy">رقم الواتساب</span>
                  <div className="flex gap-2" dir="ltr">
                    <select
                      aria-label="البلد"
                      className="focus-ring rounded-[12px] border border-navy/20 bg-background px-2 py-3.5 text-sm text-navy"
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
                  <span className="mb-2 block text-sm font-medium text-navy">شو شغلك؟</span>
                  <Chips options={professions} value={profession} onChange={setProfession} name="شو شغلك" />
                </div>
                <div>
                  <span className="mb-2 block text-sm font-medium text-navy">وين إنت اليوم بالمحتوى؟</span>
                  <Chips options={stages} value={stage} onChange={setStage} name="وين إنت اليوم بالمحتوى" />
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-4 text-sm font-medium text-destructive">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="focus-ring mt-6 w-full rounded-[12px] bg-navy px-6 py-4 text-base font-bold text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {busy ? "عم نسجّلك" : "سجّلني بالندوة"}
              </button>
              <p className="mt-3 text-center text-xs text-subtle">الندوة لايف ومجانية</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
