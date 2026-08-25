import { siteConfig } from "@/config/site";
import { Reveal } from "./primitives";

const stats = [
  { value: siteConfig.experienceYears, latin: true, label: "سنين بالتسويق الرقمي" },
  {
    value: siteConfig.youtubeAudience,
    latin: true,
    label: (
      <>
        مشترك على <span className="font-latin">YouTube</span> بتجربة سابقة
      </>
    ),
  },
  { value: "60 يوم", latin: false, label: "لنبني النظام ونسلّمك ياه" },
];

const engineWords = ["Strategy", "System", "Production", "Handoff"];

export function Hero() {
  return (
    <section id="home" className="scroll-mt-20 bg-background px-5 pt-14 pb-4 sm:px-8 sm:pt-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-bronze sm:text-base">
              براند شخصي ونظام محتوى لأصحاب الخبرة
            </p>
            <h1 className="mt-5 font-display text-[1.75rem] leading-[1.45] text-navy min-[420px]:text-[2rem] sm:text-5xl sm:leading-[1.32]">
              <span className="block">عندك خبرة حقيقية،</span>
              <span className="block">
                <span className="text-bronze">بس</span> حضورك أونلاين{" "}
                <span className="whitespace-nowrap">ما عم يبيّنها</span>
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[2] text-subtle sm:text-lg">
              أنا بساعد أصحاب المهن والخدمات العرب، دكاترة، محامين، مستشارين، عقاريين وأصحاب شركات
              يحوّلوا خبرتهم لبراند شخصي ونظام محتوى يخلّي الناس تفهمهم، تثق فيهم، وتتواصل معهم،
            </p>
            <div className="mt-6 max-w-2xl space-y-1 text-base leading-[2] text-subtle">
              <p>مو جلسات تحفيز</p>
              <p>ومو إدارة حساب للأبد</p>
            </div>
            <p className="mt-3 max-w-2xl text-base leading-[2] text-subtle">
              ببني النظام معك، بطبّقه، وبسلّمك ياه لما يصير واضح وتعرف تكمّل عليه بدون ما تضل معتمد
              عليّ
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#start"
                className="focus-ring rounded-[12px] bg-navy px-7 py-4 text-base font-bold text-cream transition-opacity hover:opacity-90"
              >
                خلّينا نبني النظام
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-[12px] border border-navy/20 px-7 py-4 text-base font-bold text-navy transition-colors hover:border-bronze hover:text-bronze"
              >
                شوف المحتوى
              </a>
            </div>
            <div className="mt-4 space-y-1 text-sm leading-relaxed text-subtle sm:text-base">
              <p>هاد مناسب للي عنده شغل وخبرة حقيقية،</p>
              <p>مو للي هدفه بس يصير مؤثر</p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div
              aria-hidden="true"
              className="relative overflow-hidden rounded-[14px] border border-border bg-surface p-7"
            >
              <div className="space-y-3">
                {engineWords.map((w, i) => (
                  <div key={w} className="flex items-center gap-3">
                    <span className="font-latin text-xs tracking-[0.2em] text-bronze">
                      0{i + 1}
                    </span>
                    <span className="font-latin text-base tracking-[0.14em] text-navy uppercase">
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
                <span className="mt-2 block text-base text-subtle">يوم لنبني النظام ونسلّمك ياه</span>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-3">
          {stats.map((s, i) => (
            <li key={i} className="bg-surface p-6 text-center sm:text-start">
              <span
                className={`block text-3xl font-bold text-navy ${s.latin ? "font-latin" : "font-display"}`}
              >
                {s.value}
              </span>
              <span className="mt-2 block text-base leading-relaxed text-subtle">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
