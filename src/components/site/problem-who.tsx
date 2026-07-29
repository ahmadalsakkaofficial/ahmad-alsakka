import { Section, SectionHead, Reveal } from "./primitives";

const cards = [
  {
    title: "كل فيديو يبدأ من الصفر",
    text: "لا توجد أفكار مرتبة، ولا قوالب ثابتة، ولا طريقة واضحة لتحويل خبرتك إلى محتوى،",
  },
  {
    title: "وجودك مربوط بوقتك ومزاجك",
    text: "عندما تنشغل يتوقف المحتوى، وعندما يتوقف المحتوى، يختفي حضورك مع الوقت،",
  },
  {
    title: "أشخاص أقل خبرة يبدون أوضح منك",
    text: "ليس لأنهم أفضل في عملهم، بل لأن السوق يستطيع أن يفهمهم ويتذكرهم أسرع،",
  },
];

export function ProblemSection() {
  return (
    <Section id="problem" tone="surface" labelledBy="problem-title">
      <SectionHead
        id="problem-title"
        number="01"
        label="المشكلة"
        title="المشكلة ليست أنك لا تعرف ماذا تقول"
      />
      <p className="max-w-3xl text-base leading-[2] text-subtle">
        أنت تعرف مجالك، عندك خبرة، قصص، آراء ونتائج حقيقية، لكن عندما تفتح الكاميرا، كل فيديو يتحول
        إلى قرار جديد: ماذا أقول؟ كيف أبدأ؟ أين أصوّر؟ ومتى أنشر؟
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 90}>
            <article className="h-full rounded-[12px] border border-border bg-background p-6">
              <span className="font-latin text-xs tracking-[0.2em] text-bronze">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg text-navy">{c.title}</h3>
              <p className="mt-3 text-sm leading-[1.95] text-subtle">{c.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 border-t border-bronze/30 pt-10">
        <p className="font-display text-2xl leading-[1.6] text-navy sm:text-3xl">
          أنت لا تحتاج المزيد من الأفكار،
          <br />
          <span className="text-bronze">تحتاج نظاماً</span>
        </p>
      </div>
    </Section>
  );
}

const forYou = [
  "لديك عمل قائم وخبرة حقيقية في مجالك",
  "تعتمد بشكل كبير على التوصيات والعلاقات",
  "تعرف أن حضورك أونلاين أضعف من مستوى خبرتك",
  "تريد جذب عملاء أفضل، لا مجرد جمع متابعين",
  "مستعد للظهور أمام الكاميرا بشكل منتظم ومعقول",
  "تريد نظاماً تستطيع الاستمرار عليه بعد انتهاء العمل معي",
  "تفضل بناء الثقة على ملاحقة الترندات",
];

const notForYou = [
  "لا تملك عملاً أو خبرة واضحة حتى الآن",
  "تبحث فقط عن شخص يصوّر ويمنتج لك بعض الفيديوهات",
  "تريد آلاف المتابعين بأسرع وقت",
  "تبحث عن أرخص باقة ممكنة",
  "تريد نتيجة بدون المشاركة في التنفيذ",
  "تريد أن يدير شخص آخر حسابك بالكامل إلى الأبد",
  "تبحث عن وصفة سحرية أو ضمان لعدد محدد من العملاء",
];

export function WhoSection() {
  return (
    <Section id="who" labelledBy="who-title">
      <SectionHead
        id="who-title"
        number="02"
        label="لمن هذا؟"
        title="مصمم للخبير الذي لا يريد أن يصبح صانع محتوى"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[12px] border border-border bg-surface p-7">
          <h3 className="font-display text-lg text-navy">هذا مناسب لك إذا:</h3>
          <ul className="mt-5 space-y-3">
            {forYou.map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-[1.95] text-subtle">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-bronze" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[12px] border border-border bg-surface p-7">
          <h3 className="font-display text-lg text-navy">هذا ليس مناسباً لك إذا:</h3>
          <ul className="mt-5 space-y-3">
            {notForYou.map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-[1.95] text-subtle">
                <span className="mt-3 h-px w-3 shrink-0 bg-subtle/60" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-12 font-display text-2xl leading-[1.6] text-navy sm:text-3xl">
        أنا لا أبني مؤثراً،
        <br />
        <span className="text-bronze">أبني خبيراً معروفاً</span>
      </p>
    </Section>
  );
}
