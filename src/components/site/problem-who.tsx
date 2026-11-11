import { Section, SectionHead, Reveal } from "./primitives";

const cards = [
  {
    title: "كل فيديو بيبلّش من الصفر",
    text: "ما في أفكار مرتبة، ولا قوالب، ولا طريقة واضحة تحوّل فيها خبرتك لمحتوى",
  },
  {
    title: "المحتوى مربوط بوقتك ومزاجك",
    text: "أول ما تنشغل بيوقف المحتوى، ولما يوقف، بيختفي اسمك مع الوقت",
  },
  {
    title: "ناس أقل خبرة منك… أوضح منك",
    text: "مش لأنهم أشطر، بس لأنه السوق بيفهمهم وبيتذكرهم أسرع",
  },
];

export function ProblemSection() {
  return (
    <Section id="problem" tone="surface" labelledBy="problem-title">
      <SectionHead
        id="problem-title"
        number="02"
        label="المشكلة"
        title="المشكلة مو إنك ما بتعرف شو تحكي"
      />
      <p className="max-w-3xl text-base leading-[2] text-subtle">
        إنت بتعرف مجالك، وعندك قصص وآراء ونتائج حقيقية، بس أول ما تفتح الكاميرا، كل فيديو بيصير
        قرار جديد: شو بحكي؟ كيف ببلّش؟ وين بصوّر؟ ومتى بنشر؟
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 90}>
            <article className="h-full rounded-[12px] border border-border bg-background p-6">
              <span className="font-latin text-sm tracking-[0.2em] text-bronze">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg text-navy">{c.title}</h3>
              <p className="mt-3 text-base leading-[1.95] text-subtle">{c.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 border-t border-bronze/30 pt-10">
        <p className="font-display text-2xl leading-[1.6] text-navy sm:text-3xl">
          ما ناقصك أفكار…
          <br />
          <span className="text-bronze">ناقصك نظام</span>
        </p>
      </div>
    </Section>
  );
}

const forYou = [
  "عندك شغل قائم وخبرة حقيقية بمجالك",
  "أغلب عملائك جايين من التوصيات والعلاقات",
  "حاسس إنه حضورك أونلاين أضعف من مستوى خبرتك",
  "بدك عملاء أحسن، مش بس متابعين",
  "مستعد تطلع عالكاميرا بشكل منتظم ومعقول",
  "بدك نظام تكمّل عليه حتى بعد ما نخلّص",
  "بتفضّل الثقة على ملاحقة الترندات",
];

const notForYou = [
  "لسا ما عندك شغل أو خبرة واضحة",
  "بدك بس حدا يصوّرلك ويمنتجلك كم فيديو",
  "بدك آلاف المتابعين بأسرع وقت",
  "عم تدوّر على أرخص باقة",
  "بدك نتيجة بدون ما تشارك بالتنفيذ",
  "بدك حدا يدير حسابك عنك للأبد",
  "بدك ضمان لعدد عملاء أو مشاهدات",
];

export function WhoSection() {
  return (
    <Section id="who" labelledBy="who-title">
      <SectionHead
        id="who-title"
        number="03"
        label="لمين هاد؟"
        title="للخبير اللي ما بدو يصير صانع محتوى"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[12px] border border-border bg-surface p-7">
          <h3 className="font-display text-lg text-navy">مناسب إلك إذا:</h3>
          <ul className="mt-5 space-y-3">
            {forYou.map((t) => (
              <li key={t} className="flex gap-3 text-base leading-[1.95] text-subtle">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-bronze" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[12px] border border-border bg-surface p-7">
          <h3 className="font-display text-lg text-navy">مو مناسب إلك إذا:</h3>
          <ul className="mt-5 space-y-3">
            {notForYou.map((t) => (
              <li key={t} className="flex gap-3 text-base leading-[1.95] text-subtle">
                <span className="mt-3 h-px w-3 shrink-0 bg-subtle/60" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-12 font-display text-2xl leading-[1.6] text-navy sm:text-3xl">
        أنا ما ببني مؤثرين…
        <br />
        <span className="text-bronze">ببني خبراء الناس بتعرفهم</span>
      </p>
    </Section>
  );
}
