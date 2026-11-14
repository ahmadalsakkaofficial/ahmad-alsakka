import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { saveWorkshopRegistration } from "./registration.server";

const optionalText = z.string().trim().max(1000).optional().default("");
const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().min(8).max(30),
  country: z.string().trim().min(2).max(80),
  profession: z.string().trim().min(1).max(120),
  contentStage: z.string().trim().min(1).max(160),
  workshopKey: z.string().trim().min(1).max(60),
  utmSource: optionalText,
  utmMedium: optionalText,
  utmCampaign: optionalText,
  utmContent: optionalText,
  fbclid: optionalText,
  referrer: optionalText,
  landingPageUrl: optionalText,
  eventId: z.string().uuid(),
});

export const submitWorkshopRegistration = createServerFn({ method: "POST" })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => saveWorkshopRegistration(data));
