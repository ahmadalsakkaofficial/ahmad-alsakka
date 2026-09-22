import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { saveAuthorityApplication } from "./application.server";

const optionalText = z.string().trim().max(1000).optional().default("");
const applicationSchema = z.object({
  profession: z.string().trim().min(1).max(120),
  market: z.string().trim().min(1).max(120),
  contentStage: z.string().trim().min(1).max(160),
  primaryGoal: z.string().trim().min(1).max(160),
  startTimeline: z.string().trim().min(1).max(120),
  investmentFit: z.string().trim().min(1).max(160),
  decisionMaker: z.string().trim().min(1).max(160),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(50),
  email: z.string().trim().email().max(200),
  instagram: optionalText,
  linkedin: optionalText,
  website: optionalText,
  note: optionalText,
  utmSource: optionalText,
  utmMedium: optionalText,
  utmCampaign: optionalText,
  utmContent: optionalText,
  utmTerm: optionalText,
  fbclid: optionalText,
  referrer: optionalText,
  landingPageUrl: z.string().url().max(1000),
  eventId: z.string().uuid(),
});

export const submitAuthorityApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => saveAuthorityApplication(data));