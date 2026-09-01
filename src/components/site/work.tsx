import { Section, SectionHead } from "./primitives";
import ajiProfile from "@/assets/IMG_1982.jpg.asset.json";
import ajiReel1 from "@/assets/IMG_1985.jpg.asset.json";
import ajiReel2 from "@/assets/IMG_1983.jpg.asset.json";
import ajiReel3 from "@/assets/IMG_1984.jpg.asset.json";
import wsProfile from "@/assets/IMG_1987.jpg.asset.json";
import wsReel1 from "@/assets/IMG_1989.jpg.asset.json";
import wsReel2 from "@/assets/IMG_1988.jpg.asset.json";
import wsReel3 from "@/assets/IMG_1991.jpg.asset.json";

type Client = {
  name: string;
  platform: string;
  summary: string;
  profile: string;
  profileAlt: string;
  stats: { value: string; label: string }[];
  reels: { src: string; views: string; note: string }[];
};

const clients: Client[] = [
  {
    name: "AJI Canada",
    platform: "Instagram",
    summary:
      "خدمات هجرة في كندا، بنينا نظام محتوى واضح: زوايا ثابتة، إنتاج أسبوعي، ورسالة وحدة تبني الثقة قبل المكالمة،",
    profile: ajiProfile.url,
    profileAlt: "حساب AJI Canada على إنستغرام",
    stats: [
      { value: "10.1K", label: "متابع" },
      { value: "241", label: "منشور" },
    ],
    reels: [
      { src: ajiReel1.url, views: "207K", note: "فيديو تعريفي داخل المكتب" },
      { src: ajiReel2.url, views: "27.6K", note: "تحذير حول رسالة العمل" },
      { src: ajiReel3.url, views: "14.7K", note: "تحديث على شروط الهجرة" },
    ],
  },
  {
    name: "WestStep Canada Immigration",
    platform: "TikTok",
    summary:
      "استشارات هجرة، اشتغلنا على زوايا تجاوب على أسئلة العميل الحقيقية، والنتيجة وصول أوسع واستفسارات أجدّ،",
    profile: wsProfile.url,
    profileAlt: "حساب WestStep Canada Immigration على تيك توك",
    stats: [
      { value: "66.3K", label: "متابع" },
      { value: "133K", label: "إعجاب" },
    ],
    reels: [
      { src: wsReel1.url, views: "158.2K", note: "أسرع طريقة للهجرة لكندا" },
      { src: wsReel2.url, views: "150K", note: "كيف تحصل على 600 نقطة" },
      { src: wsReel3.url, views: "144.6K", note: "السوبر فيزا للوالدين" },
    ],
  },
];

export function WorkSection() {
  return (
    <Section id="work" tone="surface" labelledBy="work-title">
      <SectionHead
        id="work-title"
        number="06"
        label="شغل حقيقي"
        title="نماذج من أنظمة اشتغلنا عليها"
      />

      <div className="space-y-14">
        {clients.map((c) => (
          <div key={c.name} className="space-y-6">
            <div className="rounded-[12px] border border-bronze/35 bg-background p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <img
                  src={c.profile}
                  alt={c.profileAlt}
                  loading="lazy"
                  className="w-full rounded-[10px] border border-border object-cover sm:max-w-xs"
                />
                <div className="space-y-3">
                  <p className="font-display text-lg leading-[1.8] text-navy">
                    <span className="font-latin">{c.name}</span>، على{" "}
                    <span className="font-latin">{c.platform}</span>،
                  </p>
                  <p className="text-base leading-[1.9] text-subtle">{c.summary}</p>
                  <div className="flex gap-6 pt-1">
                    {c.stats.map((s) => (
                      <div key={s.label}>
                        <p className="font-display text-xl text-bronze font-latin">{s.value}</p>
                        <p className="text-sm text-subtle">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {c.reels.map((r) => (
                <figure
                  key={r.src}
                  className="overflow-hidden rounded-[12px] border border-border bg-background"
                >
                  <img
                    src={r.src}
                    alt={r.note}
                    loading="lazy"
                    className="aspect-[9/16] w-full object-cover"
                  />
                  <figcaption className="space-y-1 p-5">
                    <p className="font-display text-xl text-bronze">
                      <span className="font-latin">{r.views}</span> مشاهدة
                    </p>
                    <p className="text-base leading-[1.8] text-subtle">{r.note}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
