import { siteConfig } from "@/config/site";
import portrait from "@/assets/ahmad-portrait.png.asset.json";
import { Section, SectionHead } from "./primitives";
import { InstagramIcon, TikTokIcon, YouTubeIcon, LinkedInIcon } from "./icons";


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
          <img
            src={portrait.url}
            alt="أحمد السقا، مهندس البراند الشخصي"
            loading="lazy"
            width={640}
            height={640}
            className="w-full rounded-[14px] border border-bronze/30 bg-background object-cover"
          />
          <div className="rounded-[12px] border border-bronze/35 bg-background p-6">
            <p className="font-display text-lg leading-[1.8] text-navy">
              لست مدرباً يقف خارج العمل ويشرح لك نظريات،
            </p>
            <p className="mt-3 text-base leading-[1.9] text-subtle">
              أنا Operator يبني معك النظام من الداخل،
            </p>
          </div>


          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center justify-center gap-2 rounded-[12px] bg-navy px-6 py-4 text-base font-bold text-cream transition-opacity hover:opacity-90"
          >
            احجز مكالمة مع أحمد
          </a>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: siteConfig.instagramUrl, label: "Instagram", Icon: InstagramIcon },
              { href: siteConfig.youtubeUrl, label: "YouTube", Icon: YouTubeIcon },
              { href: siteConfig.linkedinUrl, label: "LinkedIn", Icon: LinkedInIcon },
              { href: siteConfig.tiktokUrl, label: "TikTok", Icon: TikTokIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center justify-center gap-2 rounded-[12px] border border-border px-4 py-3 text-base text-navy transition-colors hover:border-bronze hover:text-bronze"
              >
                <Icon className="size-4" />
                <span className="font-latin">{label}</span>
              </a>
            ))}
          </div>

        </aside>
      </div>
    </Section>
  );
}
