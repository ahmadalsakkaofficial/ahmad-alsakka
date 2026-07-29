import { siteConfig } from "@/config/site";

export function Testimonials() {
  if (siteConfig.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-surface px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
        {siteConfig.testimonials.map((t) => (
          <figure key={t.name} className="rounded-[12px] border border-border bg-background p-6">
            <blockquote className="text-sm leading-relaxed text-subtle">{t.quote}</blockquote>
            <figcaption className="mt-4 text-sm font-bold text-navy">
              {t.name}، <span className="font-normal text-subtle">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
