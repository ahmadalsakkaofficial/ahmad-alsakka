import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHead } from "./primitives";

export const faqs = [
  {
    q: "هل أحتاج كاميرا ومعدات احترافية؟",
    a: "لا. في معظم الحالات، هاتف جيد، صوت واضح، إضاءة بسيطة ومكان مرتب كافية. الهدف ليس تحويل مكتبك إلى استوديو. الهدف أن نبني إعداداً تستطيع استخدامه باستمرار.",
  },
  {
    q: "هل تكتب لي نصوص الفيديوهات؟",
    a: "نعم. نكتب ونجهز أول مجموعة من النصوص معاً، لكن النص النهائي يجب أن يبدو كأنك أنت من قاله. لا أريدك أن تحفظ كلاماً غريباً عن شخصيتك أو تنشر نصاً واضحاً أنه مكتوب بالذكاء الاصطناعي.",
  },
  {
    q: "هل ستدير حسابي بعد انتهاء الستين يوماً؟",
    a: "لا. الهدف الأساسي هو ألا تحتاج إلى إدارة دائمة. خلال المشروع نبني النظام، نختبره، نوثق خطواته، ثم نسلّمه لك. يمكن مناقشة دعم إضافي لاحقاً عند الحاجة، لكنه ليس أساس الخدمة.",
  },
  {
    q: "هل تضمن لي عدداً محدداً من العملاء؟",
    a: "لا أعد بعدد محدد من العملاء، وأي شخص يعطيك هذا الضمان قبل فهم عملك وسوقك لا يقول الحقيقة. النتيجة الأساسية للمشروع هي بناء النظام، تجهيز المحتوى الأول، ونشر حضور أوضح ومصمم لزيادة الثقة والاستفسارات.",
  },
  {
    q: "هل الخدمة مناسبة لشخص يبدأ من الصفر؟",
    a: "هي مناسبة إذا كنت تبدأ حضورك أونلاين من الصفر، لكن يجب أن يكون لديك عمل قائم أو خبرة حقيقية وخدمة واضحة. هي ليست برنامجاً لاكتشاف فكرة عمل أو تعليم شخص كيف يصبح صانع محتوى.",
  },
  {
    q: "هل يمكن تنفيذ المشروع عن بُعد؟",
    a: "يمكن تنفيذ الاستراتيجية، الرسائل، نظام المحتوى، الكتابة والمراجعات عن بُعد. يتم تحديد طريقة التصوير والإنتاج بناءً على موقع العميل وطبيعة المشروع.",
  },
];

export function FaqSection() {
  return (
    <Section id="faq" tone="surface" labelledBy="faq-title">
      <SectionHead id="faq-title" number="08" label="الأسئلة" title="قبل أن تبدأ." />
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-start font-display text-base text-navy hover:no-underline sm:text-lg">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-[2] text-subtle">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
