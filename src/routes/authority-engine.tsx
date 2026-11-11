import { createFileRoute } from "@tanstack/react-router";
import { AuthorityEngineLanding } from "@/components/authority-engine/landing";

const TITLE = "The Authority Engine | خلّي حضورك بمستوى خبرتك";
const DESCRIPTION = "نظام براند شخصي ومحتوى لأصحاب الخبرة يحوّل خبرتك وطريقة تفكيرك لحضور واضح خلال 3 شهور";

export const Route = createFileRoute("/authority-engine")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://ahmad-alsakka.lovable.app/authority-engine" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://ahmad-alsakka.lovable.app/authority-engine" }],
  }),
  component: AuthorityEngineLanding,
});