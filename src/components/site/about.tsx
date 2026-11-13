import { siteConfig } from "@/config/site";
import { Section, SectionHead } from "./primitives";
import { InstagramIcon, TikTokIcon, LinkedInIcon } from "./icons";

const chapters = [
  {
    tag: "الإمارات",
    images: [{ src: "/images/ahmad-jebel-jais.webp", alt: "أحمد السقا بجبل جيس" }],
    title: "تركت الصيدلة من معرض سيارات",
    lines: [
      "كنت عم أدرس صيدلة بالإمارات ومخّي كله بالكاميرا، أهرب من المحاضرات لأطلع صوّر عالجبل والبحر",
      "بمعرض دبي للسيارات سلّمت على فريق عرب جي تي وطلعوا بيعرفوني ومتابعين شغلي",
      "من المعرض نفسه اتصلت بأهلي وقلتلهم ما رح كمّل صيدلة",
    ],
  },
  {
    tag: "دبي",
    images: [{ src: "/images/ahmad-dubai.webp", alt: "أحمد السقا بدبي" }],
    title: "سنين ورا الكاميرا",
    lines: [
      "حوّلت لعلاقات عامة وإعلان واشتغلت بالقسم الإلكتروني بجريدة البيان",
      "سنة 2016 أسّست مع شريكي MotionArabia وصوّرنا سيارات من الكامري لحد الرولز رويس والفيراري",
      "اشتغلت مع مشاهير وفود بلوجرز كبار بالإمارات، وبنيت قناة يوتيوب من الصفر لفوق 60 ألف مشترك",
    ],
  },
  {
    tag: "كندا",
    images: [
      { src: "/images/canada-snow.webp", alt: "أحمد السقا بكندا" },
      { src: "/images/amazon-books.webp", alt: "كتب أمازون بالكراج" },
    ],
    title: "بداية من الصفر",
    lines: [
      "انتقلت لكندا وبلّشت من جديد، صوّرت وثائقي للجزيرة بأمريكا واشتغلت مع براندات كتير",
      "وجرّبت بزنسات فشلت، مرة أمازون كبّت آلاف الكتب اللي نضّفناها بإيدينا بالكراج على 30 تحت الصفر",
      "تعلّمت إنه التعب بدون نظام بيضيع مهما كان كبير",
    ],
  },
  {
    tag: "اليوم",
    images: [
      { src: "/images/bts-gimbal.webp", alt: "من كواليس التصوير" },
      { src: "/images/bts-setup.webp", alt: "من كواليس التصوير" },
    ],
    title: "ليش أصحاب الخبرة بالذات",
    lines: [
      "اشتغلت مع شركتين هجرة بكندا ومن أول شهر وصلت حساباتهم لمئات آلاف المشاهدات",
      "وبكل هالسنين شفت نفس المشهد: خبراء ممتازين ما حدا بيعرفهم، والسوق رايح لحدا أقل منهم بس أوضح",
      "لهيك اليوم بشتغل بس مع أصحاب الخبرة وبعدد محدود",
    ],
  },
];

export function AboutSection() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionHead
        id="about-title"
        number="04"
        label="قصتي"
        title={
          <>
            أنا أحمد السقا
            <span className="block text-bronze">من 12 سنة ما تركت الكاميرا</span>
          </>
        }
      />

      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
        <ol className="relative space-y-10 border-s border-bronze/30 ps-7">
          {chapters.map((c) => (
            <li key={c.tag} className="relative">
              <span className="absolute -start-[34px] top-1.5 size-3 rounded-full border-2 border-background bg-bronze" />
              <span className="text-sm font-semibold text-bronze">{c.tag}</span>
              <h3 className="mt-1 text-xl font-bold text-navy">{c.title}</h3>
              <div className="mt-3 space-y-2">
                {c.lines.map((l) => (
                  <p key={l} className="text-base leading-[1.95] text-ink/75">
                    {l}
                  </p>
                ))}
              </div>
              {c.images.length > 0 && (
                <div className={`mt-5 grid gap-3 ${c.images.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-xs"}`}>
                  {c.images.map((im) => (
                    <img
                      key={im.src}
                      src={im.src}
                      alt={im.alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full rounded-[16px] object-cover"
                    />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <img
            src="/images/ahmad-cafe.webp"
            alt="أحمد السقا"
            loading="lazy"
            width={900}
            height={1200}
            className="aspect-[4/5] w-full rounded-[20px] object-cover"
          />
          <div className="rounded-[16px] border border-bronze/40 bg-surface p-6">
            <p className="text-lg leading-[1.7] font-bold text-navy">مش مدرب بيحكيلك نظريات من برّا</p>
            <p className="mt-2 text-base text-subtle">بشتغل معك من جوّا وبنبني النظام سوا</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
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
                className="focus-ring flex items-center justify-center gap-1.5 rounded-[12px] border border-border px-2 py-3 text-sm text-navy transition-colors hover:border-bronze hover:text-bronze"
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
