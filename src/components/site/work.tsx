import { Section, SectionHead } from "./primitives";
import reel1 from "@/assets/IMG_1985.jpg.asset.json";
import reel2 from "@/assets/IMG_1983.jpg.asset.json";
import reel3 from "@/assets/IMG_1984.jpg.asset.json";
import profile from "@/assets/IMG_1982.jpg.asset.json";

const reels = [
  { src: reel1.url, views: "207K", note: "فيديو تعريفي داخل المكتب" },
  { src: reel2.url, views: "27.6K", note: "فيديو تحذير حول رسالة العمل" },
  { src: reel3.url, views: "14.7K", note: "فيديو تحديث على شروط الهجرة" },
];

export function WorkSection() {
  return (
    <Section id="work" tone="surface" labelledBy="work-title">
      <SectionHead
        id="work-title"
        number="06"
        label="شغل حقيقي"
        title="نماذج من نظام اشتغلنا عليه"
      />

      <div className="mb-10 rounded-[12px] border border-bronze/35 bg-background p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <img
            src={profile.url}
            alt="حساب AJI Canada على إنستغرام"
            loading="lazy"
            className="w-full rounded-[10px] border border-border object-cover sm:max-w-md"
          />
          <div className="space-y-2">
            <p className="font-display text-lg leading-[1.8] text-navy">
              <span className="font-latin">AJI Canada</span>، خدمات هجرة في كندا،
            </p>
            <p className="text-base leading-[1.9] text-subtle">
              بنينا نظام محتوى واضح: زوايا ثابتة، إنتاج أسبوعي، ورسالة وحدة تبني الثقة قبل
              المكالمة،
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {reels.map((r) => (
          <figure key={r.src} className="overflow-hidden rounded-[12px] border border-border bg-background">
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
    </Section>
  );
}
