import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  tone = "cream",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "cream" | "surface" | "navy";
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28",
        tone === "cream" && "bg-background",
        tone === "surface" && "bg-surface",
        tone === "navy" && "bg-navy text-cream",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export function SectionHead({
  number,
  label,
  title,
  id,
  invert = false,
}: {
  number: string;
  label: string;
  title: ReactNode;
  id?: string;
  invert?: boolean;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3">
        <span className="font-latin text-xs font-semibold tracking-[0.2em] text-bronze">
          {number}
        </span>
        <span className="h-px w-8 bg-bronze/50" />
        <span
          className={cn(
            "text-xs font-medium tracking-wide",
            invert ? "text-cream/70" : "text-subtle",
          )}
        >
          {label}
        </span>
      </div>
      <h2
        id={id}
        className={cn(
          "mt-5 max-w-3xl font-display text-[1.75rem] leading-[1.4] sm:text-4xl sm:leading-[1.35]",
          invert && "text-cream",
        )}
      >
        {title}
      </h2>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("reveal", className)} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
