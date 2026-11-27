import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { siteConfig } from "../config/site";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">٤٠٤</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة مش موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة اللي بتدوّر عليها إما انحذفت أو الرابط غلط.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            رجوع للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}


function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          الصفحة ما حمّلت
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          صار خطأ من عندنا. جرّب تحدّث الصفحة أو ارجع للرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            جرّب مرة ثانية
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            رجوع للرئيسية
          </a>
        </div>
      </div>
    </div>
  );

}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "أحمد" },
      { property: "og:site_name", content: "أحمد | The Authority Engine" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_AR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function useGlowTracker() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".glow-card") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);
}

/** Meta Pixel on every page, with a PageView on each route change. */
function useMetaPixel() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const pixelId = siteConfig.authorityEngine.metaPixelId;
    if (!pixelId || typeof window === "undefined") return;
    if (!window.fbq) {
      const f = function (...args: unknown[]) {
        const q = f as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[][] };
        if (q.callMethod) q.callMethod(...args); else q.queue.push(args);
      } as unknown as ((...args: unknown[]) => void) & { queue: unknown[][]; loaded: boolean; version: string; push: unknown };
      f.queue = []; f.loaded = true; f.version = "2.0"; f.push = f;
      window.fbq = f;
      (window as unknown as { _fbq: unknown })._fbq = f;
      const sc = document.createElement("script");
      sc.async = true;
      sc.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(sc);
      window.fbq("init", pixelId);
    }
    window.fbq("track", "PageView");
  }, [path]);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useGlowTracker();
  useMetaPixel();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
