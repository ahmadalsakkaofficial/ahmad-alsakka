import { siteConfig } from "@/config/site";
import portrait from "@/assets/ahmad-portrait.png.asset.json";
import { Section, SectionHead } from "./primitives";
import { InstagramIcon, TikTokIcon, LinkedInIcon } from "./icons";


export function AboutSection() {
  return (
    <Section id="about" tone="surface" labelledBy="about-title">
      <SectionHead
        id="about-title"
        number="07"
        label="عن أحمد"
        title="بصنع محتوى من 2016، وبفكّر بالبزنس"
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-base leading-[2] text-subtle">
          <p>أنا أحمد، من 2016 وأنا بشتغل بصناعة المحتوى والفيديو</p>
          <p>
            أسّست مع شريكي MotionArabia بدبي، وكنت ماسك المحتوى وتخطيط التصوير، واشتغلت مع جريدة
            البيان، ومع مشاريع كتير بين الخليج وكندا
          </p>
          <p>
            بكندا اشتغلت مع شركتين هجرة، AJI Canada وWestStep، حساباتهم جابت أكتر من 100 ألف مشاهدة
            بأول شهر، وفي فيديو لحاله جاب 207 ألف
          </p>
          <p>
            بس الشي اللي تعلّمته أكتر من الأرقام: في فرق كبير بين محتوى بيجيب مشاهدات، ومحتوى بيخلّي
            الشخص الصح يثق فيك ويتصل فيك، وشفت كتير خبراء ممتازين ضلّوا مش معروفين، والسوق راح لحدا
            أقل خبرة منهم بس أوضح
          </p>
          <p>
            لهيك ما بتعامل مع البراند الشخصي كصور حلوة أو فيديوهات أكتر، بتعامل معه كأصل للبزنس:
            بيوضّح خبرتك، وبيبني الثقة قبل المكالمة
          </p>
          <p>بشتغل من كندا، مع أصحاب الخبرة العرب بالخليج والمهجر</p>
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
              مش مدرب بيوقف برّا وبيشرحلك نظريات
            </p>
            <p className="mt-3 text-base leading-[1.9] text-subtle">
              أنا Operator بيبني معك النظام من جوّا
            </p>
          </div>


          <a
            href="/authority-engine"
            className="focus-ring flex items-center justify-center gap-2 rounded-[12px] bg-navy px-6 py-4 text-base font-bold text-cream transition-opacity hover:opacity-90"
          >
            شوف إذا مناسب إلك
          </a>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: siteConfig.instagramUrl, label: "Instagram", Icon: InstagramIcon },
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
