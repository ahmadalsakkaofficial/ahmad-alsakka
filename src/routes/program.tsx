import { createFileRoute } from "@tanstack/react-router";
import { ProgramLanding } from "@/components/program/landing";
import { siteConfig } from "@/config/site";

const p = siteConfig.program;
const TITLE = `${p.name}: برنامج لايف ${p.datesLabel} | أحمد السقا`;
const DESCRIPTION = "14 يوم منطبّق فيهم الأنظمة السبعة مع بعض: جملتك جاهزة، أفكار لشهر، سكربتات جاهزة، يوم تصوير، وحساب بيحكي عنك";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://ahmad-alsakka.com/program" },
      { property: "og:type", content: "website" },
      // Hidden from search until the payment link is live.
      ...(p.checkoutUrl ? [] : [{ name: "robots", content: "noindex" }]),
    ],
    links: [{ rel: "canonical", href: "https://ahmad-alsakka.com/program" }],
  }),
  component: ProgramLanding,
});
