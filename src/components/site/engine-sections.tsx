import { Section, SectionHead, Reveal } from "./primitives";

const phases = [
  {
    n: "01",
    title: "الاستراتيجية",
    weeks: "الأسبوع 1–2",
    items: [
      "منراجع وضعك وحسابك الحالي",
      "منحدد مين العميل اللي بدك ياه",
      "شو بدك تنعرف فيه: التموضع والرسالة",
      "أعمدة المحتوى المربوطة بشغلك",
      "صوتك وأسلوبك قدام الكاميرا",
      "الجمل اللي بدنا الناس تتذكرك فيها",
    ],
  },
  {
    n: "02",
    title: "النظام",
    weeks: "الأسبوع 3–4",
    items: [
      "خطة محتوى لـ90 يوم",
      "مكتبة Hooks خاصة بمجالك",
      "قوالب ثابتة لكتابة الفيديوهات",
      "طريقة تصوير بسيطة، حتى من الموبايل",
      "معايير واضحة للمونتاج والنشر",
      "طريقة لاستقبال الرسائل والاستفسارات",
    ],
  },
  {
    n: "03",
    title: "الإنتاج والنشر",
    weeks: "الشهر 2",
    items: [
      "سكربتات مكتوبة بصوتك إنت",
      "يوم تصوير: 8–12 قطعة محتوى",
      "مونتاج ونشر أول دفعة",
      "كاروسيلات وبوستات لينكدإن من نفس الأفكار",
      "ملاحظات على أداءك قدام الكاميرا",
    ],
  },
  {
    n: "04",
    title: "التحسين والتسليم",
    weeks: "الشهر 3",
    items: [
      "منقرا الأرقام: مين شاف، مين تابع، مين راسلك",
      "منكبّر الأفكار والهوكات اللي اشتغلت",
      "يوم تصوير تاني على أساس الأرقام",
      "منوثّق النظام كامل ومنسلّمك ياه",
      "خطة الـ90 يوم الجاية",
    ],
  },
];

const results = [
  "تموضع واضح الناس بتفهمه وبتتذكره",
  "أعمدة محتوى مربوطة بشغلك وعملائك",
  "نظام ثابت للأفكار والكتابة والتصوير",
  "محتوى منشور وأرقام حقيقية من جمهورك",
  "بتعرف شو عم يشتغل، وشو لازم يتغيّر",
  "طريقة شهرية بتقدر تكرّرها مع فريقك أو معنا",
  "حضور مبني على الثقة، مش على الاستعراض",
];

export function EngineSection() {
  return (
    <Section id="system" tone="navy" labelledBy="system-title">
      <SectionHead
        id="system-title"
        number="04"
        label="النظام"
        invert
        title={
          <span className="font-latin block text-3xl tracking-tight sm:text-5xl">
            The Authority Engine
          </span>
        }
      />
      <p className="-mt-6 text-lg text-cream/90">برنامج 3 شهور: شهر منبني فيه، وشهرين منشغّل فيهن ومنحسّن</p>
      <p className="mt-6 max-w-3xl text-base leading-[2] text-cream/70">
        مش كورس، ومش إدارة حساب شهرية، هو تركيب كامل: من خبرة ما بتبيّن أونلاين، لنظام محتوى شغّال،
        وأرقام بتقلك شو اللي عم يجيب الناس الصح
      </p>

      <ol className="mt-14 space-y-px overflow-hidden rounded-[14px] bg-cream/15">
        {phases.map((p, i) => (
          <Reveal key={p.n} delay={i * 80}>
            <li className="grid gap-5 bg-navy p-7 sm:grid-cols-[200px_1fr]">
              <div>
                <span className="font-latin text-sm tracking-[0.22em] text-bronze">{p.n}</span>
                <h3 className="mt-2 font-display text-xl text-cream">{p.title}</h3>
                <span className="mt-1 block text-sm text-cream/60">{p.weeks}</span>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3 text-base leading-[1.9] text-cream/75">
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
        <h3 className="font-display text-xl text-cream">شو بيكون عندك بعد 3 شهور؟</h3>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {results.map((r) => (
            <li key={r} className="flex gap-3 text-base leading-[1.9] text-cream/75">
              <span className="mt-2.5 size-1 shrink-0 rounded-full bg-bronze" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 border-e-2 border-bronze pe-5 font-display text-xl leading-[1.7] text-cream sm:text-2xl">
        مش محتوى لشهر وبس…
        <br />
        طريقة بتشتغل فيها طول السنة
      </p>
    </Section>
  );
}

const stages = [
  {
    title: "بيتعرّف عليك",
    text: "بيشوفك أكتر من مرة، بيفهم شو بتحكي، وبيتذكر اسمك وطريقة تفكيرك",
  },
  {
    title: "بيثق فيك",
    text: "بيحفظ الفيديو، بيبعته لحدا، وبيبلّش يشوفك مرجع بمجالك",
  },
  {
    title: "بيراسلك",
    text: "بيسألك عن وضعه، ومن هون بتبلّش محادثة حقيقية عن شغلك",
  },
];

export function TrustSection() {
  return (
    <Section id="trust" labelledBy="trust-title">
      <SectionHead
        id="trust-title"
        number="05"
        label="كيف بيشتغل المحتوى؟"
        title="المحتوى ما بيبيع من أول مشاهدة"
      />
      <p className="max-w-3xl text-base leading-[2] text-subtle">
        حدا ما بيختار دكتور أو محامي أو مستشار بقرار سريع، لازم يعرفك أول، بعدين يثق فيك، وبعدين
        يحس إنه الوقت مناسب ليحكي معك
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {stages.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <article className="relative h-full rounded-[12px] border border-border bg-surface p-6">
              <span className="font-latin text-sm tracking-[0.2em] text-bronze">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg text-navy">{s.title}</h3>
              <p className="mt-3 text-base leading-[1.95] text-subtle">{s.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 font-display text-xl leading-[1.7] text-navy sm:text-2xl">
        لهيك ما منعمل الفيديو كرمال المشاهدات بس…
        <br />
        <span className="text-bronze">منعمله ليكون خطوة بطريق الثقة</span>
      </p>
    </Section>
  );
}

const blocks = [
  {
    title: "مش Coaching",
    text: "ما رح نقعد كل أسبوع نحكي نصايح عامة، منبني قوالب وخطوات ومحتوى حقيقي بتستعمله",
  },
  {
    title: "مش مصنع محتوى",
    text: "المحتوى ما رح يبيّن مكتوب لحدا تاني، كله مبني على خبرتك ولغتك وطريقتك بالشرح",
  },
  {
    title: "مش عقد للأبد",
    text: "الهدف مو إنك تضل معتمد عليّ، الهدف يصير عندك نظام واضح بيشتغل، وبعدها إنت بتقرر إذا بدك نكمّل",
  },
];

export function DifferenceSection() {
  return (
    <Section id="difference" tone="surface" labelledBy="difference-title">
      <SectionHead
        id="difference-title"
        number="06"
        label="الفرق"
        title="ما بدك حدا تاني يصير عنق الزجاجة بشغلك"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {blocks.map((b, i) => (
          <Reveal key={b.title} delay={i * 90}>
            <article className="h-full rounded-[12px] border border-border bg-background p-6">
              <h3 className="font-display text-lg text-navy">{b.title}</h3>
              <p className="mt-3 text-base leading-[1.95] text-subtle">{b.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 rounded-[12px] border border-bronze/40 bg-background p-7 text-center">
        <p className="font-latin text-base tracking-[0.18em] text-bronze uppercase sm:text-base">
          Strategy → System → Production → Optimize
        </p>
        <p className="mt-5 font-display text-xl leading-[1.8] text-navy sm:text-2xl">
          منبني النظام، منشغّله، ومنسلّمك ياه
        </p>
      </div>
    </Section>
  );
}

const principles = [
  {
    title: "التنفيذ أهم من الأفكار",
    text: "الأفكار مليانة عالإنترنت، القيمة بشي بينبنى وبيشتغل وبيتكرر",
  },
  {
    title: "الثقة بالدليل، مش بالصوت العالي",
    text: "الثقة قدام الكاميرا منيحة، بس ما بتعوّض الخبرة ولا النتايج ولا الوضوح",
  },
  {
    title: "AI بيسرّع الخبرة، ما بيصنعها",
    text: "منستعمل الذكاء الاصطناعي بالبحث والكتابة والتنظيم، مش لنزوّر صوتك أو خبرتك",
  },
  {
    title: "الحرية بتجي بعد النظام",
    text: "اللي بيرفض النظام خوفاً من إنه يقيّده، غالباً بيعلق بفوضى بتاكل وقته أكتر",
  },
];

export function PrinciplesSection() {
  return (
    <Section id="principles" labelledBy="principles-title">
      <SectionHead
        id="principles-title"
        number="08"
        label="المبادئ"
        title="شغلات ما بتتغير مع الخوارزمية"
      />
      <div className="grid gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-2">
        {principles.map((p, i) => (
          <article key={p.title} className="bg-surface p-7">
            <span className="font-latin text-sm tracking-[0.2em] text-bronze">0{i + 1}</span>
            <h3 className="mt-3 font-display text-lg text-navy">{p.title}</h3>
            <p className="mt-3 text-base leading-[1.95] text-subtle">{p.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
