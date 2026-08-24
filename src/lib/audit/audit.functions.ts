import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { runAudit, recordClick } from "./audit.server";

const submitSchema = z.object({
  answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  social: z.string().max(120).optional().default(""),
});

export const submitAudit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }) => runAudit(data));

const clickSchema = z.object({
  leadId: z.string().uuid(),
  target: z.enum(["strategy", "work"]),
});

export const trackCtaClick = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => clickSchema.parse(data))
  .handler(async ({ data }) => recordClick(data.leadId, data.target));
