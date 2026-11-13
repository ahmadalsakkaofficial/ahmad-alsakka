import { siteConfig } from "@/config/site";
import { Section, SectionHead, Reveal } from "./primitives";

const phases = [
  {
    n: "01",
    title: "الاستراتيجية",
    when: "الأسبوع 1 و2",
    text: "منحدد مين العميل اللي بدك ياه وشو بدك تنعرف فيه وأعمدة المحتوى المربوطة بشغلك",
  },
  {
    n: "02",
    title: "النظام",
    when: "الأسبوع 3 و4",
    text: "خطة 90 يوم ومكتبة Hooks لمجالك وقوالب كتابة وطريقة تصوير بسيطة حتى من الموبايل",
  },
  {
    n: "03",
    title: "الإنتاج والنشر",
    when: "الشهر 2",
    text: "سكربتات بصوتك ويوم تصوير بإخراج مني بيطلع منه 8 لـ12 قطعة محتوى ومنها كاروسيلات وبوستات لينكدإن",
  },
  {
    n: "04",
    title: "التحسين والتسليم",
    when: "الشهر 3",
    text: "منقرا الأرقام ومنكبّر اللي اشتغل ويوم تصوير تاني وبعدين منسلّمك النظام موثّق كامل",
  },
];

const deliverables = [
  "تموضع واضح الناس بتفهمه وبتتذكره",
  "خطة محتوى 90 يوم مربوطة بخدمتك",
  "سكربتات مكتوبة بصوتك وطريقتك إنت",
  "يومين تصوير بإخراج مباشر مني وين ما كنت",
  "مونتاج ونشر وكاروسيلات ولينكدإن",
  "تقرير أرقام وخطة الـ90 يوم الجاية",
];

export function EngineSection() {
  return (
    <Section id="system" tone="navy" labelledBy="system-title">
      <SectionHead
        id="system-title"
        number="03"
        label="البرنامج"
        invert
        title={
          <>
            <span className="font-latin block text-3xl tracking-tight sm:text-5xl">The Authority Engine</span>
            <span className="mt-3 block text-xl text-cream/85 sm:text-2xl">
              3 شهور: شهر منبني فيه وشهرين منشغّل ومنحسّن
            </span>
          </>
        }
      />

      <ol className="grid gap-4 sm:grid-cols-2">
        {phases.map((p, i) => (
          <Reveal key={p.n} delay={i * 80}>
            <li className="h-full rounded-[18px] border border-cream/15 bg-cream/[0.04] p-7">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-latin text-sm font-semibold tracking-[0.22em] text-bronze">{p.n}</span>
                <span className="text-sm text-cream/55">{p.when}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold text-cream">{p.title}</h3>
              <p className="mt-3 text-base leading-[1.9] text-cream/75">{p.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[18px] border border-cream/15 p-7">
          <h3 className="text-xl font-bold text-cream">شو بيصير عندك بآخر الـ3 شهور</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-base leading-[1.8] text-cream/80">
                <span className="text-bronze">✓</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[18px] bg-cream p-7 text-navy">
          <p className="text-sm font-semibold text-bronze">الاستثمار</p>
          <p className="mt-2">
            <span className="font-latin text-4xl font-bold">3,000 USD</span>
            <span className="text-base text-subtle"> بالشهر</span>
          </p>
          <p className="mt-1 text-base text-subtle">3 شهور والدفع شهر بشهر</p>
          <div className="mt-5 rounded-[12px] border border-bronze/40 p-4">
            <p className="text-base font-bold">ضمان الشهر الأول</p>
            <p className="mt-1 text-sm leading-[1.8] text-subtle">
              إذا ما سلّمنا المتفق عليه بأول شهر بتوقف وما بتدفع الباقي
            </p>
          </div>
          <a
            href="/authority-engine"
            className="focus-ring mt-6 flex items-center justify-center rounded-[12px] bg-navy px-6 py-4 text-base font-bold text-cream transition-opacity hover:opacity-90"
          >
            قدّم وشوف إذا مناسب
          </a>
          <p className="mt-3 text-center text-sm text-subtle">
            بستقبل عدد محدود كل شهر حتى يضل الشغل قريب منك
          </p>
        </div>
      </div>

      <p className="mt-8 text-center text-base text-cream/70">
        مش جاهز للبرنامج كامل؟{" "}
        <a
          href={siteConfig.strategySessionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-bronze underline-offset-4 hover:text-cream"
        >
          احجز جلسة استراتيجية ساعة ({siteConfig.strategySessionPrice})
        </a>{" "}
        وبتنحسم من أول شهر إذا كمّلنا
      </p>
    </Section>
  );
}
