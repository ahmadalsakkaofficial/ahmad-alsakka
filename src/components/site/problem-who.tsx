import { Section, SectionHead, Reveal } from "./primitives";

const cards = [
  {
    title: "كل فيديو بيبلّش من الصفر",
    text: "ما في أفكار مرتبة ولا قوالب، فكل مرة بتفتح الكاميرا بتسأل حالك شو بدي احكي",
  },
  {
    title: "المحتوى مربوط بمزاجك ووقتك",
    text: "أول ما تنشغل بيوقف، ولما يوقف بيختفي اسمك من بال الناس",
  },
  {
    title: "التوصيات ما بتكبر لحالها",
    text: "شغلك منيح والعملاء بيرجعوا، بس الدايرة نفسها ما عم توسع",
  },
];

export function ProblemSection() {
  return (
    <Section id="problem" labelledBy="problem-title">
      <SectionHead
        id="problem-title"
        number="02"
        label="المشكلة"
        title={
          <>
            العميل ما بيختار الأشطر
            <span className="block text-bronze">بيختار اللي بيعرفه</span>
          </>
        }
      />
      <div className="max-w-3xl space-y-2 text-lg leading-[2] text-ink/80">
        <p>قبل ما حدا يتصل بدكتور أو محامي أو مستشار بيدوّر عليه أونلاين</p>
        <p>وإذا ما لقى شي بيروح لحدا أقل خبرة منك بس أوضح منك</p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 90}>
            <article className="h-full rounded-[18px] border border-border bg-surface p-7">
              <span className="font-latin text-sm font-semibold tracking-[0.2em] text-bronze">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-bold text-navy">{c.title}</h3>
              <p className="mt-3 text-base leading-[1.95] text-subtle">{c.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-14 border-s-4 border-bronze ps-6 text-2xl leading-[1.6] font-bold text-navy sm:text-3xl">
        ما ناقصك خبرة ولا أفكار
        <span className="block text-bronze">ناقصك نظام بيطلّعهم للناس</span>
      </p>
    </Section>
  );
}

const forYou = [
  "عندك شغل قائم وخبرة حقيقية بمجالك",
  "أغلب عملائك جايين من التوصيات",
  "حاسس إنه حضورك أونلاين أضعف من مستواك",
  "بدك عملاء أحسن مش متابعين أكتر",
  "مستعد تطلع عالكاميرا بشكل منتظم",
];

const notForYou = [
  "لسا ما عندك خدمة أو خبرة واضحة",
  "بدك بس حدا يصوّرلك كم فيديو",
  "بدك آلاف المتابعين بأسرع وقت",
  "عم تدوّر على أرخص باقة",
  "بدك ضمان لعدد عملاء أو مشاهدات",
];

export function WhoSection() {
  return (
    <Section id="who" tone="surface" labelledBy="who-title">
      <SectionHead
        id="who-title"
        number="05"
        label="لمين هاد البرنامج؟"
        title="للخبير اللي بدو ينعرف بشغله مش يصير صانع محتوى"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-[18px] border border-bronze/40 bg-background p-7">
          <h3 className="text-lg font-bold text-navy">مناسب إلك إذا</h3>
          <ul className="mt-5 space-y-3">
            {forYou.map((t) => (
              <li key={t} className="flex gap-3 text-base leading-[1.9] text-ink/80">
                <span className="mt-1 text-bronze">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[18px] border border-border bg-background p-7">
          <h3 className="text-lg font-bold text-navy">مش مناسب إذا</h3>
          <ul className="mt-5 space-y-3">
            {notForYou.map((t) => (
              <li key={t} className="flex gap-3 text-base leading-[1.9] text-subtle">
                <span className="mt-1 text-subtle/70">✕</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
