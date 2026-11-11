import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHead } from "./primitives";

export const faqs = [
  {
    q: "بحتاج كاميرا ومعدات احترافية؟",
    a: "لا، بأغلب الحالات موبايل منيح وصوت واضح وإضاءة بسيطة بيكفّوا، الهدف مو نحوّل مكتبك لاستوديو، الهدف setup بتقدر تستعمله دايماً",
  },
  {
    q: "إنتو بتكتبولي الفيديوهات؟",
    a: "أيوه، منكتب السكربتات، بس لازم تبيّن إنها طالعة منك إنت، ما بدي تحفظ كلام غريب عنك أو تنزّل نص واضح إنه مكتوب بالـAI",
  },
  {
    q: "شو بيصير بعد الـ3 شهور؟",
    a: "بيكون عندك نظام شغّال وموثّق، وأرقام بتقلك شو عم يشتغل، فيك تكمّل عليه مع فريقك، أو إذا حابب نكمّل سوا، منتفق على مرحلة جديدة",
  },
  {
    q: "بتضمنلي عدد عملاء؟",
    a: "لا، وأي حدا بيعطيك هالضمان قبل ما يفهم شغلك وسوقك ما عم يحكيلك الحقيقة، اللي منلتزم فيه هو المخرجات: الاستراتيجية، والنظام، والمحتوى، والنشر، والقياس",
  },
  {
    q: "مناسب لحدا بيبلّش من الصفر أونلاين؟",
    a: "أيوه، إذا عندك شغل قائم وخبرة حقيقية وخدمة واضحة، بس مو برنامج لتلاقي فكرة بزنس، ولا لتصير صانع محتوى",
  },
  {
    q: "فينا نشتغل عن بعد؟",
    a: "الاستراتيجية والرسائل والنظام والكتابة والمراجعات كلها عن بعد، التصوير منحدده حسب وين إنت وشو طبيعة شغلك",
  },
];

export function FaqSection() {
  return (
    <Section id="faq" tone="surface" labelledBy="faq-title">
      <SectionHead id="faq-title" number="09" label="الأسئلة" title="قبل ما تبلّش" />
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-start font-display text-base text-navy hover:no-underline sm:text-lg">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-[2] text-subtle">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
