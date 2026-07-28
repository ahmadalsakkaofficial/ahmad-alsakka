import { siteConfig } from "@/config/site";
import { Reveal } from "./primitives";

const stats = [
  { value: siteConfig.experienceYears, label: "سنوات في التسويق الرقمي" },
  { value: siteConfig.youtubeAudience, label: "مشترك في تجربة سابقة على YouTube" },
  { value: "60 يوماً", label: "لبناء النظام وتسليمه" },
];

const engineWords = ["Strategy", "System", "Production", "Handoff"];

export function Hero() {
  return (
    <section id="home" className="scroll-mt-20 bg-background px-5 pt-14 pb-4 sm:px-8 sm:pt-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <p className="text-xs font-medium tracking-wide text-bronze sm:text-sm">
              براند شخصي ونظام محتوى للمهنيين العرب
            </p>
            <h1 className="mt-5 font-display text-[2rem] leading-[1.35] text-navy sm:text-5xl sm:leading-[1.28]">
              خبرتك أقوى من حضورك أونلاين.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[2] text-subtle sm:text-lg">
              أساعد أصحاب المهن والخدمات العرب — أطباء، محامين، مستشارين، عقاريين وأصحاب شركات — على
              تحويل خبرتهم إلى براند شخصي ونظام محتوى واضح يبني الثقة ويجذب الاستفسارات، من هاتفهم،
              بصوتهم، وخلال 60 يوماً.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-[2] text-subtle">
              أنا لا أبيعك جلسات تحفيز، ولا أجعلك تعتمد عليّ لإدارة حسابك إلى الأبد. أبني النظام
              معك، أطبّقه، ثم أسلّمه لك لتستطيع تشغيله بنفسك.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#start"
                className="focus-ring rounded-[12px] bg-navy px-7 py-4 text-sm font-bold text-cream transition-opacity hover:opacity-90"
              >
                ابنِ نظامك
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-[12px] border border-navy/20 px-7 py-4 text-sm font-bold text-navy transition-colors hover:border-bronze hover:text-bronze"
              >
                شاهد المحتوى
              </a>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-subtle sm:text-sm">
              مناسب لأصحاب الأعمال والخبرات الحقيقية، وليس لمن يريد أن يصبح مؤثراً.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div
              aria-hidden="true"
              className="relative overflow-hidden rounded-[14px] border border-border bg-surface p-7"
            >
              <div className="space-y-3">
                {engineWords.map((w, i) => (
                  <div key={w} className="flex items-center gap-3">
                    <span className="font-latin text-[10px] tracking-[0.2em] text-bronze">
                      0{i + 1}
                    </span>
                    <span className="font-latin text-sm tracking-[0.14em] text-navy uppercase">
                      {w}
                    </span>
                    <span className="h-px flex-1 bg-bronze/30" />
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-bronze/25 pt-6">
                <span className="font-latin block text-6xl leading-none font-bold text-navy">
                  60
                </span>
                <span className="mt-2 block text-sm text-subtle">يوماً لبناء النظام</span>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <li key={s.label} className="bg-surface p-6 text-center sm:text-start">
              <span className="font-latin block text-3xl font-bold text-navy">{s.value}</span>
              <span className="mt-2 block text-sm leading-relaxed text-subtle">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
