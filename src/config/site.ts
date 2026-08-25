export const siteConfig = {
  nameArabic: "أحمد السقا",
  nameShort: "أحمد",
  brandName: "The Authority Engine",
  instagramUrl: "https://instagram.com/ahmad.alsakka.official",
  tiktokUrl: "https://tiktok.com/@ahmadalsakka",
  youtubeUrl: "https://www.youtube.com/@AhmadAlsakkaOfficial",
  linkedinUrl: "https://www.linkedin.com/in/alsakkaahm/",
  instagramKeyword: "ENGINE",
  experienceYears: "8+",
  youtubeAudience: "60K+",
  engagementLength: "60 يوماً",
  startingInvestment: "3,000+ USD",
  /** Paid 60-minute strategy session. Change the price and booking link here. */
  strategySessionPrice: "120 USD",
  /** Single booking link for meetings and consultations. */
  bookingUrl: "https://tr.ee/i_PWt_zpk2",
  strategySessionUrl: "https://tr.ee/i_PWt_zpk2",
  location: "كندا",
  primaryAudience: "أصحاب المهن والخدمات العرب",
  /** Future-ready. Component renders nothing while empty. */
  testimonials: [] as Array<{ name: string; role: string; quote: string }>,
} as const;

export const navLinks = [
  { href: "#home", label: "الرئيسية" },
  { href: "#who", label: "لمين هاد؟" },
  { href: "#system", label: "النظام" },
  { href: "#about", label: "عنّي" },
  { href: "#faq", label: "الأسئلة" },
] as const;
