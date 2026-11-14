export type WorkshopRegistrationInput = {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  profession: string;
  contentStage: string;
  workshopKey: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  fbclid?: string;
  referrer?: string;
  landingPageUrl?: string;
  eventId: string;
};

export async function saveWorkshopRegistration(input: WorkshopRegistrationInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("workshop_registrations" as never).insert({
    name: input.name,
    email: input.email,
    whatsapp: input.whatsapp,
    country: input.country,
    profession: input.profession,
    content_stage: input.contentStage,
    workshop_key: input.workshopKey,
    utm_source: input.utmSource || null,
    utm_medium: input.utmMedium || null,
    utm_campaign: input.utmCampaign || null,
    utm_content: input.utmContent || null,
    fbclid: input.fbclid || null,
    referrer: input.referrer || null,
    landing_page_url: input.landingPageUrl || null,
    event_id: input.eventId,
  } as never);
  if (error) {
    console.error("workshop registration insert failed", error);
    throw new Error("insert_failed");
  }
  return { ok: true, eventId: input.eventId };
}
