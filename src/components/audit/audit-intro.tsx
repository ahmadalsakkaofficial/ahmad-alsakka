import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

const points = [
  "تقييم مبني على أجوبتك، مو على كلام عام",
  "نتيجة من 100 موزّعة على 5 محاور",
  "تحليل شخصي، نقاط قوتك، الثغرة الأكبر، وخطة أول 30 يوم",
];

export function AuditIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-24">
      <Link
        to="/"
        className="focus-ring rounded-sm text-sm text-subtle transition-colors hover:text-navy"
      >
        رجوع للموقع
      </Link>

      <p className="mt-8 text-sm tracking-wide text-bronze sm:text-base">
        تقييم البراند الشخصي، مجاني
      </p>
      <h1 className="mt-5 font-display text-[1.9rem] leading-[1.42] text-navy sm:text-5xl sm:leading-[1.3]">
        <span className="block">الخبرة عندك أصلاً،</span>
        <span className="block">
          خلينا نشوف شو <span className="text-bronze">عم يوقف</span> براندك عن تحويلها لثقة وعملاء
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-[2] text-subtle sm:text-lg">
        17 سؤال قصير عن شغلك، محتواك، وجمهورك، بعدها بتطلعلك نتيجة رقمية دقيقة وتحليل مكتوب مبني على
        أجوبتك إنت بالذات، مو نصايح جاهزة،
      </p>

      <ul className="mt-8 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-base leading-[1.95] text-ink">
            <span className="mt-3 size-1.5 shrink-0 rounded-full bg-bronze" />
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onStart}
          className="focus-ring rounded-[12px] bg-navy px-8 py-4 text-base font-bold text-cream transition-opacity hover:opacity-90 sm:text-base"
        >
          ابدأ التقييم المجاني
        </button>
        <span className="text-base text-subtle">
          بياخد من <span className="font-latin">3</span> لـ <span className="font-latin">5</span>{" "}
          دقايق
        </span>
      </div>

      <p className="mt-10 max-w-2xl text-base leading-[1.95] text-subtle">
        هالتقييم مبني على نفس الطريقة اللي بشتغل فيها مع عملاء {siteConfig.brandName}، النتيجة
        محسوبة بمعادلة ثابتة، يعني نفس الأجوبة بتعطي دايماً نفس النتيجة،
      </p>
    </div>
  );
}
