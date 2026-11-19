export const siteConfig = {
  nameArabic: "أحمد السقا",
  nameShort: "أحمد",
  brandName: "The Authority Engine",
  instagramUrl: "https://instagram.com/ahmad.alsakka.official",
  tiktokUrl: "https://tiktok.com/@ahmadalsakka",
  linkedinUrl: "https://www.linkedin.com/in/alsakkaahm/",
  instagramKeyword: "ENGINE",
  engagementLength: "3 شهور",
  startingInvestment: "3,000 USD بالشهر × 3 شهور",
  /** Paid 60-minute strategy session (USD; credited to month 1 if they join). */
  strategySessionPrice: "120 USD",
  /** Single booking link for meetings and consultations. */
  bookingUrl: "https://tr.ee/i_PWt_zpk2",
  strategySessionUrl: "https://tr.ee/i_PWt_zpk2",
  authorityEngine: {
    /** Add a YouTube, Vimeo, or Wistia embed URL when the final VSL is ready. */
    videoUrl: "",
    /** Add the Meta Pixel ID before launching paid ads. */
    metaPixelId: "1172223479093393",
  },
  workshop: {
    /** Internal key saved with each registration. Change it for every new workshop. */
    key: "workshop-1",
    title: "ليش الأقل خبرة منك معروف أكتر؟",
    subtitle: "والأنظمة السبعة اللي بتخلي الناس تعرف شو بتعمل وليش انت",
    /** Fill both when the date is decided, e.g. "السبت 12 كانون الأول" and "8 المسا بتوقيت السعودية". Empty = "الموعد بينعلن قريب". */
    dateLabel: "الاتنين 30 نوفمبر",
    timeLabel: "8 المسا بتوقيت السعودية · 9 الإمارات",
    /** ISO start time for the calendar button on the thank-you page, e.g. "2026-12-12T17:00:00Z". */
    startIso: "2026-11-30T17:00:00Z",
    /** Ahmad's WhatsApp number in international format without +, for the "save my number" button. */
    whatsappNumber: "",
    /** Short invite video (YouTube/Vimeo embed URL or .mp4). Empty = show the photo instead. */
    videoUrl: "",
    /** Brevo contact list name for this workshop (created automatically if missing). */
    brevoListName: "ندوة 30 نوفمبر 2026",
    /** Sender shown on emails. Must be a verified sender/domain in Brevo. */
    senderName: "أحمد السقا",
    senderEmail: "ahmad@ahmad-alsakka.com",
    /** Replies to workshop emails land here. */
    replyToEmail: "ahmad.skaa@gmail.com",
  },
  location: "كندا",
  primaryAudience: "أصحاب المهن والخدمات العرب",
  /** Future-ready. Component renders nothing while empty. */
  testimonials: [] as Array<{ name: string; role: string; quote: string }>,
} as const;

export const navLinks = [
  { href: "#work", label: "الشغل" },
  { href: "#system", label: "البرنامج" },
  { href: "#about", label: "قصتي" },
  { href: "#faq", label: "الأسئلة" },
] as const;
