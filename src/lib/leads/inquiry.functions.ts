import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { saveInquiry } from "./inquiry.server";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(40),
  instagram: z.string().trim().max(120).optional().default(""),
  profession: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().max(1000).optional().default(""),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => saveInquiry(data));
