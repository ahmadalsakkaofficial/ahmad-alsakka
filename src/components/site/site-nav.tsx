import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";


export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <nav
        aria-label="التنقل الرئيسي"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#home" className="flex items-center gap-2.5 focus-ring rounded-md">
          <img
            src="/images/ahmad-avatar.webp"
            alt="أحمد السقا"
            width={36}
            height={36}
            className="size-9 rounded-full border border-bronze/40 object-cover"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold text-navy">
              {siteConfig.nameArabic}
            </span>
            <span className="font-latin text-[10px] font-semibold tracking-[0.18em] text-bronze uppercase">
              {siteConfig.brandName}
            </span>
          </span>
        </a>


        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={cn(
                  "focus-ring rounded-sm pb-1 text-base transition-colors",
                  active === l.href
                    ? "border-b border-bronze text-navy"
                    : "text-subtle hover:text-navy",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/audit"
            className="focus-ring hidden rounded-[10px] bg-bronze px-4 py-2 text-base font-bold text-cream transition-opacity hover:opacity-90 sm:inline-flex"
          >
            قيّم براندك
          </Link>
          <a
            href="#start"
            className="focus-ring hidden rounded-[10px] border border-navy/25 px-4 py-2 text-base font-bold text-navy transition-colors hover:border-bronze hover:text-bronze sm:inline-flex"
          >
            ابدأ من هون
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            className="focus-ring rounded-[10px] border border-border p-2 text-navy md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-5 py-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block rounded-md py-3 text-base text-navy"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/audit"
                onClick={() => setOpen(false)}
                className="focus-ring block rounded-[10px] bg-bronze px-4 py-3 text-center text-base font-bold text-cream"
              >
                قيّم براندك
              </Link>
            </li>

            <li className="pt-2 pb-3">
              <a
                href="#start"
                onClick={() => setOpen(false)}
                className="focus-ring block rounded-[10px] bg-navy px-4 py-3 text-center text-base font-bold text-cream"
              >
                ابدأ من هون
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
