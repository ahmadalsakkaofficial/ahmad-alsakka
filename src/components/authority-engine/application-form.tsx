import { useEffect, useMemo, useState } from "react";
import { useNavigate, useServerFn } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitAuthorityApplication } from "@/lib/authority-engine/application.functions";
import { trackAuthorityEvent, trackMetaEvent } from "@/lib/authority-engine/analytics";

type Answers = {
  profession: string;
  market: string;
  contentStage: string;
  primaryGoal: string;
  startTimeline: string;
  investmentFit: string;
  decisionMaker: string;
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  instagram: string;
  linkedin: string;
  website: string;
  note: string;
};

const initialAnswers: Answers = {
  profession: "", market: "", contentStage: "", primaryGoal: "", startTimeline: "",
  investmentFit: "", decisionMaker: "", name: "", countryCode: "+966", phone: "",
  email: "", instagram: "", linkedin: "", website: "", note: "",
};

const steps = [
  { key: "profession", question: "شو مجال شغلك؟", options: ["طبيب / طبيب أسنان", "محامي / خدمات قانونية", "مستشار", "صاحب شركة", "صاحب وكالة", "عقارات", "خبير / مقدم خدمة", "غير ذلك"] },
  { key: "market", question: "وين موجود أغلب شغلك أو جمهورك؟", options: ["السعودية", "الإمارات", "قطر", "الكويت", "البحرين", "عُمان", "كندا", "الولايات المتحدة", "أوروبا", "دولة أخرى"] },
  { key: "contentStage", question: "وين واقف حالياً بالمحتوى؟", options: ["ما بلشت بعد", "بنشر أحياناً بس بدون نظام", "بنشر باستمرار بس النتائج مو واضحة", "عندي شخص أو فريق يساعدني", "عندي حضور جيد وبدي أطور النظام"] },
  { key: "primaryGoal", question: "شو أهم شي بدك المحتوى يساعدك فيه؟", options: ["أبني اسمي وثقتي بالسوق", "أجذب عملاء وفرص أفضل", "أوضح شو بيميزني", "أبني نظام محتوى ثابت", "أكثر من واحد من هدول"] },
  { key: "startTimeline", question: "إمتى حابب تبدأ؟", options: ["بأقرب وقت", "خلال 30 يوم", "خلال 1–3 أشهر", "حالياً عم أستكشف الخيارات"] },
  { key: "investmentFit", question: "إذا شفنا إن في توافق، هل استثمار 3,000 USD شهرياً لمدة شهرين مناسب إلك؟", options: ["نعم، إذا حسيت إن الخدمة مناسبة", "ممكن، بس بدي أفهم التفاصيل أكتر", "حالياً لا"] },
  { key: "decisionMaker", question: "مين بياخد قرار البدء بالمشروع؟", options: ["أنا", "أنا وشريك / فريق", "بدي أرجع لشخص ثاني قبل القرار"] },
] as const;

const countryCodes = ["+966", "+971", "+974", "+965", "+973", "+968", "+1", "+44", "+49", "+33"];

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const submitApplication = useServerFn(submitAuthorityApplication);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("authority-engine-answers");
      if (saved) setAnswers({ ...initialAnswers, ...JSON.parse(saved) });
    } catch { /* Ignore unavailable or invalid session storage. */ }
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem("authority-engine-answers", JSON.stringify(answers)); } catch { /* noop */ }
  }, [answers]);

  const current = steps[step];
  const isContact = step === 7;
  const selected = current ? answers[current.key] : "";
  const progress = ((step + 1) / 8) * 100;

  const attribution = useMemo(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
    const result: Record<string, string> = {};
    keys.forEach((key) => {
      const value = params.get(key) || sessionStorage.getItem(`ae-${key}`) || "";
      if (value) {
        result[key] = value;
        sessionStorage.setItem(`ae-${key}`, value);
      }
    });
    return result;
  }, []);

  function begin() {
    if (started) return;
    setStarted(true);
    trackAuthorityEvent("application_start");
    trackMetaEvent("ApplicationStart");
  }

  function choose(value: string) {
    if (!current) return;
    begin();
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
    setError("");
  }

  function next() {
    if (!isContact && !selected) {
      setError("اختار جواب حتى نكمل");
      return;
    }
    const nextStep = Math.min(7, step + 1);
    setStep(nextStep);
    setError("");
    trackAuthorityEvent("application_step", { step: nextStep + 1 });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    begin();
    if (answers.name.trim().length < 2 || answers.phone.trim().length < 7 || !/^\S+@\S+\.\S+$/.test(answers.email)) {
      setError("تأكد من الاسم ورقم الموبايل والإيميل");
      return;
    }
    setSubmitting(true);
    setError("");
    const eventId = crypto.randomUUID();
    try {
      await submitApplication({ data: {
        profession: answers.profession, market: answers.market, contentStage: answers.contentStage,
        primaryGoal: answers.primaryGoal, startTimeline: answers.startTimeline,
        investmentFit: answers.investmentFit, decisionMaker: answers.decisionMaker,
        name: answers.name.trim(), phone: `${answers.countryCode} ${answers.phone.trim()}`,
        email: answers.email.trim(), instagram: answers.instagram.trim(), linkedin: answers.linkedin.trim(),
        website: answers.website.trim(), note: answers.note.trim(), utmSource: attribution.utm_source,
        utmMedium: attribution.utm_medium, utmCampaign: attribution.utm_campaign,
        utmContent: attribution.utm_content, utmTerm: attribution.utm_term, fbclid: attribution.fbclid,
        referrer: document.referrer, landingPageUrl: window.location.href, eventId,
      } });
      trackAuthorityEvent("application_submit", { event_id: eventId });
      trackMetaEvent("Lead", {}, eventId);
      sessionStorage.removeItem("authority-engine-answers");
      await navigate({ to: "/authority-engine/thank-you" });
    } catch {
      setSubmitting(false);
      setError("ما قدرنا نرسل الطلب، جرّب مرة ثانية بعد شوي");
      trackAuthorityEvent("application_error");
    }
  }

  return (
    <section id="apply" className="scroll-mt-20 bg-navy px-5 py-20 text-cream sm:px-8 lg:py-28" aria-labelledby="apply-title">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="text-base text-bronze">طلب التوافق</p>
          <h2 id="apply-title" className="mt-3 text-3xl leading-[1.35] text-cream sm:text-5xl">إذا حسيت إن هاد النظام ناقصك، خلينا نشوف إذا في توافق</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-cream/75">قبل أي مكالمة، جاوب على كم سؤال قصير عن شغلك ووضعك الحالي، الهدف نتأكد إن الخدمة مناسبة للطرفين</p>
          <p className="mt-6 font-latin text-xl text-bronze">3,000 USD / month × 2 months</p>
        </div>

        <div className="border border-cream/20 bg-cream/[0.04] p-5 sm:p-9">
          <div className="mb-8 flex items-center justify-between text-base text-cream/70">
            <span>{step + 1} من 8</span>
            <span>{step === 7 ? "بيانات التواصل" : "أسئلة التوافق"}</span>
          </div>
          <div className="mb-10 h-1 overflow-hidden bg-cream/15" aria-hidden="true">
            <div className="h-full bg-bronze transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>

          {!isContact && current ? (
            <div className="min-h-[360px]">
              <h3 className="mb-7 text-2xl leading-[1.5] text-cream sm:text-3xl">{current.question}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {current.options.map((option) => (
                  <Button key={option} type="button" variant="outline" onClick={() => choose(option)}
                    className={`h-auto min-h-14 justify-between whitespace-normal border-cream/20 px-5 py-3 text-right text-base ${selected === option ? "border-bronze bg-bronze text-cream hover:bg-bronze/90" : "bg-transparent text-cream hover:bg-cream/10 hover:text-cream"}`}>
                    <span>{option}</span>{selected === option ? <Check /> : null}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5" noValidate>
              <h3 className="text-2xl text-cream sm:text-3xl">آخر خطوة، كيف منتواصل معك؟</h3>
              <div className="rounded-sm border border-bronze/50 bg-bronze/10 p-4 text-base leading-7 text-cream">الاستثمار الأساسي واضح قبل إرسال الطلب، 3,000 USD شهرياً لمدة شهرين، بإجمالي 6,000 USD لأول 60 يوم</div>
              <Field label="الاسم الكامل" required value={answers.name} onChange={(value) => setAnswers({ ...answers, name: value })} autoComplete="name" />
              <div>
                <label className="mb-2 block text-base" htmlFor="ae-phone">WhatsApp / mobile <span className="text-bronze">مطلوب</span></label>
                <div className="grid grid-cols-[110px_1fr] gap-2" dir="ltr">
                  <select aria-label="رمز الدولة" value={answers.countryCode} onChange={(e) => setAnswers({ ...answers, countryCode: e.target.value })} className="h-13 border border-cream/25 bg-navy px-3 text-cream">
                    {countryCodes.map((code) => <option key={code}>{code}</option>)}
                  </select>
                  <input id="ae-phone" required type="tel" inputMode="tel" autoComplete="tel-national" value={answers.phone} onChange={(e) => setAnswers({ ...answers, phone: e.target.value })} className="h-13 min-w-0 border border-cream/25 bg-transparent px-4 text-cream outline-none focus:border-bronze" />
                </div>
              </div>
              <Field label="email" required type="email" inputMode="email" value={answers.email} onChange={(value) => setAnswers({ ...answers, email: value })} autoComplete="email" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Instagram، اختياري" value={answers.instagram} onChange={(value) => setAnswers({ ...answers, instagram: value })} />
                <Field label="LinkedIn، اختياري" value={answers.linkedin} onChange={(value) => setAnswers({ ...answers, linkedin: value })} />
              </div>
              <Field label="الموقع الإلكتروني، اختياري" type="url" inputMode="url" value={answers.website} onChange={(value) => setAnswers({ ...answers, website: value })} />
              <label className="block text-base">في شي مهم بتحب أعرفه عن شغلك قبل ما أراجع الطلب؟
                <textarea value={answers.note} onChange={(e) => setAnswers({ ...answers, note: e.target.value })} rows={4} className="mt-2 w-full resize-y border border-cream/25 bg-transparent p-4 text-cream outline-none focus:border-bronze" />
              </label>
              <Button type="submit" disabled={submitting} className="h-14 w-full bg-bronze text-lg text-cream hover:bg-bronze/90">{submitting ? "عم نرسل طلبك" : "أرسل طلبي"}</Button>
              <p className="text-center text-sm text-cream/65">معلوماتك بتضل خاصة وما بنشاركها مع أي جهة</p>
            </form>
          )}

          {error ? <p role="alert" className="mt-5 border-r-2 border-bronze pr-3 text-base text-cream">{error}</p> : null}
          <div className="mt-8 flex items-center justify-between gap-3">
            <Button type="button" variant="ghost" disabled={step === 0 || submitting} onClick={() => { setStep((value) => Math.max(0, value - 1)); setError(""); }} className="h-12 text-cream hover:bg-cream/10 hover:text-cream"><ArrowRight /> رجوع</Button>
            {!isContact ? <Button type="button" disabled={!selected} onClick={next} className="h-12 bg-bronze px-7 text-cream hover:bg-bronze/90">التالي <ArrowLeft /></Button> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, value, onChange, type = "text", inputMode, autoComplete }: { label: string; required?: boolean; value: string; onChange: (value: string) => void; type?: string; inputMode?: "email" | "url"; autoComplete?: string }) {
  const id = `ae-${label.replaceAll(" ", "-")}`;
  return <label className="block text-base" htmlFor={id}>{label} {required ? <span className="text-bronze">مطلوب</span> : null}<input id={id} required={required} type={type} inputMode={inputMode} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-13 w-full border border-cream/25 bg-transparent px-4 text-cream outline-none focus:border-bronze" /></label>;
}