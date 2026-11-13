import { Reveal } from "./primitives";

const stats = [
  { value: "+12", label: "سنة بصناعة الفيديو والمحتوى بين دبي وكندا" },
  { value: "207K", label: "مشاهدة لفيديو واحد من شغلنا مع AJI Canada" },
  { value: "100K+", label: "مشاهدة بأول شهر لحسابات عملائنا بكندا" },
];

const credits = ["جريدة البيان", "MotionArabia", "وثائقي للجزيرة", "AJI Canada", "WestStep"];

export function Hero() {
  return (
    <section id="home" className="scroll-mt-20 bg-background px-5 pt-10 pb-16 sm:px-8 sm:pt-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal className="lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-bronze/40 px-4 py-1.5 text-sm font-medium text-bronze">
              <span className="size-1.5 rounded-full bg-bronze" />
              براند شخصي ونظام محتوى لأصحاب الخبرة
            </p>
            <h1 className="mt-6 text-[2.05rem] leading-[1.35] font-bold text-navy sm:text-[3.4rem] sm:leading-[1.25]">
              خبرتك أكبر من حضورك أونلاين
              <span className="mt-2 block text-bronze">وهاد عم يكلّفك عملاء</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-[1.95] text-ink/80">
              بحوّل خبرة الدكاترة والمحامين والمستشارين وأصحاب الشركات لمحتوى بيخلّي العميل الصح
              يعرفك ويثق فيك قبل ما يحكي معك
            </p>
            <p className="mt-3 max-w-xl text-base leading-[1.95] text-subtle">
              برنامج 3 شهور منبني فيه النظام سوا ومنصوّر وننشر ومنقيس، ووقتك إنت بيروح على التصوير بس
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/authority-engine"
                className="focus-ring rounded-[12px] bg-navy px-8 py-4 text-base font-bold text-cream shadow-raised transition-transform hover:-translate-y-0.5"
              >
                شوف إذا مناسب إلك
              </a>
              <a
                href="#work"
                className="focus-ring rounded-[12px] border border-navy/20 px-7 py-4 text-base font-bold text-navy transition-colors hover:border-bronze hover:text-bronze"
              >
                شوف الشغل والأرقام
              </a>
            </div>
            <p className="mt-4 text-sm text-subtle">
              لأصحاب الشغل القائم والخبرة الحقيقية، مش للي بدو يصير مؤثر
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:order-2">
            <figure className="relative mx-auto max-w-[19rem] sm:max-w-sm lg:max-w-none">
              <div className="absolute -inset-3 -z-0 rounded-[28px] border border-bronze/30" aria-hidden="true" />
              <img
                src="/images/ahmad-suit.webp"
                alt="أحمد السقا"
                width={1100}
                height={1467}
                fetchPriority="high"
                className="relative aspect-[4/5] w-full rounded-[22px] object-cover object-[50%_18%] shadow-raised"
              />
              <figcaption className="absolute start-4 bottom-4 rounded-[14px] bg-navy/90 px-5 py-3 text-cream backdrop-blur">
                <span className="block text-base font-bold">أحمد السقا</span>
                <span className="block text-sm text-cream/75">من دبي لكندا، 12 سنة ورا الكاميرا</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-[18px] border border-border bg-border">
          {stats.map((s) => (
            <li key={s.value} className="bg-surface px-2 py-5 text-center sm:p-6 sm:text-start">
              <span className="font-latin block text-2xl font-bold text-navy sm:text-4xl">{s.value}</span>
              <span className="mt-2 block text-xs leading-relaxed text-subtle sm:text-base">{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <span className="text-sm text-subtle">اشتغلت مع ومن خلال</span>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {credits.map((c) => (
              <li key={c} className="text-base font-semibold text-navy/55">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
