export type InquiryInput = {
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  profession?: string;
  message?: string;
};

export async function saveInquiry(input: InquiryInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("project_inquiries").insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    instagram: input.instagram ?? "",
    profession: input.profession ?? "",
    message: input.message ?? "",
  });
  if (error) {
    console.error("inquiry insert failed", error);
    throw new Error("insert_failed");
  }
  return { ok: true };
}
