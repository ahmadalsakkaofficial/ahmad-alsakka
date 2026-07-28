import { createFileRoute } from "@tanstack/react-router";

const CALENDAR_URL = "#booking";
const INSTAGRAM_URL = "https://instagram.com/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أحمد السقا — براند شخصي ونظام محتوى خلال 60 يوم" },
      {
        name: "description",
        content:
          "بساعد أصحاب المهن والأعمال العرب يحولون خبرتهم لبراند شخصي ونظام محتوى يجيبلهم عملاء، خلال 60 يوم. زبون واحد بالشهر.",
      },
      { property: "og:title", content: "أحمد السقا — براند شخصي ونظام محتوى خلال 60 يوم" },
      {
        property: "og:description",
        content:
          "مش كوتش، مش مصور. بثبّت النظام، بثبت إنه يشتغل، وبمشي لما يصير يشتغل بدوني.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const steps = [
  {
    n: "٠١",
    title: "التموضع والرسالة",
    body: "نحدد لمين بتحكي، شو بتقول، وليش يسمعوك إنت بالذات. جملة واحدة تشتغل بكل مكان.",
  },
  {
    n: "٠٢",
    title: "تركيب نظام المحتوى",
    body: "نظام يشتغل من تليفونك: بنك أفكار، هيكل ريلز وكاروسيل، وروتين أسبوعي بـ 10 ساعات.",
  },
  {
    n: "٠٣",
    title: "التشغيل والتسليم",
    body: "بنشتغل مع بعض على أول 30 يوم نشر، بنعدّل على أرقام حقيقية، وبعدين بسلّمك المفاتيح.",
  },
];

const forYou = [
  "عندك خبرة حقيقية ومهنة أو بزنس شغّال",
  "دكتور، محامي، مستشار، عقاري، أو صاحب أجنسي",
  "بدك عملاء داخلين، مش متابعين للزينة",
  "مستعد تظهر بصوتك إنت، مش بصوت مستعار",
];

const notForYou = [
  "لسا ما عندك خدمة أو بزنس",
  "بدك حدا يشتغل الحساب بدالك للأبد",
  "بتدوّر على وصفة سريعة أو فيروسية",
  "مش مستعد تعطي 10 ساعات بالأسبوع",
];

const counter = [
  ["بيبيعوا كمية", "أنا ببيع دقّة"],
  ["بيبيعوا حلم", "أنا بركّب نظام"],
  ["بيبيعوا لناس ما عندها بزنس", "أنا بشتغل مع ناس عندها بزنس"],
  ["بيطلعوا مؤثرين", "أنا بشتغل مشغّل"],
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-6">
          <span className="text-sm font-bold tracking-tight text-navy">أحمد السقا</span>
          <span className="eyebrow">Authority Engine</span>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-14">
        <header className="reveal space-y-6">
          <p className="eyebrow">Mississauga · Ontario</p>
          <h1 className="text-3xl leading-[1.35] sm:text-4xl sm:leading-[1.3]">
            بحوّل خبرتك لبراند شخصي ونظام محتوى يجيبلك عملاء — خلال ٦٠ يوم.
          </h1>
          <p className="text-lg leading-relaxed text-subtle">
            بشتغل مع أصحاب المهن والأعمال العرب — استشاريين، دكاترة، محامين، عقاريين، أصحاب
            أجنسيات — اللي عندهم خبرة حقيقية بس مالهم وجود أونلاين.
          </p>
          <p className="text-lg leading-relaxed text-subtle">
            مش كوتش. مش مصوّر. بثبّتلك النظام، بثبت إنه يشتغل، وبمشي لما يصير يشتغل بدوني.
          </p>
        </header>

        <section
          id="booking"
          className="reveal mt-12 overflow-hidden rounded-xl border border-border bg-card shadow-raised"
          style={{ animationDelay: "120ms" }}
          aria-labelledby="offer-title"
        >
          <div className="grid grid-cols-3 border-b border-border">
            <div className="border-l border-border p-4">
              <span className="eyebrow block">Timeline</span>
              <span className="mt-1 block text-sm font-bold text-navy">٦٠ يوم</span>
            </div>
            <div className="border-l border-border p-4">
              <span className="eyebrow block">Capacity</span>
              <span className="mt-1 block text-sm font-bold text-navy">زبون واحد بالشهر</span>
            </div>
            <div className="p-4">
              <span className="eyebrow block">Investment</span>
              <span className="mt-1 block text-sm font-bold text-navy">
                <span className="font-latin">$3,500</span> USD
              </span>
            </div>
          </div>

          <div className="space-y-8 p-6">
            <div>
              <h2 id="offer-title" className="text-xl">
                محرّك الحضور — The Authority Engine
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-subtle">
                خدمة واحدة فقط. مفيش باقات، مفيش إضافات. نظام كامل بيتركّب مرة وبيضل يشتغل.
              </p>
            </div>

            <ol className="space-y-5">
              {steps.map((s) => (
                <li key={s.n} className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-[11px] font-bold text-bronze">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-subtle">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rule-line" />

            <div className="space-y-3">
              <a
                href={CALENDAR_URL}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-navy px-6 py-4 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                احجز مكالمة تعارف
              </a>
              <p className="text-center text-xs text-subtle">
                ٢٠ دقيقة. بنشوف إذا في مجال نشتغل سوا — ولا لأ.
              </p>
            </div>
          </div>
        </section>

        <section className="reveal mt-16" style={{ animationDelay: "200ms" }}>
          <div className="mb-6 flex items-center gap-4">
            <span className="eyebrow shrink-0">Who this is for</span>
            <div className="rule-line flex-1" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold">مناسب إلك إذا</h3>
              <ul className="mt-3 space-y-2">
                {forYou.map((t) => (
                  <li key={t} className="flex gap-2 text-sm leading-relaxed text-subtle">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-bronze" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold">مش مناسب إذا</h3>
              <ul className="mt-3 space-y-2">
                {notForYou.map((t) => (
                  <li key={t} className="flex gap-2 text-sm leading-relaxed text-subtle">
                    <span className="mt-2 h-px w-3 shrink-0 bg-subtle/50" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="reveal mt-16" style={{ animationDelay: "280ms" }}>
          <div className="mb-6 flex items-center gap-4">
            <span className="eyebrow shrink-0">The difference</span>
            <div className="rule-line flex-1" />
          </div>
          <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {counter.map(([them, me]) => (
              <div key={me} className="grid grid-cols-2 text-sm">
                <dt className="border-l border-border p-4 text-subtle">{them}</dt>
                <dd className="p-4 font-bold text-navy">{me}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="reveal mt-16 rounded-xl bg-navy p-8 text-center"
          style={{ animationDelay: "340ms" }}
        >
          <p className="text-lg leading-relaxed text-cream">
            البراند الشخصي لصاحب المهنة مش رفاهية. هو تأمين.
          </p>
          <a
            href={CALENDAR_URL}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-bronze px-6 py-3 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
          >
            ابدأ من هون
          </a>
        </section>
      </main>

      <footer className="mt-8 border-t border-border">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-10">
          <a
            href={INSTAGRAM_URL}
            className="text-sm font-bold text-navy transition-colors hover:text-bronze"
          >
            تابعني على إنستغرام
          </a>
          <p className="eyebrow">© {new Date().getFullYear()} Ahmad Alsakka</p>
        </div>
      </footer>
    </div>
  );
}
