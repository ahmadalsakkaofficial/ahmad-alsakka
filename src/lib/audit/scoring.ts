import type { Answers } from "./questions";

/**
 * Deterministic scoring. No AI involved: identical answers always give identical scores.
 * Five categories, 20 points each, total 0-100.
 */

export const categoryKeys = ["positioning", "authority", "system", "audience", "monetization"] as const;
export type CategoryKey = (typeof categoryKeys)[number];

export const categoryLabels: Record<CategoryKey, string> = {
  positioning: "التموضع",
  authority: "الحضور والمصداقية",
  system: "نظام المحتوى",
  audience: "الجمهور والتوزيع",
  monetization: "العملاء والدخل",
};

export type ScoreResult = {
  overall: number;
  categories: Record<CategoryKey, number>;
  strongest: CategoryKey;
  weakest: CategoryKey;
};

function str(a: Answers, k: string): string {
  const v = a[k];
  return typeof v === "string" ? v.trim() : "";
}

function list(a: Answers, k: string): string[] {
  const v = a[k];
  return Array.isArray(v) ? v : [];
}

/** Specificity of a free-text answer, 0..max. */
function textScore(value: string, max: number): number {
  const words = value.split(/\s+/).filter(Boolean).length;
  if (words === 0) return 0;
  if (words <= 2) return Math.round(max * 0.3);
  if (words <= 5) return Math.round(max * 0.6);
  if (words <= 12) return Math.round(max * 0.85);
  return max;
}

function map(value: string, table: Record<string, number>): number {
  return table[value] ?? 0;
}

function clamp(n: number, max: number): number {
  return Math.max(0, Math.min(max, Math.round(n)));
}

export function scoreAudit(answers: Answers): ScoreResult {
  const years = str(answers, "years");
  const camera = Number(str(answers, "camera")) || 0;

  const positioning = clamp(
    textScore(str(answers, "knownFor"), 8) +
      textScore(str(answers, "audience"), 7) +
      textScore(str(answers, "profession"), 3) +
      (str(answers, "industry") ? 2 : 0),
    20,
  );

  const authority = clamp(
    map(years, { "<2": 2, "2-5": 4, "5-10": 6, "10+": 8 }) +
      map(str(answers, "createsContent"), { no: 0, sometimes: 3, regularly: 6 }) +
      map(String(camera), { "1": 0, "2": 1.5, "3": 3, "4": 4.5, "5": 6 } as Record<string, number>),
    20,
  );

  const system = clamp(
    map(str(answers, "frequency"), { never: 0, monthly: 2, weekly: 5, "3-5": 7, daily: 8 }) +
      map(str(answers, "strategy"), { none: 0, head: 3, written: 6 }) +
      map(str(answers, "timePerWeek"), { "<1": 1, "1-3": 3, "3-5": 5, "5+": 6 }),
    20,
  );

  const platforms = list(answers, "platforms").filter((p) => p !== "none");
  const platformPoints = platforms.length === 0 ? 0 : platforms.length === 1 ? 3 : platforms.length === 2 ? 5 : 6;

  const audience = clamp(
    map(str(answers, "followers"), { "<1k": 1, "1k-10k": 3, "10k-50k": 5, "50k+": 7 }) +
      map(str(answers, "views"), { na: 0, "<500": 2, "500-2k": 4, "2k-10k": 6, "10k+": 7 }) +
      platformPoints,
    20,
  );

  const monetization = clamp(
    map(str(answers, "leadsFromContent"), { none: 0, rare: 3, sometimes: 6, consistent: 10 }) +
      map(str(answers, "offer"), { none: 0, unclear: 4, clear: 10 }),
    20,
  );

  const categories: Record<CategoryKey, number> = {
    positioning,
    authority,
    system,
    audience,
    monetization,
  };

  const sorted = [...categoryKeys].sort((a, b) => categories[b] - categories[a]);

  return {
    overall: positioning + authority + system + audience + monetization,
    categories,
    strongest: sorted[0]!,
    weakest: sorted[sorted.length - 1]!,
  };
}

export function scoreBand(overall: number): { title: string; note: string } {
  if (overall >= 80)
    return {
      title: "نظام شغّال",
      note: "أساسك قوي، الشغل الجاي على التوسيع والتحسين مو على البناء من الصفر،",
    };
  if (overall >= 60)
    return {
      title: "قاعدة قوية بثغرات",
      note: "في عندك مادة حقيقية، بس في حلقات ناقصة عم تكسر النتيجة،",
    };
  if (overall >= 40)
    return {
      title: "بداية بدون نظام",
      note: "عم تشتغل، بس بدون هيكل يخلّي الشغل يتراكم،",
    };
  return {
    title: "خبرة مخفية",
    note: "الخبرة موجودة، بس ما في حضور يوصّلها للناس الصح،",
  };
}
