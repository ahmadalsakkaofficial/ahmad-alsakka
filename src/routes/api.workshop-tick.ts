import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/api/workshop-tick")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { checkJobToken, runWorkshopTick } = await import("@/lib/workshop/reminders.server");
        if (!(await checkJobToken(request))) return new Response("Unauthorized", { status: 401 });
        try {
          const result = await runWorkshopTick();
          return Response.json(result);
        } catch (e) {
          console.error("workshop tick failed", e);
          return Response.json({ error: (e as Error).message }, { status: 500 });
        }
      },
    },
  },
});
