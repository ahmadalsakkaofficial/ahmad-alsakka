import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { ProblemSection, WhoSection } from "@/components/site/problem-who";
import {
  EngineSection,
  TrustSection,
  DifferenceSection,
  PrinciplesSection,
} from "@/components/site/engine-sections";
import { AboutSection } from "@/components/site/about";
import { FaqSection, faqs } from "@/components/site/faq";
import { FinalCta, SiteFooter } from "@/components/site/cta-footer";
import { Testimonials } from "@/components/site/testimonials";
import { siteConfig } from "@/config/site";

const TITLE = "أحمد | بناء البراند الشخصي ونظام المحتوى للمهنيين العرب";
const DESCRIPTION =
  "أساعد أصحاب المهن والخدمات العرب على تحويل خبرتهم إلى براند شخصي ونظام محتوى واضح يبني الثقة ويجذب الاستفسارات خلال 60 يوماً";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "بناء البراند الشخصي, براند شخصي للمهنيين, صناعة المحتوى للأطباء, صناعة المحتوى للمحامين, التسويق للمستشارين, نظام صناعة المحتوى, التسويق الشخصي, Personal Branding بالعربي, بناء سلطة مهنية, صناعة محتوى لأصحاب الأعمال",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://ahmad-alsakka.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://ahmad-alsakka.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              name: "أحمد السقا",
              alternateName: "Ahmad Alsakka",
              jobTitle: "Personal Brand & Content System Architect",
              description: DESCRIPTION,
              knowsLanguage: ["ar", "en"],
              sameAs: [
                siteConfig.instagramUrl,
                siteConfig.tiktokUrl,
                siteConfig.youtubeUrl,
                siteConfig.linkedinUrl,
              ],
              address: { "@type": "PostalAddress", addressCountry: "CA" },
            },
            {
              "@type": "ProfessionalService",
              name: siteConfig.brandName,
              description:
                "نظام بناء البراند الشخصي والمحتوى للمهنيين العرب خلال 60 يوماً: استراتيجية، نظام، إنتاج، وتسليم،",
              areaServed: ["الخليج العربي", "كندا", "المهنيون العرب حول العالم"],
              sameAs: [
                siteConfig.instagramUrl,
                siteConfig.tiktokUrl,
                siteConfig.youtubeUrl,
                siteConfig.linkedinUrl,
              ],
              provider: { "@type": "Person", name: "أحمد السقا" },
            },

            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteNav />
      <main>
        <Hero />
        <ProblemSection />
        <WhoSection />
        <EngineSection />
        <TrustSection />
        <DifferenceSection />
        <AboutSection />
        <PrinciplesSection />
        <Testimonials />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
