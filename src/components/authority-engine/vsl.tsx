import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { trackAuthorityEvent, trackMetaEvent } from "@/lib/authority-engine/analytics";

export function Vsl() {
  const [active, setActive] = useState(false);
  const url = siteConfig.authorityEngine.videoUrl;

  function startVideo() {
    setActive(true);
    trackAuthorityEvent("vsl_start");
    trackMetaEvent("VSLStart");
  }

  return (
    <section id="video" className="scroll-mt-20 bg-navy px-5 py-20 text-cream sm:px-8 lg:py-28" aria-labelledby="vsl-title">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-base text-bronze">شوف الفكرة كاملة</p>
        <h2 id="vsl-title" className="mt-3 text-3xl leading-[1.35] text-cream sm:text-5xl">قبل ما أحكيلك شو بنعمل، خليني أفرجيك شو عم نحاول نبني</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-cream/75">بهالفيديو بشرحلك ليش أصحاب الخبرة أحياناً بيضلوا أقل حضوراً من أشخاص أقل خبرة منهم، وكيف بنبني النظام خلال 60 يوم</p>
        <div className="mx-auto mt-10 aspect-video max-w-4xl overflow-hidden border border-cream/20 bg-cream/[0.04] shadow-raised">
          {active && url ? (
            <iframe src={url} title="فيديو The Authority Engine" className="h-full w-full" loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          ) : (
            <button type="button" onClick={startVideo} className="group flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 text-cream" aria-label="شغّل الفيديو">
              <span className="flex size-20 items-center justify-center rounded-full border border-bronze bg-bronze/15 transition-transform group-hover:scale-105"><Play className="size-8 fill-current" /></span>
              <span className="text-lg">{url ? "شغّل الفيديو" : "الفيديو رح ينضاف هون"}</span>
            </button>
          )}
        </div>
        <p className="mt-8 text-lg text-cream/75">إذا حسيت إن هاد بالضبط اللي ناقصك، فيك تقدّم طلبك من هون</p>
        <Button asChild className="mt-5 h-14 bg-bronze px-8 text-lg text-cream hover:bg-bronze/90"><a href="#apply">اعرف إذا النظام مناسب إلك</a></Button>
      </div>
    </section>
  );
}