import { Section, SectionHead } from "./primitives";
import { EyeIcon } from "./icons";
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
  profile: string;
  profileAlt: string;
  stats: { value: string; label: string }[];
  reels: { src: string; views: string; note: string }[];
};

const clients: Client[] = [
  {
    name: "AJI Canada",
    platform: "Instagram",
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

      <div className="space-y-4">
        {clients.map((c) => (
          <div
            key={c.name}
            className="flex flex-col gap-5 rounded-[12px] border border-bronze/35 bg-background p-5 xl:flex-row xl:items-center xl:justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={c.profile}
                alt={c.profileAlt}
                loading="lazy"
                className="h-12 w-12 shrink-0 rounded-full border border-border object-cover"
              />
              <div className="space-y-0.5">
                <p className="font-display text-lg leading-snug text-navy">
                  <span className="font-latin">{c.name}</span>، على{" "}
                  <span className="font-latin">{c.platform}</span>،
                </p>
                <p className="flex flex-wrap gap-x-5 text-sm text-subtle">
                  {c.stats.map((s) => (
                    <span key={s.label}>
                      <span className="font-display font-latin text-base text-bronze">
                        {s.value}
                      </span>{" "}
                      {s.label}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {c.reels.map((r) => (
                <figure key={r.src} className="w-24 shrink-0 sm:w-28">
                  <img
                    src={r.src}
                    alt={r.note}
                    loading="lazy"
                    className="aspect-[9/16] w-full rounded-[10px] border border-border object-cover"
                  />
<figcaption className="flex items-center justify-center gap-1.5 whitespace-nowrap pt-1.5 text-base text-bronze">
                    <EyeIcon className="h-4 w-4 shrink-0" />
                    <span className="font-display font-latin">{r.views}</span>
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