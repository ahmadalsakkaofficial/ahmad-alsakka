import { siteConfig } from "@/config/site";
import { Section, SectionHead } from "./primitives";
import { InstagramIcon, TikTokIcon } from "./icons";

export function AboutSection() {
  return (
    <Section id="about" tone="surface" labelledBy="about-title">
      <SectionHead
        id="about-title"
        number="06"
        label="عن أحمد"
        title="خبرة في التسويق، وعين على التشغيل"
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-base leading-[2] text-subtle">
          <p>
            أنا أحمد، أعمل في التسويق الرقمي، صناعة الفيديو وبناء أنظمة المحتوى منذ أكثر من 8 سنوات،
          </p>
          <p>
            خلال هذه الفترة، عملت على المحتوى لمنصات مثل Instagram وYouTube، وبنيت سابقاً قناة
            YouTube وصلت إلى أكثر من 60 ألف مشترك، لكن الأهم من الأرقام أنني عشت الفرق بين محتوى يجلب
            المشاهدات ومحتوى يبني ثقة وفرصاً حقيقية،
          </p>
          <p>
            عملت أيضاً داخل أعمال ومشاريع خدمية حقيقية، شاهدت كيف يضيع الوقت والمال عندما يعتمد العمل
            على الاجتهاد اليومي بدل النظام، وشاهدت كيف يمكن لخبير ممتاز أن يبقى غير معروف، بينما يأخذ
            السوق شخصاً أقل خبرة لكنه أوضح في رسالته،
          </p>
          <p>لهذا لا أتعامل مع البراند الشخصي كصور جميلة أو فيديوهات أكثر،</p>
          <p>
            أتعامل معه كأصل تجاري: يوضح خبرتك، يبني الثقة قبل المكالمة، ويجعل العميل المناسب يعرف
            لماذا يجب أن يتحدث معك أنت،
          </p>
          <p>أعمل من كندا، وأبني هذا النظام للمهنيين العرب في الخليج والمهجر،</p>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[12px] border border-bronze/35 bg-background p-6">
            <p className="font-display text-lg leading-[1.8] text-navy">
              لست مدرباً يقف خارج العمل ويشرح لك نظريات،
            </p>
            <p className="mt-3 text-base leading-[1.9] text-subtle">
              أنا Operator يبني معك النظام من الداخل،
            </p>
          </div>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center justify-center gap-2 rounded-[12px] bg-navy px-6 py-4 text-base font-bold text-cream transition-opacity hover:opacity-90"
          >
            <InstagramIcon className="size-4" />
            تابع أحمد على Instagram
          </a>
          <a
            href={siteConfig.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center justify-center gap-2 text-base font-medium text-bronze underline-offset-4 hover:underline"
          >
            <TikTokIcon className="size-4" />
            شاهد المحتوى على TikTok
          </a>
        </aside>
      </div>
    </Section>
  );
}
