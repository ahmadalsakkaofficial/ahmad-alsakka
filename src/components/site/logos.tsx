const logos = [
  { src: "/logos/apple-dental.png", name: "Apple Dental Centre" },
  { src: "/logos/wafa-dental.png", name: "Wafa Dental Center" },
  { src: "/logos/ipg.png", name: "IPG Chartered Professional Accountants" },
  { src: "/logos/dar-real-estate.png", name: "DAR Real Estate" },
  { src: "/logos/hamam-alsamel.png", name: "Hamam Alsamel Real Estate" },
  { src: "/logos/al-jazeera.png", name: "الجزيرة" },
  { src: "/logos/al-bayan.png", name: "جريدة البيان" },
  { src: "/logos/motionarabia.png", name: "MotionArabia" },
  { src: "/logos/al-yousuf-motors.png", name: "Al Yousuf Motors" },
  { src: "/logos/mg.png", name: "MG" },
  { src: "/logos/emirates-glass.png", name: "Emirates Glass" },
  { src: "/logos/wesecure.png", name: "WeSecure" },
  { src: "/logos/scf.png", name: "Syrian Canadian Foundation" },
  { src: "/logos/jumpstart.png", name: "Jumpstart Refugee Talent" },
  { src: "/logos/sewar.png", name: "Sewar" },
];

const fields = ["عيادات أسنان", "محاسبة", "عقارات", "إعلام", "سيارات", "منظمات", "براندات"];

export function LogoWall() {
  return (
    <section aria-labelledby="logos-title" className="border-y border-border bg-surface px-5 py-14 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-3 text-center">
          <h2 id="logos-title" className="text-xl font-bold text-navy sm:text-2xl">
            اشتغلت مع عيادات وشركات ومؤسسات بين الإمارات وكندا
          </h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {fields.map((f) => (
              <li key={f} className="rounded-full border border-bronze/35 px-3 py-1 text-sm text-bronze">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-10 grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
          {logos.map((l) => (
            <li key={l.src} className="flex h-14 items-center justify-center">
              <img
                src={l.src}
                alt={l.name}
                title={l.name}
                loading="lazy"
                className="max-h-12 w-auto max-w-[120px] object-contain opacity-70 transition-opacity hover:opacity-100"
              />
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-base leading-[1.9] text-subtle">
          وقبلها بدبي صوّرنا مع MotionArabia سيارات لامبورغيني وفيراري وماكلارن ورولز رويس ومرسيدس لديلرز ومراكز
          بالإمارات
        </p>
      </div>
    </section>
  );
}
