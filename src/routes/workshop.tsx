import { createFileRoute } from "@tanstack/react-router";
import { WorkshopLanding } from "@/components/workshop/landing";

const TITLE = "ندوة مجانية: ليش الأقل خبرة منك معروف أكتر؟ | أحمد السقا";
const DESCRIPTION = "ندوة لايف مجانية الخميس 10 ديسمبر: الأنظمة السبعة اللي بتخلي الناس تعرف شو بتعمل وليش انت، لأصحاب الشغل والموظفين";

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
