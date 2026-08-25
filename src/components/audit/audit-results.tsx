import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { categoryLabels, categoryKeys, type CategoryKey } from "@/lib/audit/scoring";
import type { AuditResult } from "@/lib/audit/audit.server";
import { trackCtaClick } from "@/lib/audit/audit.functions";
import { siteConfig } from "@/config/site";
import { InstagramIcon } from "@/components/site/icons";

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <li className="border-b border-border py-4 last:border-b-0">
      <div className="flex items-baseline justify-between">
        <span className="text-base text-ink sm:text-base">{label}</span>
        <span className="font-latin text-base text-navy">
          {value}
          <span className="text-subtle">/20</span>
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-bronze transition-[width] duration-700"
          style={{ width: `${(value / 20) * 100}%` }}
        />
      </div>
    </li>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-8">
      <h3 className="text-sm tracking-wide text-bronze">{title}</h3>
      <div className="mt-3 text-base leading-[2] text-ink">{children}</div>
    </div>
  );
}

export function AuditResults({
  result,
  contact,
}: {
  result: AuditResult;
  contact: { name: string };
}) {
  const track = useServerFn(trackCtaClick);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      setShown(Math.round(result.overall * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [result.overall]);

  function onCta(target: "strategy" | "work") {
    if (result.leadId) void track({ data: { leadId: result.leadId, target } });
  }

  const a = result.analysis;

  return (
    <div>
      <section className="bg-navy px-5 py-16 text-cream sm:px-8 sm:py-24">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-sm tracking-[0.2em] text-bronze">
            نتيجة البراند الشخصي، {contact.name}
          </p>
          <div className="mt-6 flex items-end gap-3">
            <span className="font-latin text-7xl leading-none font-bold text-cream sm:text-8xl">
              {shown}
            </span>
            <span className="font-latin mb-2 text-2xl text-cream/50">/100</span>
          </div>
          <h1 className="mt-6 font-display text-[1.6rem] leading-[1.4] text-cream sm:text-3xl">
            {result.band.title}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-[2] text-cream/70">{result.band.note}</p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="font-display text-xl text-navy sm:text-2xl">المحاور الخمسة</h2>
          <ul className="mt-4 rounded-[14px] border border-border bg-surface px-5">
            {categoryKeys.map((k: CategoryKey) => (
              <Bar key={k} label={categoryLabels[k]} value={result.categories[k]} />
            ))}
          </ul>

          <div className="mt-14 space-y-10">
            {a.summary && <Block title="قراءة سريعة لوضعك">{a.summary}</Block>}
            {a.strongest && (
              <Block title={`أقوى محور، ${categoryLabels[result.strongest]}`}>{a.strongest}</Block>
            )}
            {a.weakest && (
              <Block title={`أضعف محور، ${categoryLabels[result.weakest]}`}>{a.weakest}</Block>
            )}
            {a.holdingBack && <Block title="شو عم يوقفك هلق">{a.holdingBack}</Block>}
            {a.opportunities.length > 0 && (
              <Block title="أكبر ثلاث فرص عندك">
                <ol className="space-y-3">
                  {a.opportunities.map((o, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-latin text-base text-bronze">0{i + 1}</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            )}
            {a.actions.length > 0 && (
              <Block title="ثلاث خطوات تنفيذية">
                <ol className="space-y-3">
                  {a.actions.map((o, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-latin text-base text-bronze">0{i + 1}</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            )}
            {a.contentStrategy && (
              <Block title="استراتيجية محتوى مقترحة">{a.contentStrategy}</Block>
            )}
            {a.next30Days && <Block title="أول 30 يوم">{a.next30Days}</Block>}
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="font-display text-[1.6rem] leading-[1.4] text-navy sm:text-3xl">
            بدك مساعدة تبني هالنظام؟
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-[2] text-subtle">
            بساعد أصحاب المهن والشركات يحوّلوا خبرتهم لنظام براند ومحتوى بيبني ثقة وبيجيب فرص شغل
            حقيقية، إذا حابب تكمّل، عندك طريقتين،
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="flex flex-col rounded-[14px] border border-border bg-background p-7">
              <span className="text-sm tracking-wide text-bronze">الخيار الأول</span>
              <h3 className="mt-3 font-display text-xl text-navy">جلسة استراتيجية</h3>
              <p className="mt-3 flex-1 text-base leading-[1.95] text-subtle">
                <span className="font-latin">60</span> دقيقة وجهاً لوجه على تقييمك، منمشي على
                النتيجة، منحدد التموضع، ومنطلع بخطة محتوى إلك إنت، هاي جلسة مدفوعة، مو مكالمة بيع،
              </p>
              <p className="mt-5 text-base text-navy">
                السعر،{" "}
                <span className="font-latin font-semibold">{siteConfig.strategySessionPrice}</span>
              </p>
              <a
                href={siteConfig.strategySessionUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCta("strategy")}
                className="focus-ring mt-6 inline-flex items-center justify-center rounded-[12px] border border-navy/25 px-6 py-3.5 text-base font-bold text-navy transition-colors hover:border-bronze hover:text-bronze"
              >
                احجز الجلسة
              </a>
            </div>

            <div className="flex flex-col rounded-[14px] border border-bronze/40 bg-background p-7">
              <span className="text-sm tracking-wide text-bronze">الخيار التاني</span>
              <h3 className="mt-3 font-display text-xl text-navy">اشتغل معي</h3>
              <p className="mt-3 flex-1 text-base leading-[1.95] text-subtle">
                للي بدو حدا يبني النظام معه وينفّذه، منشتغل سوا على الاستراتيجية، النظام، الإنتاج،
                والتسليم، بعدد محدود من المشاريع،
              </p>
              <p className="mt-5 text-base text-navy">
                المشاريع بتبدأ من{" "}
                <span className="font-latin font-semibold">{siteConfig.startingInvestment}</span>
              </p>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCta("work")}
                className="focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-[12px] bg-bronze px-6 py-3.5 text-base font-bold text-cream transition-opacity hover:opacity-90"
              >
                <InstagramIcon className="size-4" />
                قدّم للشغل معي
              </a>
            </div>
          </div>

          <p className="mt-8 text-base leading-[1.95] text-subtle">
            بعد ما تفتح Instagram، أرسل كلمة {siteConfig.instagramKeyword} برسالة خاصة مع نتيجتك،
            ورح أرد عليك بأسئلة قصيرة،
          </p>
        </div>
      </section>
    </div>
  );
}
