import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { submitInquiry } from "@/lib/leads/inquiry.functions";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  profession: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  instagram: "",
  profession: "",
  message: "",
};

const fields = [
  { key: "name", label: "الاسم الكامل", ph: "أحمد السقا", required: true, latin: false },
  { key: "email", label: "الإيميل", ph: "name@email.com", required: true, latin: true },
  { key: "phone", label: "رقم الموبايل", ph: "+1 000 000 0000", required: true, latin: true },
  { key: "instagram", label: "حسابك على Instagram", ph: "@username", required: false, latin: true },
  { key: "profession", label: "شو شغلك؟", ph: "دكتور، محامي، مستشار،", required: false, latin: false },
] as const;

export function ApplyForm() {
  const submit = useServerFn(submitInquiry);
  const [values, setValues] = useState<Fields>(empty);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const valid =
    values.name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(values.email.trim()) &&
    values.phone.trim().length > 5;

  async function send() {
    if (!valid) return;
    setState("sending");
    try {
      await submit({ data: { ...values } });
      setState("done");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[14px] border border-bronze/40 bg-background p-8 text-start">
        <h3 className="font-display text-xl text-navy">وصلتني معلوماتك،</h3>
        <p className="mt-3 text-base leading-[2] text-subtle">
          رح أتواصل معك خلال يومين عمل على الإيميل أو الموبايل، وإذا بتحب تحكي أسرع، احجز مكالمة من
          الزر فوق،
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] border border-border bg-background p-6 text-start sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className={cn("block", f.key === "profession" && "sm:col-span-2")}>
            <span className="text-base text-subtle">
              {f.label}
              {f.required && <span className="text-bronze"> *</span>}
            </span>
            <input
              type={f.key === "email" ? "email" : f.key === "phone" ? "tel" : "text"}
              value={values[f.key]}
              placeholder={f.ph}
              maxLength={200}
              onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
              className={cn(
                "focus-ring mt-2 w-full rounded-[12px] border border-border bg-surface p-4 text-base text-ink outline-none placeholder:text-subtle/60",
                f.latin && "font-latin",
              )}
            />
          </label>
        ))}
        <label className="block sm:col-span-2">
          <span className="text-base text-subtle">شو بدك تبني بالضبط؟</span>
          <textarea
            rows={3}
            value={values.message}
            maxLength={1000}
            placeholder="احكيلي بسطرين عن شغلك ووين حاسس إنو حضورك ضعيف،"
            onChange={(e) => setValues((p) => ({ ...p, message: e.target.value }))}
            className="focus-ring mt-2 w-full resize-none rounded-[12px] border border-border bg-surface p-4 text-base leading-[1.9] text-ink outline-none placeholder:text-subtle/60"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => void send()}
        disabled={!valid || state === "sending"}
        className="focus-ring mt-6 w-full rounded-[12px] bg-bronze px-7 py-4 text-base font-bold text-cream transition-opacity hover:opacity-90 disabled:opacity-40 sm:w-auto"
      >
        {state === "sending" ? "عم نبعت،" : "ابعت معلوماتك"}
      </button>
      {state === "error" && (
        <p className="mt-4 text-base text-bronze">صار خلل بالإرسال، جرّب مرة تانية،</p>
      )}
      <p className="mt-4 text-sm leading-[1.9] text-subtle">
        معلوماتك بتضل عندي، ما بتنباع ولا بتنشارك مع حدا،
      </p>
    </div>
  );
}
