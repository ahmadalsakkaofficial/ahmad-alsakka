import { Section, SectionHead, Reveal } from "./primitives";

const phases = [
  {
    n: "01",
    title: "الاستراتيجية",
    weeks: "الأسبوع 1–2",
    items: [
      "مراجعة وضعك الحالي",
      "تحديد العميل المثالي",
      "توضيح التخصص والرسالة",
      "بناء أعمدة المحتوى",
      "تحديد أسلوبك وصوتك",
      "وضع الرسائل التي يجب أن يتذكرك الناس بها",
    ],
  },
  {
    n: "02",
    title: "النظام",
    weeks: "الأسبوع 3–4",
    items: [
      "خطة محتوى لمدة 90 يوماً",
      "مكتبة Hooks خاصة بمجالك",
      "قوالب ثابتة لكتابة الفيديوهات",
      "طريقة استخدام AI بدون فقدان صوتك",
      "نظام تصوير بسيط من الهاتف",
      "معايير واضحة للمونتاج والنشر",
    ],
  },
  {
    n: "03",
    title: "الإنتاج",
    weeks: "الأسبوع 5–7",
    items: [
      "كتابة أول مجموعة فيديوهات",
      "التحضير ليوم التصوير",
      "تصوير 8–12 قطعة محتوى",
      "تجهيز أول دفعة للنشر",
      "مراجعة أدائك أمام الكاميرا",
      "تحسين النصوص حسب أسلوبك الحقيقي",
    ],
  },
  {
    n: "04",
    title: "التسليم",
    weeks: "الأسبوع 8",
    items: [
      "تسليم خطوات العمل الموثقة",
      "قوالب تستطيع إعادة استخدامها",
      "خطة الثلاثين يوماً التالية",
      "مراجعة النتائج الأولية",
      "تحديد ما يجب أن يستمر وما يجب أن يتغير",
      "تسليم النظام لك لتشغيله بدون اعتماد دائم عليّ",
    ],
  },
];

const results = [
  "تموضع واضح يمكن للناس فهمه وتذكره",
  "أعمدة محتوى مرتبطة بعملك وعملائك",
  "نظام ثابت للأفكار والكتابة والتصوير",
  "أول 8–12 قطعة محتوى جاهزة للانطلاق",
  "معايير واضحة للمونتاج والنشر",
  "طريقة شهرية تستطيع تكرارها",
  "حضور مهني مبني على الثقة، وليس على الأداء والاستعراض",
];

export function EngineSection() {
  return (
    <Section id="system" tone="navy" labelledBy="system-title">
      <SectionHead
        id="system-title"
        number="03"
        label="النظام"
        invert
        title={
          <span className="font-latin block text-3xl tracking-tight sm:text-5xl">
            The Authority Engine
          </span>
        }
      />
      <p className="-mt-6 text-lg text-cream/90">نظام بناء البراند الشخصي والمحتوى خلال 60 يوماً</p>
      <p className="mt-6 max-w-3xl text-base leading-[2] text-cream/70">
        هذه ليست دورة تدريبية، وليست إدارة شهرية لحسابك، هي عملية تركيب كاملة تنقلك من خبرة غير واضحة
        أونلاين إلى نظام محتوى تستطيع تشغيله كل شهر،
      </p>

      <ol className="mt-14 space-y-px overflow-hidden rounded-[14px] bg-cream/15">
        {phases.map((p, i) => (
          <Reveal key={p.n} delay={i * 80}>
            <li className="grid gap-5 bg-navy p-7 sm:grid-cols-[200px_1fr]">
              <div>
                <span className="font-latin text-xs tracking-[0.22em] text-bronze">{p.n}</span>
                <h3 className="mt-2 font-display text-xl text-cream">{p.title}</h3>
                <span className="mt-1 block text-xs text-cream/60">{p.weeks}</span>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3 text-sm leading-[1.9] text-cream/75">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-bronze" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>

      <div className="mt-10 rounded-[14px] border border-cream/20 p-7">
        <h3 className="font-display text-xl text-cream">ماذا سيكون لديك بعد 60 يوماً؟</h3>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {results.map((r) => (
            <li key={r} className="flex gap-3 text-sm leading-[1.9] text-cream/75">
              <span className="mt-2.5 size-1 shrink-0 rounded-full bg-bronze" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 border-e-2 border-bronze pe-5 font-display text-xl leading-[1.7] text-cream sm:text-2xl">
        أنا لا أقدّم لك محتوى لشهر واحد،
        <br />
        أبني لك طريقة تستطيع استخدامها طوال السنة،
      </p>
    </Section>
  );
}

const stages = [
  {
    title: "التعرّف",
    text: "يشاهدك أكثر من مرة، يفهم رسالتك، ويتذكر اسمك وطريقة تفكيرك،",
  },
  {
    title: "الثقة",
    text: "يحفظ محتواك، يرسله لشخص آخر، ويبدأ باعتبارك مرجعاً في مجالك،",
  },
  {
    title: "الاستفسار",
    text: "يراسلك، يسألك عن وضعه، ثم ينتقل إلى محادثة حقيقية حول خدمتك،",
  },
];

export function TrustSection() {
  return (
    <Section id="trust" labelledBy="trust-title">
      <SectionHead
        id="trust-title"
        number="04"
        label="كيف يعمل المحتوى؟"
        title="المحتوى لا يبيع من أول مشاهدة،"
      />
      <p className="max-w-3xl text-base leading-[2] text-subtle">
        خدمات الأطباء، المحامين، المستشارين وأصحاب المهن لا تُشترى بقرار سريع، العميل يحتاج أن يعرفك،
        ثم يثق بك، ثم يشعر أن الوقت مناسب ليتواصل معك
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {stages.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <article className="relative h-full rounded-[12px] border border-border bg-surface p-6">
              <span className="font-latin text-xs tracking-[0.2em] text-bronze">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg text-navy">{s.title}</h3>
              <p className="mt-3 text-sm leading-[1.95] text-subtle">{s.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 font-display text-xl leading-[1.7] text-navy sm:text-2xl">
        لهذا لا نصمم الفيديو فقط ليحصل على مشاهدة،
        <br />
        <span className="text-bronze">نصممه ليكون جزءاً من مسار يبني الثقة،</span>
      </p>
    </Section>
  );
}

const blocks = [
  {
    title: "ليس Coaching",
    text: "لن أجلس معك كل أسبوع لأعطيك نصائح عامة، سنبني أصولاً وقوالب وخطوات حقيقية تستطيع استخدامها،",
  },
  {
    title: "ليس Content Factory",
    text: "المحتوى لن يبدو كأنه مكتوب لشخص آخر، النظام يُبنى حول خبرتك، لغتك، شخصيتك وطريقتك في الشرح،",
  },
  {
    title: "ليس عقد إدارة بلا نهاية",
    text: "الهدف ليس أن تعتمد عليّ للأبد، الهدف أن يصبح عندك نظام واضح، ثم أخرج عندما يصبح قادراً على العمل بدون وجودي اليومي،",
  },
];

export function DifferenceSection() {
  return (
    <Section id="difference" tone="surface" labelledBy="difference-title">
      <SectionHead
        id="difference-title"
        number="05"
        label="الفرق"
        title="لا تحتاج شخصاً آخر يصبح عنق الزجاجة في عملك"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {blocks.map((b, i) => (
          <Reveal key={b.title} delay={i * 90}>
            <article className="h-full rounded-[12px] border border-border bg-background p-6">
              <h3 className="font-display text-lg text-navy">{b.title}</h3>
              <p className="mt-3 text-sm leading-[1.95] text-subtle">{b.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 rounded-[12px] border border-bronze/40 bg-background p-7 text-center">
        <p className="font-latin text-sm tracking-[0.18em] text-bronze uppercase sm:text-base">
          Strategy → System → Production → Handoff
        </p>
        <p className="mt-5 font-display text-xl leading-[1.8] text-navy sm:text-2xl">
          أبني النظام، أثبته، وأسلّمه،
        </p>
      </div>
    </Section>
  );
}

const principles = [
  {
    title: "التنفيذ يتغلب على الأفكار",
    text: "الإنترنت مليء بالأفكار، القيمة تأتي من بناء شيء يمكن تشغيله وإنهائه وتكراره،",
  },
  {
    title: "الثقة تُبنى بالدليل، لا بالصوت العالي",
    text: "الثقة أمام الكاميرا مفيدة، لكنها لا تعوّض الخبرة أو النتائج أو الوضوح،",
  },
  {
    title: "AI يسرّع الخبرة ولا يصنعها",
    text: "نستخدم الذكاء الاصطناعي لتسريع البحث والكتابة والتنظيم، لا لتزييف صوتك أو خبرتك،",
  },
  {
    title: "الحرية تأتي بعد النظام",
    text: "عندما ترفض النظام لأنك تخاف أن يقيّدك، غالباً تنتهي داخل فوضى تستهلك وقتك أكثر،",
  },
];

export function PrinciplesSection() {
  return (
    <Section id="principles" labelledBy="principles-title">
      <SectionHead
        id="principles-title"
        number="07"
        label="المبادئ"
        title="الأفكار التي لا تتغير مع الخوارزمية"
      />
      <div className="grid gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-2">
        {principles.map((p, i) => (
          <article key={p.title} className="bg-surface p-7">
            <span className="font-latin text-xs tracking-[0.2em] text-bronze">0{i + 1}</span>
            <h3 className="mt-3 font-display text-lg text-navy">{p.title}</h3>
            <p className="mt-3 text-sm leading-[1.95] text-subtle">{p.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
