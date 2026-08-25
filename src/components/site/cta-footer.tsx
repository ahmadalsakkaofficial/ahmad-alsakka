import { siteConfig, navLinks } from "@/config/site";
import { InstagramIcon, TikTokIcon } from "./icons";

export function FinalCta() {
  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="scroll-mt-20 bg-navy px-5 py-24 text-cream sm:px-8 sm:py-32"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-bronze">جاهز تبدأ؟</p>
        <h2
          id="start-title"
          className="mt-6 font-display text-[1.9rem] leading-[1.4] text-cream sm:text-5xl sm:leading-[1.3]"
        >
          خبرتك لا تحتاج صوتاً أعلى،
          <br />
          تحتاج نظاماً أوضح،
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-[2] text-cream/75">
          إذا عندك عمل قائم وخبرة حقيقية، وتريد بناء حضور يجذب الثقة والاستفسارات بدون أن تتحول إلى
          صانع محتوى بدوام كامل، ابدأ المحادثة،
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-[1.95] text-cream/60">
          أعمل مع عدد محدود من المشاريع حتى يبقى التنفيذ مباشراً وقريباً من صاحب العمل،
        </p>

        <p className="mt-8 inline-block rounded-[10px] border border-cream/25 px-5 py-2 text-base text-cream/80">
          المشاريع المخصصة تبدأ من{" "}
          <span className="font-latin font-semibold">{siteConfig.startingInvestment}</span>
        </p>

        <div className="mt-10">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-[12px] bg-bronze px-8 py-4 text-base font-bold text-cream transition-opacity hover:opacity-90 sm:text-base"
          >
            <InstagramIcon className="size-5" />
            أرسل كلمة {siteConfig.instagramKeyword} على Instagram
          </a>
        </div>
        <p className="mx-auto mt-5 max-w-xl text-base leading-[1.95] text-cream/60">
          بعد فتح Instagram، أرسل كلمة {siteConfig.instagramKeyword} في رسالة خاصة، سأطرح عليك بعض
          الأسئلة القصيرة لأعرف إذا كان النظام مناسباً لعملك،
        </p>
        <a
          href={siteConfig.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring mt-6 inline-flex items-center gap-2 text-base text-cream/80 underline-offset-4 hover:underline"
        >
          <TikTokIcon className="size-4" />
          أو تابع المحتوى على TikTok
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background px-5 py-14 sm:px-8">
      <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-navy">
              {siteConfig.nameArabic}
            </span>
            <span className="font-latin text-[10px] font-semibold tracking-[0.18em] text-bronze uppercase">
              {siteConfig.brandName}
            </span>
          </div>
          <p className="mt-3 max-w-sm text-base leading-[1.95] text-subtle">
            براند شخصي ونظام محتوى للمهنيين وأصحاب الخدمات العرب،
          </p>
        </div>

        <nav aria-label="روابط الموقع">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="focus-ring rounded-sm text-base text-subtle transition-colors hover:text-navy"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-start gap-3">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="حساب أحمد على Instagram"
            className="focus-ring rounded-[10px] border border-border p-2.5 text-navy transition-colors hover:border-bronze hover:text-bronze"
          >
            <InstagramIcon className="size-5" />
          </a>
          <a
            href={siteConfig.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="حساب أحمد على TikTok"
            className="focus-ring rounded-[10px] border border-border p-2.5 text-navy transition-colors hover:border-bronze hover:text-bronze"
          >
            <TikTokIcon className="size-5" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-2 border-t border-border pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} أحمد، جميع الحقوق محفوظة</p>
        <p>بُني للخبراء الذين يريدون أن يُعرفوا بعملهم، لا بضجيجهم،</p>
      </div>
    </footer>
  );
}
