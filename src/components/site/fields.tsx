import { Section, SectionHead, Reveal } from "./primitives";

const fields = [
  {
    who: "دكتور أو عيادة",
    ideas: ["أكتر سؤال بيسألوني ياه المرضى وجوابه بدقيقة", "غلطة شائعة بتكلّف المريض أكتر", "شو بيصير جوّا العيادة قبل ما تفوت"],
  },
  {
    who: "محامي أو مستشار قانوني",
    ideas: ["حالة حقيقية بدون أسماء وشو تعلّمنا منها", "ورقة وحدة لازم تكون معك قبل ما توقّع", "حق عندك وما بتعرفه"],
  },
  {
    who: "محاسب أو مستشار مالي",
    ideas: ["مصروف صغير عم ياكل ربحك كل شهر", "شو بشوف أول ما يفتحلي عميل حساباته", "قرار مالي بيفرق كتير بآخر السنة"],
  },
  {
    who: "عقارات واستثمار",
    ideas: ["كيف بقرا الصفقة قبل ما أنصح فيها", "منطقة الكل بيحكي عنها وشو الحقيقة", "سؤال لازم تسأله قبل أي شرا"],
  },
];

export function FieldsSection() {
  return (
    <Section id="fields" labelledBy="fields-title">
      <SectionHead
        id="fields-title"
        number="03"
        label="لمجالك"
        title={
          <>
            نفس النظام
            <span className="block text-bronze">بس بلغة مجالك إنت</span>
          </>
        }
      />
      <p className="-mt-6 mb-10 max-w-2xl text-base leading-[1.95] text-subtle">
        أمثلة على أفكار منطلع فيها من خبرتك، كل فكرة بتصير ريل وكاروسيل وبوست لينكدإن
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fields.map((f, i) => (
          <Reveal key={f.who} delay={i * 70}>
            <article className="h-full rounded-[18px] border border-border bg-surface p-6">
              <h3 className="text-lg font-bold text-navy">{f.who}</h3>
              <ul className="mt-4 space-y-3">
                {f.ideas.map((idea) => (
                  <li key={idea} className="flex gap-2 text-base leading-[1.8] text-ink/75">
                    <span className="text-bronze">«</span>
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
