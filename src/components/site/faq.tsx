import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHead } from "./primitives";

export const faqs = [
  {
    q: "كم سعر البرنامج؟",
    a: "3,000 USD بالشهر لمدة 3 شهور والدفع شهر بشهر، وإذا ما سلّمنا المتفق عليه بأول شهر بتوقف وما بتدفع الباقي",
  },
  {
    q: "بحتاج كاميرا ومعدات احترافية؟",
    a: "لا، بأغلب الحالات موبايل منيح وصوت واضح وإضاءة بسيطة بيكفّوا",
  },
  {
    q: "مين بيكتب الفيديوهات؟",
    a: "نحن منكتب السكربتات بس من خبرتك وطريقتك بالحكي، حتى تطلع إنت مش نص محفوظ",
  },
  {
    q: "بتضمنلي عدد عملاء أو مشاهدات؟",
    a: "لا، واللي بيضمنلك هالشي قبل ما يفهم سوقك ما عم يحكيلك الحقيقة، اللي منضمنه هو الشغل نفسه: الاستراتيجية والنظام والمحتوى والنشر والقياس",
  },
  {
    q: "شو بيصير بعد الـ3 شهور؟",
    a: "بيكون عندك نظام شغّال وموثّق وأرقام بتقلك شو عم يشتغل، وبتكمّل عليه مع فريقك أو منتفق على مرحلة جديدة",
  },
  {
    q: "أنا بالخليج وإنت بكندا، كيف بيصير التصوير؟",
    a: "أنا بخطط يوم التصوير وبكتب كل اللقطات وبكون معك أونلاين وقت التصوير لحظة بلحظة، والتصوير بيكون مع مصور محلي برشّحلك ياه وبتدفعله مباشرة، أو بالموبايل إذا بدك، والمونتاج والنشر علينا",
  },
  {
    q: "فيك تجي تصوّر بنفسك؟",
    a: "أيوه، بالخليج أو بأي محل، والسفر وأيام التصوير بتنحسب لحالها فوق سعر البرنامج، وإذا إنت بتورنتو التصوير معي ضمن السعر",
  },
];

export function FaqSection() {
  return (
    <Section id="faq" tone="surface" labelledBy="faq-title">
      <SectionHead id="faq-title" number="06" label="الأسئلة" title="قبل ما تبلّش" />
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
