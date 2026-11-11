import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ApplicationForm } from "./application-form";
import { Vsl } from "./vsl";
import { siteConfig } from "@/config/site";
import { trackAuthorityEvent, trackMetaEvent } from "@/lib/authority-engine/analytics";
import portrait from "@/assets/ahmad-portrait.png.asset.json";
import ajiProfile from "@/assets/IMG_1982.jpg.asset.json";
import ajiReel1 from "@/assets/IMG_1985.jpg.asset.json";
import ajiReel2 from "@/assets/IMG_1992.jpg.asset.json";
import ajiReel3 from "@/assets/IMG_1993.jpg.asset.json";
import wsProfile from "@/assets/IMG_1987.jpg.asset.json";
import wsReel1 from "@/assets/IMG_1989.jpg.asset.json";
import wsReel2 from "@/assets/IMG_1988.jpg.asset.json";
import wsReel3 from "@/assets/IMG_1991.jpg.asset.json";

const scenarios = [
  ["01", "اسمك يصير مألوف", "يشوف فيديو إلك اليوم، وبعدين فيديو ثاني بعد أسبوع، ولما يحتاج شخص بمجالك، اسمك بيكون مألوف"],
  ["02", "الثقة تبدأ قبل المكالمة", "يدخل على المكالمة وهو فاهم كيف بتفكر، شو موقفك، وليش طريقتك مختلفة، وما عم تبدأ بناء الثقة من الصفر"],
  ["03", "خبرتك تشتغل بغيابك", "المحتوى يعرّف الناس عليك حتى وإنت مش موجود، بدل ما تضل خبرتك محصورة بالناس اللي قابلتهم شخصياً"],
  ["04", "فرص أبعد من العميل", "براند شخصي قوي ممكن يفتح باب لشراكة، مقابلة، Podcast، تعاون أو فرصة خارج شبكة علاقاتك الحالية"],
];

const phases = [
  { n: "01", en: "STRATEGY", ar: "الاستراتيجية", dream: "حتى الشخص الصح يفهم فوراً ليش لازم يتذكرك أنت", details: "الجمهور، الـPositioning، الصورة الذهنية، وشو بدك تنعرف فيه" },
  { n: "02", en: "SYSTEM", ar: "النظام", dream: "حتى ما تضل كل أسبوع تسأل، شو بدي أنشر؟", details: "استخراج الأفكار، Content Pillars، Hooks، Formats وWorkflow واضح" },
  { n: "03", en: "PRODUCTION", ar: "الإنتاج", dream: "حتى نطلع خبرتك من راسك ونحولها لشي السوق فعلاً يقدر يشوفه", details: "سكربتات تشبهك، تطبيق عملي، توجيه تصوير، وأول دفعة محتوى" },
  { n: "04", en: "OPTIMIZE & GROW", ar: "التطوير", dream: "حتى نعرف شو عم يجذب الجمهور الصح ونضاعف اللي عم يشتغل", details: "مراجعة البيانات، تطوير الـHooks والـFormats، وخطة المرحلة التالية" },
];

const transformations = ["عندك وضوح أكبر بشو بدك تنعرف فيه", "لما تفتح الكاميرا ما عم تبدأ من الصفر", "المحتوى صار مرتبط بطريقة تفكيرك وخبرتك", "عندك نظام تقدر تكرره", "صار في مكتبة محتوى حقيقية تمثل اسمك", "بتعرف شو عم يشتغل مع جمهورك وشو لازم يتطور"];

const faqs = [
  ["هل لازم أكون عم أصنع محتوى حالياً؟", "لا، ممكن نبدأ من الصفر إذا عندك خبرة أو عمل حقيقي نبني عليه"],
  ["هل لازم يكون عندي كاميرا ومعدات احترافية؟", "لا، بنبني Setup يناسب وضعك، الأهم يكون في صورة وصوت محترمين وطريقة تقدر تكررها"],
  ["هل بتكتبولي المحتوى؟", "نعم، منشتغل معك على بناء الأفكار والسكربتات والنظام، بس الهدف إن المحتوى يطلع بصوتك وطريقة تفكيرك، مو نصوص عامة ما بتشبهك"],
  ["هل بتديروا الحساب عني؟", "The Authority Engine مو إدارة سوشال ميديا تقليدية، منشتغل على الاستراتيجية والنظام والمحتوى والتنفيذ، وبنحدد مسؤوليات التنفيذ حسب المشروع"],
  ["هل بتضمنوا Views أو عملاء؟", "لا، ما منضمن عدد مشاهدات، متابعين أو عملاء، منشتغل على العناصر اللي فينا نتحكم فيها، الرسالة، الأفكار، النظام، التنفيذ، الاختبار والتحسين"],
  ["شو بيصير بعد الـ3 شهور؟", "بتكون بنيت أساس واضح للنظام، فيك تكمل عليه مع فريقك، أو إذا حبيت نضل نشتغل سوا ونطوّر النتائج أكتر، فينا نحدد المرحلة التالية"],
  ["كم سعر البرنامج؟", "3,000 USD بالشهر لمدة 3 شهور، يعني 9,000 USD للبرنامج كامل، والدفع كل شهر بشهره، وإذا ما سلّمنا المخرجات المتفق عليها بأول شهر، بتوقف وما بتدفع الباقي"],
  ["هل YouTube أو Podcast داخل السعر؟", "العرض الأساسي مركّز على Instagram وTikTok والمحتوى القصير، ومنه كاروسيلات وبوستات LinkedIn، YouTube الطويل أو Podcast أو أي إنتاج إضافي منضيفه لحاله حسب المشروع"],
];

function Cta({ children = "اعرف إذا النظام مناسب إلك", light = false }: { children?: string; light?: boolean }) {
  return <Button asChild className={`h-14 px-7 text-lg ${light ? "bg-bronze text-cream hover:bg-bronze/90" : "bg-navy text-cream hover:bg-navy/90"}`}><a href="#apply">{children}<ArrowLeft /></a></Button>;
}

function SectionTitle({ eyebrow, children, light = false }: { eyebrow: string; children: React.ReactNode; light?: boolean }) {
  return <div className="mx-auto mb-12 max-w-3xl text-center"><p className="text-base text-bronze">{eyebrow}</p><h2 className={`mt-3 text-3xl leading-[1.35] sm:text-5xl ${light ? "text-cream" : "text-navy"}`}>{children}</h2></div>;
}

export function AuthorityEngineLanding() {
  useEffect(() => {
    trackMetaEvent("PageView");
    trackMetaEvent("ViewContent", { content_name: "Authority Engine" });
    trackAuthorityEvent("landing_view");
    const pixelId = siteConfig.authorityEngine.metaPixelId;
    if (!pixelId || window.fbq) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    window.fbq = (...args: unknown[]) => {
      const queue = (window.fbq as unknown as { queue?: unknown[][] }).queue ?? [];
      queue.push(args);
      (window.fbq as unknown as { queue: unknown[][] }).queue = queue;
    };
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-cream/15 text-cream">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3"><img src={portrait.url} alt="أحمد السقا" className="size-10 rounded-full border border-bronze object-cover" /><span><strong className="block text-lg font-normal">أحمد السقا</strong><small className="font-latin text-[11px] text-cream/60">THE AUTHORITY ENGINE</small></span></a>
          <Link to="/" className="text-sm text-cream/70 transition-colors hover:text-bronze">الموقع الرئيسي</Link>
        </div>
      </header>

      <main>
        <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden bg-navy px-5 pb-16 pt-32 text-cream sm:px-8 lg:pb-24">
          <div className="pointer-events-none absolute inset-y-0 left-[12%] hidden w-px bg-cream/10 lg:block" /><div className="pointer-events-none absolute inset-y-0 right-[12%] hidden w-px bg-cream/10 lg:block" />
          <div className="relative mx-auto grid w-full max-w-6xl items-end gap-12 lg:grid-cols-[1fr_280px]">
            <div className="max-w-4xl">
              <p className="mb-5 text-base text-bronze">براند شخصي ومحتوى لأصحاب الخبرة</p>
              <h1 className="max-w-4xl text-5xl leading-[1.17] text-cream sm:text-7xl lg:text-[5.2rem]">خلي سمعتك أونلاين تصير بمستوى خبرتك الحقيقية</h1>
              <div className="mt-7 max-w-2xl space-y-3 text-lg leading-8 text-cream/75 sm:text-xl">
                <p>يمكن عملاءك الحاليين بيعرفوا قيمتك، والناس اللي اشتغلت معك بتعرف كيف بتفكر، بس في آلاف الأشخاص بالسوق ما عندهم أي طريقة يعرفوا هالشي</p>
                <p>The Authority Engine يساعدك تحول خبرتك، أفكارك وطريقة تفكيرك لحضور يخلي الشخص المناسب يعرف مين أنت قبل ما يحكي معك</p>
              </div>
              <blockquote className="mt-8 max-w-2xl border-r-2 border-bronze pr-5 text-2xl leading-10 text-cream">بدل ما تكون خبير الناس تكتشفه فقط عن طريق توصية، ابني اسم يخلي السوق يعرفك قبل ما يحتاجك</blockquote>
              <Button asChild className="mt-9 h-14 bg-bronze px-7 text-lg text-cream hover:bg-bronze/90"><a href="#video">شوف كيف ممكن نبني هاد معك<ArrowLeft /></a></Button>
            </div>
            <div className="hidden border-r border-bronze/50 pr-5 lg:block"><p className="text-6xl text-bronze">3</p><p className="mt-1 text-lg text-cream/65">شهور لبناء أصل حول اسمك</p></div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="المستقبل اللي عم نبنيه">تخيّل العميل يعرفك قبل أول مكالمة</SectionTitle>
          <div className="grid border-y border-bronze/30 lg:grid-cols-2">{scenarios.map(([n,title,text], i) => <article key={n} className={`relative min-h-64 p-7 sm:p-10 ${i % 2 === 0 ? "lg:border-l" : ""} ${i < 2 ? "border-b" : ""} border-bronze/25`}><span className="font-latin text-sm text-bronze">{n}</span><h3 className="mt-10 text-3xl text-navy">{title}</h3><p className="mt-4 max-w-md text-lg leading-8 text-subtle">{text}</p></article>)}</div>
          <div className="mt-12 text-center"><p className="text-2xl leading-10 text-navy">الموضوع مو إنك تصير مشهور<br />الموضوع إن الشخص الصح يعرف مين أنت</p></div>
        </div></section>

        <Vsl />

        <section className="px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="الفجوة الحقيقية">المشكلة مو إنك ناقصك خبرة<br />المشكلة إن السوق ما بيقدر يشوفها بسهولة</SectionTitle>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end"><p className="text-4xl leading-[1.45] text-navy sm:text-5xl">خبرتك اليوم ممكن تكون أكبر بكتير من حضورك</p><div className="space-y-5 text-lg leading-8 text-subtle"><p>ممكن تكون عم تسكر صفقات جدية، تدير عيادة أو شركة قائمة، تنصح عملاء مهمين، أو عندك سنوات طويلة من الخبرة</p><p>بس الشخص الغريب أونلاين ما بيقدر يشوف هاد كله لحاله، وإذا خبرتك موجودة بس داخل الاجتماعات والتوصيات والعلاقات الحالية، تأثيرها بيوقف أول ما تطلع من الغرفة</p></div></div>
        </div></section>

        <Proof />

        <section className="bg-navy px-5 py-20 text-cream sm:px-8 lg:py-28"><div className="mx-auto max-w-5xl text-center"><SectionTitle eyebrow="وجهة نظر مختلفة" light>ما بدي أحوّلك لـ Content Creator</SectionTitle><div className="mx-auto max-w-3xl space-y-3 text-2xl leading-10 text-cream/80"><p>إذا أنت طبيب، بدي تضل طبيب</p><p>إذا أنت محامي، بدي تضل محامي</p><p>وإذا عندك شركة، شغلك الأساسي لازم يضل شركتك</p></div><p className="mx-auto mt-10 max-w-2xl border-y border-bronze/40 py-7 text-3xl leading-10 text-cream">المحتوى المفروض يخدم شغلك، مو يصير هو شغلك</p><p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-cream/70">لهيك The Authority Engine مبني حتى يحوّل خبرتك الموجودة أساساً إلى نظام محتوى تقدر تستخدمه وتطوره</p></div></section>

        <section className="px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-6xl"><SectionTitle eyebrow="من الخبرة للسلطة">هون بيجي The Authority Engine</SectionTitle><p className="mx-auto -mt-6 mb-12 max-w-2xl text-center text-lg leading-8 text-subtle">نحنا مو عم نبيعك Reels، عم نبني النظام اللي يحوّل خبرتك لسلطة واضحة بالسوق</p><div className="grid gap-px overflow-hidden border border-bronze/30 bg-bronze/25 lg:grid-cols-4">{phases.map((phase) => <article key={phase.n} className="bg-cream p-6 sm:p-8"><div className="flex items-center justify-between"><span className="font-latin text-sm text-bronze">{phase.n}</span><span className="font-latin text-[11px] text-subtle">{phase.en}</span></div><h3 className="mt-12 text-3xl text-navy">{phase.ar}</h3><p className="mt-4 min-h-28 text-xl leading-8 text-navy">{phase.dream}</p><p className="mt-7 border-t border-bronze/25 pt-5 text-base leading-7 text-subtle">{phase.details}</p></article>)}</div></div></section>

        <Transformation />

        <section className="px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-6xl"><SectionTitle eyebrow="الملاءمة">هل النظام مناسب إلك؟</SectionTitle><div className="grid gap-6 lg:grid-cols-2"><FitList title="غالباً مناسب إلك إذا" items={["عندك عمل قائم وخبرة حقيقية", "بتعتمد كثير على العلاقات والتوصيات", "حضورك الرقمي أضعف من مستوى خبرتك", "بدك الناس تفهم شو بيميزك", "بدك محتوى يخدم البزنس، مو بس Views", "مستعد تشارك بوقتك وخبرتك بالعملية", "مستعد تستثمر بشكل جدي ببناء البراند"]} /><FitList muted title="غالباً مو مناسب إلك إذا" items={["لسا ما عندك خدمة أو خبرة واضحة", "هدفك الأساسي تكبر عدد المتابعين بسرعة", "بدك حدا يعمل كل شي بدون أي مشاركة منك", "بدك ضمان لمليون مشاهدة", "بدك ضمان لعدد معين من العملاء", "عم تدور فقط على أرخص خدمة Reels بالسوق"]} /></div></div></section>

        <section className="bg-surface px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-5xl"><SectionTitle eyebrow="عن الشخص خلف النظام">مين أحمد؟</SectionTitle><div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]"><img src={portrait.url} alt="أحمد السقا" loading="lazy" width="640" height="640" className="aspect-square w-full border border-bronze/30 object-cover" /><div className="space-y-5 text-lg leading-8 text-subtle"><p>من 2016 وأنا بشتغل بصناعة المحتوى والفيديو، أسّست مع شريكي MotionArabia بدبي، واشتغلت مع جريدة البيان ومشاريع كتير بين الخليج وكندا، وبكندا اشتغلت مع AJI Canada وWestStep، وحساباتهم جابت أكتر من 100 ألف مشاهدة بأول شهر</p><p>بس الشي اللي صار يهمني أكتر مع الوقت مو بس إن الفيديو يطلع حلو، يهمني إن المحتوى يساعد الناس تفهم مين أنت، شو خبرتك، وكيف بتفكر</p><p className="border-r-2 border-bronze pr-5 text-2xl leading-9 text-navy">ومن هون إجت فكرة The Authority Engine، نبني نظام يخلي خبرتك تظهر بشكل واضح وقابل للتكرار</p></div></div></div></section>

        <Pricing />

        <section className="px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-4xl"><SectionTitle eyebrow="قبل ما تقدّم">أسئلة ممكن تكون ببالك</SectionTitle><Accordion type="single" collapsible className="border-t border-bronze/30">{faqs.map(([q,a],i) => <AccordionItem key={q} value={`faq-${i}`} className="border-bronze/30"><AccordionTrigger className="py-6 text-right text-xl text-navy hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 text-lg leading-8 text-subtle">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

        <ApplicationForm />
      </main>
      <footer className="border-t border-bronze/20 bg-navy px-5 py-8 text-cream"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-cream/65 sm:flex-row"><p>أحمد السقا، The Authority Engine</p><nav className="flex gap-6"><Link to="/privacy">الخصوصية</Link><Link to="/terms">الشروط</Link><Link to="/">الموقع الرئيسي</Link></nav></div></footer>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-bronze/30 bg-cream/95 p-3 backdrop-blur-sm lg:hidden"><Button asChild className="h-12 w-full bg-bronze text-base text-cream hover:bg-bronze/90"><a href="#apply">قدّم طلبك<ArrowLeft /></a></Button></div>
    </div>
  );
}

function Proof() {
  const clients = [
    { name: "AJI Canada", platform: "Instagram", profile: ajiProfile.url, reels: [[ajiReel1.url,"207K"],[ajiReel2.url,"137.9K"],[ajiReel3.url,"86.5K"]] },
    { name: "WestStep Canada", platform: "TikTok", profile: wsProfile.url, reels: [[wsReel1.url,"158.2K"],[wsReel2.url,"150K"],[wsReel3.url,"144.6K"]] },
  ];
  return <section className="bg-surface px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-6xl"><SectionTitle eyebrow="شغل حقيقي">من فكرة، لمحتوى، لوصول حقيقي</SectionTitle><div className="space-y-8">{clients.map((client) => <article key={client.name} className="grid gap-6 border-y border-bronze/30 py-7 lg:grid-cols-[260px_1fr] lg:items-center"><div className="flex items-center gap-4"><img src={client.profile} alt={`حساب ${client.name}`} loading="lazy" className="size-16 rounded-full border border-bronze/30 object-cover" /><div><h3 className="font-latin text-xl text-navy">{client.name}</h3><p className="font-latin text-sm text-bronze">{client.platform}</p></div></div><div className="flex gap-4 overflow-x-auto pb-2">{client.reels.map(([src,views]) => <figure key={src} className="w-28 shrink-0 sm:w-36"><img src={src} alt={`محتوى ${client.name}`} loading="lazy" className="aspect-[9/16] w-full border border-bronze/25 object-cover" /><figcaption className="mt-2 text-center font-latin text-base text-bronze">{views} views</figcaption></figure>)}</div></article>)}</div><p className="mx-auto mt-8 max-w-2xl text-center text-base leading-7 text-subtle">الأرقام هون أمثلة على التنفيذ والوصول، مو ضمان إن كل مشروع رح يحقق نفس النتائج</p></div></section>;
}

function Transformation() {
  return <section className="bg-surface px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-6xl"><SectionTitle eyebrow="التحوّل أولاً">بعد 3 شهور، شو لازم يكون تغيّر؟</SectionTitle><div className="grid gap-px border border-bronze/30 bg-bronze/25 sm:grid-cols-2 lg:grid-cols-3">{transformations.map((item) => <div key={item} className="flex min-h-36 items-start gap-3 bg-surface p-6"><Check className="mt-1 size-5 shrink-0 text-bronze" /><p className="text-xl leading-8 text-navy">{item}</p></div>)}</div><div className="mt-10 grid gap-8 border-t border-bronze/30 pt-10 lg:grid-cols-2"><div><h3 className="text-2xl text-navy">الشي العملي اللي بيكون بإيدك</h3><p className="mt-4 text-lg leading-8 text-subtle">Positioning واضح، Content Pillars، مكتبة أفكار وسكربتات، Formats قابلة للتكرار، Workflow للإنتاج، وأرقام حقيقية من جمهورك بتقلك شو اللي عم يشتغل</p></div><blockquote className="border-r-2 border-bronze pr-5 text-3xl leading-10 text-navy">مش محتوى لكم شهر… أصل بيضل حوالين اسمك</blockquote></div><div className="mt-10 text-center"><Cta>قدّم طلبك</Cta></div><div className="mt-16 border border-bronze/30 p-7 sm:p-10"><h3 className="text-3xl text-navy">وبعد الـ3 شهور؟</h3><div className="mt-5 space-y-4 text-lg leading-8 text-subtle"><p>ما لازم تضل محبوس معنا لتعرف تكمّل، إذا بدك تشغّل النظام مع فريقك، ممتاز</p><p>وإذا بدك نضل معك ونكبره، نرفع الإنتاج، نطور الـFormats، نضيف YouTube أو Podcast أو نشتغل على مرحلة أكبر، فينا نكمّل، وهالشغل منحدده ومنسعّره لحاله</p></div><p className="mt-7 text-2xl text-navy">ضل معنا لأنك شايف قيمة، مو لأنك ما بتعرف تمشي بدوننا</p></div></div></section>;
}

function FitList({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return <div className={`border p-7 sm:p-9 ${muted ? "border-border bg-surface" : "border-bronze/40 bg-background"}`}><h3 className="text-3xl text-navy">{title}</h3><ul className="mt-6 space-y-4">{items.map((item) => <li key={item} className="flex gap-3 text-lg leading-7 text-subtle">{muted ? <X className="mt-1 size-5 shrink-0 text-subtle" /> : <Check className="mt-1 size-5 shrink-0 text-bronze" />}{item}</li>)}</ul></div>;
}

function Pricing() {
  return <section className="bg-navy px-5 py-20 text-cream sm:px-8 lg:py-28"><div className="mx-auto max-w-4xl text-center"><p className="text-base text-bronze">الاستثمار</p><h2 className="mt-5 font-latin text-5xl text-cream sm:text-7xl">3,000 USD <span className="font-sans text-2xl text-cream/70">/ شهرياً</span></h2><p className="mt-4 text-xl text-cream/75">البرنامج مدته 3 شهور، والدفع كل شهر بشهره</p><div className="mx-auto mt-9 max-w-2xl border-y border-bronze/50 py-6 text-3xl text-cream">إجمالي البرنامج <span className="font-latin text-bronze">9,000 USD</span></div><div className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-8 text-cream/70"><p>الشهر الأول منبني فيه الاستراتيجية والنظام ومنصوّر أول دفعة، الشهر التاني والتالت منشر ومنقيس ومنحسّن، ومنصوّر دفعة تانية على أساس الأرقام، المحتوى الأساسي Instagram وTikTok، ومنه كاروسيلات وبوستات LinkedIn</p><p>إذا ما سلّمنا المخرجات المتفق عليها بأول شهر، بتوقف وما بتدفع الشهرين الباقيين</p><p>إذا كان المشروع يحتاج YouTube طويل، Podcast، إنتاج إضافي أو نطاق منصات أكبر، منحدد التفاصيل والتكلفة بشكل منفصل قبل البدء</p><p>ما في ضمان لعدد مشاهدات أو عملاء، الضمان على المخرجات: الاستراتيجية، والنظام، والمحتوى، والنشر، والتحسين</p></div><div className="mt-9"><Cta light>اعرف إذا مناسب إلك</Cta></div></div></section>;
}