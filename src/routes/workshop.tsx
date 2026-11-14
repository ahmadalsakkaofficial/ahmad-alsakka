import { createFileRoute } from "@tanstack/react-router";
import { WorkshopLanding } from "@/components/workshop/landing";

const TITLE = "ورشة مجانية: كيف تخلي خبرتك تجيبلك عملاء من المحتوى | أحمد السقا";
const DESCRIPTION = "ورشة لايف مجانية لأصحاب الخبرة: التموضع، شو تحكي، التصوير بأقل وقت، وكيف المشاهدة بتصير عميل";

export const Route = createFileRoute("/workshop")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://ahmad-alsakka.lovable.app/workshop" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ahmad-alsakka.lovable.app/workshop" }],
  }),
  component: WorkshopLanding,
});
