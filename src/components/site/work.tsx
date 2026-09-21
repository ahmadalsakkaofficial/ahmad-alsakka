import { Section, SectionHead } from "./primitives";
import { EyeIcon } from "./icons";
import ajiProfile from "@/assets/IMG_1982.jpg.asset.json";
import ajiReel1 from "@/assets/IMG_1985.jpg.asset.json";
import ajiReel4 from "@/assets/IMG_1992.jpg.asset.json";
import ajiReel5 from "@/assets/IMG_1993.jpg.asset.json";
import wsProfile from "@/assets/IMG_1987.jpg.asset.json";
import wsReel1 from "@/assets/IMG_1989.jpg.asset.json";
import wsReel2 from "@/assets/IMG_1988.jpg.asset.json";
import wsReel3 from "@/assets/IMG_1991.jpg.asset.json";

type Client = {
  name: string;
  platform: string;
  link: string;
  profile: string;
  profileAlt: string;
  stats: { value: string; label: string }[];
  reels: { src: string; views: string; note: string }[];
};

const clients: Client[] = [
  {
name: "AJI Canada",
    platform: "انستقرام",
    link: "https://www.instagram.com/aji_canada/",
    profile: ajiProfile.url,
    profileAlt: "حساب AJI Canada على انستقرام",
    stats: [{ value: "10.1K", label: "متابع" }],
    reels: [
      { src: ajiReel1.url, views: "207K", note: "فيديو تعريفي داخل المكتب" },
      { src: ajiReel4.url, views: "137.9K", note: "تصريح عمل في كندا" },
      { src: ajiReel5.url, views: "86.5K", note: "يوم مفتوح في كازابلانكا" },
    ],
  },
  {
name: "WestStep Canada Immigration",
    platform: "تيك توك",
    link: "https://www.tiktok.com/@weststep.canada?lang=en",
    profile: wsProfile.url,
    profileAlt: "حساب WestStep Canada Immigration على تيك توك",
    stats: [{ value: "66.3K", label: "متابع" }],
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
        number="01"
        label="شغل حقيقي"
        title="نماذج من أنظمة اشتغلنا عليها"
      />

      <div className="mx-auto w-full max-w-2xl space-y-4">
        {clients.map((c) => (
          <div
            key={c.name}
            className="flex flex-col gap-5 rounded-[12px] border border-bronze/35 bg-background p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between"
          >
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 shrink-0 items-center gap-3 rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
            >
              <img
                src={c.profile}
                alt={c.profileAlt}
                loading="lazy"
                className="h-11 w-11 shrink-0 rounded-full border border-border object-cover"
              />
              <div className="min-w-0 space-y-0.5">
                <p className="font-display text-base leading-snug text-navy">
                  <span className="font-latin">{c.name}</span> على{" "}
                  {c.platform}
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
            </a>

            <div className="flex gap-2.5 overflow-x-auto pb-1 lg:shrink-0">
              {c.reels.map((r) => (
                <figure key={r.src} className="w-24 shrink-0 sm:w-24 lg:w-20">
                  <img
                    src={r.src}
                    alt={r.note}
                    loading="lazy"
                    className="aspect-[9/16] w-full rounded-[10px] border border-border object-cover"
                  />
                  <figcaption className="flex items-center justify-center gap-1 whitespace-nowrap pt-1.5 text-sm text-bronze">
                    <EyeIcon className="h-3.5 w-3.5 shrink-0" />
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