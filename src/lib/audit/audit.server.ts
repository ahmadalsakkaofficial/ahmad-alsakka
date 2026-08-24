import { scoreAudit, categoryLabels, scoreBand, type CategoryKey } from "./scoring";
import { questions, type Answers } from "./questions";

export type Analysis = {
  summary: string;
  strongest: string;
  weakest: string;
  holdingBack: string;
  opportunities: string[];
  actions: string[];
  contentStrategy: string;
  next30Days: string;
};

export type AuditResult = {
  leadId: string | null;
  overall: number;
  categories: Record<CategoryKey, number>;
  strongest: CategoryKey;
  weakest: CategoryKey;
  band: { title: string; note: string };
  analysis: Analysis;
};

function readableAnswers(answers: Answers): string {
  return questions
    .map((q) => {
      const raw = answers[q.id];
      if (raw === undefined || raw === "" || (Array.isArray(raw) && raw.length === 0)) {
        return `${q.label}: (ما جاوب)`;
      }
      const value = Array.isArray(raw) ? raw.join(", ") : raw;
      if (q.kind === "single") {
        const label = q.choices.find((c) => c.value === value)?.label ?? value;
        return `${q.label}: ${label}`;
      }
      if (q.kind === "scale") return `${q.label}: ${value} من 5`;
      return `${q.label}: ${value}`;
    })
    .join("\n");
}

const fallback = (score: ReturnType<typeof scoreAudit>): Analysis => ({
  summary: "ما قدرنا نولّد التحليل التفصيلي هلق، بس النتيجة الرقمية مبنية على أجوبتك وهي دقيقة،",
  strongest: `أقوى محور عندك، ${categoryLabels[score.strongest]}،`,
  weakest: `أضعف محور عندك، ${categoryLabels[score.weakest]}،`,
  holdingBack: "التحليل النصي مو متوفر حالياً، جرّب ترسل التقييم مرة تانية بعد شوي،",
  opportunities: [],
  actions: [],
  contentStrategy: "",
  next30Days: "",
});

async function generateAnalysis(
  answers: Answers,
  score: ReturnType<typeof scoreAudit>,
): Promise<Analysis> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return fallback(score);

  const categoriesText = (Object.keys(score.categories) as CategoryKey[])
    .map((k) => `${categoryLabels[k]}: ${score.categories[k]}/20`)
    .join("، ");

  const system = `إنت مستشار براند شخصي عربي، بتحكي بلهجة عربية محكية سورية شامية مهنية وهادية، بدون حماس مصطنع وبدون إيموجي وبدون كلام عام.
قواعد صارمة:
- استند فقط على المعلومات اللي أعطاها الشخص، ممنوع تخترع حقائق عنه،
- إذا المعلومات ناقصة لاستنتاج معيّن، قول صراحة إنو المعلومات ناقصة،
- اذكر تفاصيل من أجوبته حرفياً حتى يحس إنك فهمت وضعه،
- ممنوع تغيّر الأرقام أو تقترح نتيجة رقمية جديدة، الأرقام محسوبة مسبقاً،
- إذا بدك تذكر رقم، لازم يكون نفس الرقم المعطى لك حرفياً، وممنوع تخترع أي رقم تاني، والأفضل ما تذكر النتيجة الكلية بالنص أبداً،
- ممنوع تستعمل النقطة "." بآخر الجمل، استعمل الفاصلة "،"،
- ممنوع الشرطة الطويلة "—"،
- الجواب لازم يكون JSON صالح فقط، بدون أي نص خارجه،`;

  const prompt = `أجوبة الشخص:
${readableAnswers(answers)}

النتيجة المحسوبة مسبقاً، لا تغيّرها:
النتيجة الكلية ${score.overall}/100
${categoriesText}
أقوى محور: ${categoryLabels[score.strongest]}
أضعف محور: ${categoryLabels[score.weakest]}

رجّع JSON بهالشكل بالضبط:
{
  "summary": "فقرة قصيرة، 3 لـ 4 أسطر، بتلخص وضعه الحالي بناء على أجوبته",
  "strongest": "سطرين عن نقطة قوته وليش هي قوة",
  "weakest": "سطرين عن أضعف نقطة وليش هي بتكسر النتيجة",
  "holdingBack": "فقرة قصيرة، شو بالضبط عم يوقف براندك الشخصي هلق",
  "opportunities": ["فرصة 1", "فرصة 2", "فرصة 3"],
  "actions": ["خطوة تنفيذية 1", "خطوة تنفيذية 2", "خطوة تنفيذية 3"],
  "contentStrategy": "فقرة قصيرة، استراتيجية محتوى مقترحة مناسبة لمجاله ووقته المتاح",
  "next30Days": "فقرة قصيرة، على شو يركّز بالضبط بأول 30 يوم"
}`;

  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) {
      console.error("AI gateway error", res.status, await res.text());
      return fallback(score);
    }
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = json.choices?.[0]?.message?.content;
    if (!content) return fallback(score);
    const parsed = JSON.parse(content) as Partial<Analysis>;
    return {
      summary: parsed.summary ?? "",
      strongest: parsed.strongest ?? "",
      weakest: parsed.weakest ?? "",
      holdingBack: parsed.holdingBack ?? "",
      opportunities: Array.isArray(parsed.opportunities) ? parsed.opportunities.slice(0, 3) : [],
      actions: Array.isArray(parsed.actions) ? parsed.actions.slice(0, 3) : [],
      contentStrategy: parsed.contentStrategy ?? "",
      next30Days: parsed.next30Days ?? "",
    };
  } catch (error) {
    console.error("AI analysis failed", error);
    return fallback(score);
  }
}

export async function runAudit(input: {
  answers: Answers;
  name: string;
  email: string;
  social?: string;
}): Promise<AuditResult> {
  const score = scoreAudit(input.answers);
  const analysis = await generateAnalysis(input.answers, score);

  let leadId: string | null = null;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("audit_leads")
      .insert({
        name: input.name,
        email: input.email,
        social_handle: input.social ?? "",
        profession: String(input.answers["profession"] ?? ""),
        industry: String(input.answers["industry"] ?? ""),
        answers: input.answers,
        overall_score: score.overall,
        category_scores: score.categories,
        analysis,
      })
      .select("id")
      .single();
    if (error) console.error("lead insert failed", error);
    else leadId = data.id;
  } catch (error) {
    console.error("lead insert threw", error);
  }

  return {
    leadId,
    overall: score.overall,
    categories: score.categories,
    strongest: score.strongest,
    weakest: score.weakest,
    band: scoreBand(score.overall),
    analysis,
  };
}

export async function recordClick(leadId: string, target: "strategy" | "work") {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("audit_leads")
      .update(target === "strategy" ? { clicked_strategy: true } : { clicked_work_with_me: true })
      .eq("id", leadId);
  } catch (error) {
    console.error("click tracking failed", error);
  }
  return { ok: true };
}
