import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { questions, type Answers } from "@/lib/audit/questions";
import { submitAudit } from "@/lib/audit/audit.functions";
import type { AuditResult } from "@/lib/audit/audit.server";
import { AuditIntro } from "./audit-intro";
import { AuditResults } from "./audit-results";
import { cn } from "@/lib/utils";

type Phase = "intro" | "questions" | "contact" | "loading" | "results" | "error";

const totalSteps = questions.length + 1;

export function AuditExperience() {
  const submit = useServerFn(submitAudit);
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ camera: "3" });
  const [contact, setContact] = useState({ name: "", email: "", social: "" });
  const [result, setResult] = useState<AuditResult | null>(null);

  const q = questions[step];

  function setAnswer(id: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function answered(): boolean {
    if (!q) return false;
    if (q.required === false) return true;
    const v = answers[q.id];
    if (Array.isArray(v)) return v.length > 0;
    return typeof v === "string" && v.trim().length > 0;
  }

  function next() {
    if (step + 1 < questions.length) setStep(step + 1);
    else setPhase("contact");
  }

  function back() {
    if (phase === "contact") {
      setPhase("questions");
      setStep(questions.length - 1);
      return;
    }
    if (step === 0) setPhase("intro");
    else setStep(step - 1);
  }

  async function finish() {
    setPhase("loading");
    try {
      const data = await submit({
        data: { answers, name: contact.name, email: contact.email, social: contact.social },
      });
      setResult(data);
      setPhase("results");
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error(error);
      setPhase("error");
    }
  }

  if (phase === "intro") return <AuditIntro onStart={() => setPhase("questions")} />;

  if (phase === "loading")
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col items-center justify-center px-5 text-center">
        <div className="size-10 animate-spin rounded-full border-2 border-bronze/30 border-t-bronze" />
        <h2 className="mt-8 font-display text-2xl text-navy">عم نقرأ أجوبتك،</h2>
        <p className="mt-3 text-sm leading-[2] text-subtle">
          عم نحسب النتيجة ونجهّز التحليل الشخصي، خود بالك، هالشي بياخد كم ثانية،
        </p>
      </div>
    );

  if (phase === "error")
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col items-center justify-center px-5 text-center">
        <h2 className="font-display text-2xl text-navy">صار خلل بالإرسال،</h2>
        <p className="mt-3 text-sm leading-[2] text-subtle">جرّب مرة تانية، أجوبتك لسا محفوظة،</p>
        <button
          type="button"
          onClick={() => void finish()}
          className="focus-ring mt-8 rounded-[12px] bg-navy px-7 py-4 text-sm font-bold text-cream"
        >
          جرّب مرة تانية
        </button>
      </div>
    );

  if (phase === "results" && result) return <AuditResults result={result} contact={contact} />;

  const current = phase === "contact" ? questions.length : step;
  const progress = Math.round(((current + 1) / totalSteps) * 100);

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8 sm:py-16">
      <div className="flex items-center justify-between text-xs text-subtle">
        <span>
          خطوة <span className="font-latin">{current + 1}</span> من{" "}
          <span className="font-latin">{totalSteps}</span>
        </span>
        <span className="font-latin text-bronze">{progress}%</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-bronze transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {phase === "questions" && q && (
        <div key={q.id} className="reveal mt-10">
          <p className="text-xs tracking-wide text-bronze">{q.category}</p>
          <h1 className="mt-3 font-display text-[1.6rem] leading-[1.45] text-navy sm:text-3xl">
            {q.label}
          </h1>
          {q.help && <p className="mt-3 text-sm leading-[1.95] text-subtle">{q.help}</p>}

          <div className="mt-7 space-y-3">
            {q.kind === "text" && (
              <textarea
                value={(answers[q.id] as string) ?? ""}
                onChange={(e) => setAnswer(q.id, e.target.value)}
                rows={3}
                placeholder={q.placeholder}
                className="focus-ring w-full resize-none rounded-[12px] border border-border bg-surface p-4 text-base leading-[1.9] text-ink outline-none placeholder:text-subtle/60"
              />
            )}

            {q.kind === "single" &&
              q.choices.map((c) => {
                const selected = answers[q.id] === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => {
                      setAnswer(q.id, c.value);
                      window.setTimeout(next, 160);
                    }}
                    className={cn(
                      "focus-ring block w-full rounded-[12px] border p-4 text-start text-sm transition-colors sm:text-base",
                      selected
                        ? "border-bronze bg-bronze/10 text-navy"
                        : "border-border bg-surface text-ink hover:border-bronze/60",
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}

            {q.kind === "multi" &&
              q.choices.map((c) => {
                const values = (answers[q.id] as string[]) ?? [];
                const selected = values.includes(c.value);
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() =>
                      setAnswer(
                        q.id,
                        selected ? values.filter((v) => v !== c.value) : [...values, c.value],
                      )
                    }
                    className={cn(
                      "focus-ring flex w-full items-center justify-between rounded-[12px] border p-4 text-start text-sm transition-colors sm:text-base",
                      selected
                        ? "border-bronze bg-bronze/10 text-navy"
                        : "border-border bg-surface text-ink hover:border-bronze/60",
                    )}
                  >
                    <span className={c.value === "none" ? "" : "font-latin"}>{c.label}</span>
                    <span
                      className={cn(
                        "size-4 rounded-[4px] border",
                        selected ? "border-bronze bg-bronze" : "border-input",
                      )}
                    />
                  </button>
                );
              })}

            {q.kind === "scale" && (
              <div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const selected = answers[q.id] === String(n);
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setAnswer(q.id, String(n))}
                        className={cn(
                          "focus-ring font-latin flex-1 rounded-[12px] border py-5 text-lg transition-colors",
                          selected
                            ? "border-bronze bg-bronze/10 text-navy"
                            : "border-border bg-surface text-subtle hover:border-bronze/60",
                        )}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-between text-xs text-subtle">
                  <span>{q.minLabel}</span>
                  <span>{q.maxLabel}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-9 flex items-center gap-3">
            <button
              type="button"
              onClick={next}
              disabled={!answered()}
              className="focus-ring rounded-[12px] bg-navy px-7 py-4 text-sm font-bold text-cream transition-opacity hover:opacity-90 disabled:opacity-35"
            >
              كمّل
            </button>
            <button
              type="button"
              onClick={back}
              className="focus-ring rounded-[12px] px-4 py-4 text-sm text-subtle hover:text-navy"
            >
              رجوع
            </button>
          </div>
        </div>
      )}

      {phase === "contact" && (
        <div className="reveal mt-10">
          <p className="text-xs tracking-wide text-bronze">آخر خطوة</p>
          <h1 className="mt-3 font-display text-[1.6rem] leading-[1.45] text-navy sm:text-3xl">
            لوين نبعتلك التقرير؟
          </h1>
          <p className="mt-3 text-sm leading-[1.95] text-subtle">
            النتيجة رح تطلعلك مباشرة على الشاشة، بس منحتاج نعرف مين إنت،
          </p>

          <div className="mt-7 space-y-4">
            {(
              [
                { key: "name", label: "الاسم", type: "text", ph: "أحمد" },
                { key: "email", label: "الإيميل", type: "email", ph: "name@email.com" },
                { key: "social", label: "حسابك على Instagram أو غيره", type: "text", ph: "@username" },
              ] as const
            ).map((f) => (
              <label key={f.key} className="block">
                <span className="text-sm text-subtle">{f.label}</span>
                <input
                  type={f.type}
                  value={contact[f.key]}
                  placeholder={f.ph}
                  onChange={(e) => setContact((p) => ({ ...p, [f.key]: e.target.value }))}
                  className={cn(
                    "focus-ring mt-2 w-full rounded-[12px] border border-border bg-surface p-4 text-base text-ink outline-none placeholder:text-subtle/60",
                    f.key !== "name" && "font-latin",
                  )}
                />
              </label>
            ))}
          </div>

          <div className="mt-9 flex items-center gap-3">
            <button
              type="button"
              onClick={() => void finish()}
              disabled={!contact.name.trim() || !/^\S+@\S+\.\S+$/.test(contact.email)}
              className="focus-ring rounded-[12px] bg-navy px-7 py-4 text-sm font-bold text-cream transition-opacity hover:opacity-90 disabled:opacity-35"
            >
              شوف نتيجتك
            </button>
            <button
              type="button"
              onClick={back}
              className="focus-ring rounded-[12px] px-4 py-4 text-sm text-subtle hover:text-navy"
            >
              رجوع
            </button>
          </div>
          <p className="mt-5 text-xs leading-[1.9] text-subtle">
            معلوماتك بتضل عندي، ما بتنباع ولا بتنشارك مع حدا،
          </p>
        </div>
      )}
    </div>
  );
}
