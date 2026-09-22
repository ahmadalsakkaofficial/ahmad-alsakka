export type AuthorityApplicationInput = {
  profession: string;
  market: string;
  contentStage: string;
  primaryGoal: string;
  startTimeline: string;
  investmentFit: string;
  decisionMaker: string;
  name: string;
  phone: string;
  email: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
  note?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  referrer?: string;
  landingPageUrl: string;
  eventId: string;
};

export async function saveAuthorityApplication(input: AuthorityApplicationInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("authority_engine_applications").insert({
    profession: input.profession,
    market: input.market,
    content_stage: input.contentStage,
    primary_goal: input.primaryGoal,
    start_timeline: input.startTimeline,
    investment_fit: input.investmentFit,
    decision_maker: input.decisionMaker,
    name: input.name,
    phone: input.phone,
    email: input.email,
    instagram: input.instagram || null,
    linkedin: input.linkedin || null,
    website: input.website || null,
    note: input.note || null,
    utm_source: input.utmSource || null,
    utm_medium: input.utmMedium || null,
    utm_campaign: input.utmCampaign || null,
    utm_content: input.utmContent || null,
    utm_term: input.utmTerm || null,
    fbclid: input.fbclid || null,
    referrer: input.referrer || null,
    landing_page_url: input.landingPageUrl,
    event_id: input.eventId,
  });
  if (error) {
    console.error("authority application insert failed", error);
    throw new Error("insert_failed");
  }
  return { ok: true, eventId: input.eventId };
}