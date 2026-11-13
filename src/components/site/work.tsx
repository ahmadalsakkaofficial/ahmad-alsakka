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
      { src: ajiReel1.url, views: "+200K", note: "فيديو تعريفي داخل المكتب" },
      { src: ajiReel4.url, views: "+100K", note: "تصريح عمل في كندا" },
      { src: ajiReel5.url, views: "+80K", note: "يوم مفتوح في كازابلانكا" },
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
      { src: wsReel1.url, views: "+100K", note: "أسرع طريقة للهجرة لكندا" },
      { src: wsReel2.url, views: "+100K", note: "كيف تحصل على 600 نقطة" },
      { src: wsReel3.url, views: "+100K", note: "السوبر فيزا للوالدين" },
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
        title="أرقام من حسابات اشتغلنا عليها بكندا"
      />
      <p className="-mt-6 mb-10 max-w-2xl text-base leading-[1.95] text-subtle">
        شركتين هجرة اشتغلنا على محتواهم، ومن أول شهر وصلنا لمئات آلاف المشاهدات
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {clients.map((c) => (
          <article key={c.name} className="rounded-[20px] border border-border bg-background p-5 sm:p-6">
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-3 rounded-[12px]"
            >
              <img
                src={c.profile}
                alt={c.profileAlt}
                loading="lazy"
                className="size-12 shrink-0 rounded-full border border-border bg-muted object-cover"
              />
              <div className="min-w-0">
                <p className="font-latin text-base font-semibold text-navy">{c.name}</p>
                <p className="text-sm text-subtle">
                  {c.platform} ·{" "}
                  {c.stats.map((s) => (
                    <span key={s.label}>
                      <span className="font-latin font-semibold text-bronze">{s.value}</span> {s.label}
                    </span>
                  ))}
                </p>
              </div>
            </a>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {c.reels.map((r) => (
                <figure key={r.src}>
                  <img
                    src={r.src}
                    alt={r.note}
                    loading="lazy"
                    className="aspect-[9/16] w-full rounded-[12px] border border-border bg-muted object-cover"
                  />
                  <figcaption className="pt-2 text-center">
                    <span className="flex items-center justify-center gap-1 text-bronze">
                      <EyeIcon className="h-4 w-4 shrink-0" />
                      <span className="font-latin text-base font-bold">{r.views}</span>
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-subtle">{r.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
