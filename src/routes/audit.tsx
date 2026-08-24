import { createFileRoute } from "@tanstack/react-router";
import { AuditExperience } from "@/components/audit/audit-experience";

const TITLE = "تقييم البراند الشخصي المجاني | أحمد";
const DESCRIPTION =
  "تقييم مجاني بياخد 3 لـ 5 دقايق، بيعطيك نتيجة من 100 على خمس محاور وتحليل شخصي لبراندك الشخصي مبني على أجوبتك إنت،";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/audit" }],
  }),
  component: AuditPage,
});

function AuditPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <AuditExperience />
    </main>
  );
}
