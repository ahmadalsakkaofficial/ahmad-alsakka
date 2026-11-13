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
    metaPixelId: "",
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
