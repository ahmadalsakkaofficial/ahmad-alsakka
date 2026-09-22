import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const TITLE = "وصل طلبك | The Authority Engine";
const DESCRIPTION = "تم استلام طلبك للانضمام إلى The Authority Engine";

export const Route = createFileRoute("/authority-engine_/thank-you")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "https://ahmad-alsakka.lovable.app/authority-engine/thank-you" }] }),
  component: ThankYou,
});

function ThankYou() {
  return <main className="flex min-h-screen items-center bg-navy px-5 py-20 text-cream"><div className="mx-auto max-w-2xl text-center"><p className="text-base text-bronze">تم استلام الطلب</p><h1 className="mt-5 text-5xl leading-[1.3] text-cream sm:text-7xl">وصل طلبك 🙌</h1><p className="mt-7 text-xl leading-9 text-cream/75">رح أراجع المعلومات، وإذا شفت إن في توافق بين وضعك والـAuthority Engine بنتواصل معك بالخطوة التالية</p><div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild className="h-13 bg-bronze px-7 text-cream hover:bg-bronze/90"><a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">احجز استشارة</a></Button><Button asChild variant="outline" className="h-13 border-cream/25 bg-transparent px-7 text-cream hover:bg-cream/10 hover:text-cream"><Link to="/">الموقع الرئيسي</Link></Button></div></div></main>;
}