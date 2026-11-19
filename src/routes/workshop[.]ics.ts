import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { siteConfig } from "@/config/site";

const w = siteConfig.workshop;

function icsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export const Route = createFileRoute("/workshop.ics")({
  server: {
    handlers: {
      GET: async () => {
        const start = new Date(w.startIso);
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        const alarm = (min: number) => ["BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:الندوة بتبلش قريب", `TRIGGER:-PT${min}M`, "END:VALARM"];
        const body = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//ahmad-alsakka.com//workshop//AR",
          "CALSCALE:GREGORIAN",
          "METHOD:PUBLISH",
          "BEGIN:VEVENT",
          `UID:${w.key}@ahmad-alsakka.com`,
          `DTSTAMP:${icsDate(new Date())}`,
          `DTSTART:${icsDate(start)}`,
          `DTEND:${icsDate(end)}`,
          `SUMMARY:ندوة أحمد السقا: ${w.title}`,
          "DESCRIPTION:ندوة لايف مجانية. رابط الدخول بيوصلك عالإيميل قبل الندوة بيوم وبساعة.",
          "LOCATION:أونلاين (الرابط بالإيميل)",
          "URL:https://ahmad-alsakka.com/workshop",
          ...alarm(60),
          ...alarm(10),
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\r\n");
        return new Response(body, {
          headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": 'attachment; filename="ahmad-alsakka-workshop.ics"',
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});
