/**
 * Personal Brand Audit — question definitions (Arabic, spoken Levantine tone).
 * One question per screen. Keys are stable: scoring and the AI prompt rely on them.
 */

export type Choice = { value: string; label: string };

export type Question =
  | {
      id: string;
      kind: "text";
      category: string;
      label: string;
      help?: string;
      placeholder?: string;
      required?: boolean;
    }
  | {
      id: string;
      kind: "single";
      category: string;
      label: string;
      help?: string;
      choices: readonly Choice[];
      required?: boolean;
    }
  | {
      id: string;
      kind: "multi";
      category: string;
      label: string;
      help?: string;
      choices: readonly Choice[];
      required?: boolean;
    }
  | {
      id: string;
      kind: "scale";
      category: string;
      label: string;
      help?: string;
      minLabel: string;
      maxLabel: string;
      required?: boolean;
    };

export const questions: readonly Question[] = [
  {
    id: "profession",
    kind: "text",
    category: "التموضع",
    label: "شو شغلك أو مجال عملك؟",
    help: "اكتبها متل ما بتقولها لحدا بتقابله أول مرة",
    placeholder: "مثال، طبيب أسنان تجميلي وعندي عيادة خاصة",
    required: true,
  },
  {
    id: "industry",
    kind: "single",
    category: "التموضع",
    label: "أي قطاع أقرب لشغلك؟",
    choices: [
      { value: "طب وصحة", label: "طب وصحة" },
      { value: "قانون", label: "قانون" },
      { value: "استشارات وأعمال", label: "استشارات وأعمال" },
      { value: "عقارات", label: "عقارات" },
      { value: "هندسة وتقنية", label: "هندسة وتقنية" },
      { value: "مالية واستثمار", label: "مالية واستثمار" },
      { value: "تعليم وتدريب", label: "تعليم وتدريب" },
      { value: "قطاع ثاني", label: "قطاع ثاني" },
    ],
    required: true,
  },
  {
    id: "years",
    kind: "single",
    category: "الحضور",
    label: "كم سنة خبرة عندك بالمجال؟",
    choices: [
      { value: "<2", label: "أقل من سنتين" },
      { value: "2-5", label: "من سنتين لـ 5 سنين" },
      { value: "5-10", label: "من 5 لـ 10 سنين" },
      { value: "10+", label: "أكتر من 10 سنين" },
    ],
    required: true,
  },
  {
    id: "knownFor",
    kind: "text",
    category: "التموضع",
    label: "بشو بدك الناس تعرفك؟",
    help: "يعني لما يذكروا اسمك، شو أول شي لازم يجي ببالهم",
    placeholder: "مثال، الشخص اللي بيشرح زراعة الأسنان بصدق وبدون مبالغة",
    required: true,
  },
  {
    id: "audience",
    kind: "text",
    category: "التموضع",
    label: "مين الزبون المثالي إلك؟",
    help: "كل ما كنت أدق، كل ما صار التحليل أدق",
    placeholder: "مثال، أصحاب شركات صغيرة بالخليج عمرهم بين 30 و 45",
    required: true,
  },
  {
    id: "createsContent",
    kind: "single",
    category: "الحضور",
    label: "هلق عم تعمل محتوى؟",
    choices: [
      { value: "no", label: "لا، ولا شي" },
      { value: "sometimes", label: "بين فترة وفترة، بدون التزام" },
      { value: "regularly", label: "إي، بشكل منتظم" },
    ],
    required: true,
  },
  {
    id: "platforms",
    kind: "multi",
    category: "الجمهور والتوزيع",
    label: "على أي منصات عم تنشر؟",
    help: "فيك تختار أكتر من وحدة",
    choices: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "YouTube", label: "YouTube" },
      { value: "X", label: "X" },
      { value: "Threads", label: "Threads" },
      { value: "none", label: "ولا وحدة لهلق" },
    ],
  },
  {
    id: "frequency",
    kind: "single",
    category: "نظام المحتوى",
    label: "كل قديش عم تنشر؟",
    choices: [
      { value: "never", label: "ما عم أنشر" },
      { value: "monthly", label: "مرة بالشهر تقريباً" },
      { value: "weekly", label: "مرة بالأسبوع" },
      { value: "3-5", label: "من 3 لـ 5 مرات بالأسبوع" },
      { value: "daily", label: "كل يوم" },
    ],
    required: true,
  },
  {
    id: "views",
    kind: "single",
    category: "الجمهور والتوزيع",
    label: "وسطي المشاهدات على المنشور؟",
    choices: [
      { value: "na", label: "ما بعرف أو ما عم أنشر" },
      { value: "<500", label: "أقل من 500" },
      { value: "500-2k", label: "من 500 لـ 2000" },
      { value: "2k-10k", label: "من 2000 لـ 10 آلاف" },
      { value: "10k+", label: "أكتر من 10 آلاف" },
    ],
    required: true,
  },
  {
    id: "followers",
    kind: "single",
    category: "الجمهور والتوزيع",
    label: "تقريباً كم متابع عندك؟",
    choices: [
      { value: "<1k", label: "أقل من 1000" },
      { value: "1k-10k", label: "من 1000 لـ 10 آلاف" },
      { value: "10k-50k", label: "من 10 لـ 50 ألف" },
      { value: "50k+", label: "أكتر من 50 ألف" },
    ],
    required: true,
  },
  {
    id: "leadsFromContent",
    kind: "single",
    category: "العملاء والدخل",
    label: "عم يجيك عملاء من المحتوى؟",
    choices: [
      { value: "none", label: "لا، ولا واحد" },
      { value: "rare", label: "نادراً، بالصدفة" },
      { value: "sometimes", label: "أحياناً، بس مو ثابت" },
      { value: "consistent", label: "إي، بشكل شبه ثابت" },
    ],
    required: true,
  },
  {
    id: "biggestProblem",
    kind: "single",
    category: "نظام المحتوى",
    label: "شو أكبر مشكلة عندك بالمحتوى؟",
    choices: [
      { value: "ideas", label: "ما بعرف شو أحكي" },
      { value: "time", label: "ما عندي وقت" },
      { value: "consistency", label: "ببلّش وبوقف" },
      { value: "quality", label: "النتيجة ما بتعجبني" },
      { value: "reach", label: "المحتوى ما بيوصل" },
      { value: "conversion", label: "بيوصل بس ما بيجيب عملاء" },
      { value: "camera", label: "مو مرتاح قدام الكاميرا" },
    ],
    required: true,
  },
  {
    id: "goal",
    kind: "single",
    category: "العملاء والدخل",
    label: "شو هدفك الأساسي من كل هالشي؟",
    choices: [
      { value: "authority", label: "أصير مرجع بمجالي" },
      { value: "leads", label: "استفسارات وعملاء" },
      { value: "sales", label: "مبيعات مباشرة" },
      { value: "growth", label: "توسيع الشغل" },
      { value: "speaking", label: "فرص ظهور ومؤتمرات" },
      { value: "followers", label: "متابعين وانتشار" },
    ],
    required: true,
  },
  {
    id: "camera",
    kind: "scale",
    category: "الحضور",
    label: "قديش مرتاح قدام الكاميرا؟",
    minLabel: "مو مرتاح أبداً",
    maxLabel: "مرتاح تماماً",
    required: true,
  },
  {
    id: "strategy",
    kind: "single",
    category: "نظام المحتوى",
    label: "عندك استراتيجية محتوى واضحة؟",
    choices: [
      { value: "none", label: "لا، عم أرتجل" },
      { value: "head", label: "برأسي، بس مو مكتوبة" },
      { value: "written", label: "إي، مكتوبة وبمشي عليها" },
    ],
    required: true,
  },
  {
    id: "offer",
    kind: "single",
    category: "العملاء والدخل",
    label: "عندك عرض واضح يقدر الواحد يشتريه بعد ما يشوف محتواك؟",
    choices: [
      { value: "none", label: "لا، ما في شي محدد" },
      { value: "unclear", label: "في، بس مو مشروح منيح" },
      { value: "clear", label: "إي، واضح ومسعّر" },
    ],
    required: true,
  },
  {
    id: "timePerWeek",
    kind: "single",
    category: "نظام المحتوى",
    label: "كم ساعة بالأسبوع فيك تعطي للمحتوى بشكل واقعي؟",
    choices: [
      { value: "<1", label: "أقل من ساعة" },
      { value: "1-3", label: "من ساعة لـ 3 ساعات" },
      { value: "3-5", label: "من 3 لـ 5 ساعات" },
      { value: "5+", label: "أكتر من 5 ساعات" },
    ],
    required: true,
  },
];

export type Answers = Record<string, string | string[]>;
