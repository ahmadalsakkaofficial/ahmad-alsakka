import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

const w = siteConfig.workshop;
const W = 1080;
const H = 1920;
const GOLD = "#F5B942";
const CREAM = "#F2EEE6";
const MUTED = "#A39E95";
const FONT = '"Thmanyah Serif Display", "IBM Plex Sans Arabic", serif';
const IG_HANDLE = "@ahmad.alsakka.official";

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fitText(ctx: CanvasRenderingContext2D, text: string, weight: number, start: number, maxWidth: number, min = 34) {
  let size = start;
  ctx.font = `${weight} ${size}px ${FONT}`;
  while (ctx.measureText(text).width > maxWidth && size > min) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${FONT}`;
  }
  return size;
}

async function drawTicket(canvas: HTMLCanvasElement, name: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  try {
    await Promise.all([document.fonts.load(`700 60px "Thmanyah Serif Display"`), document.fonts.load(`400 30px "Thmanyah Serif Display"`), document.fonts.load(`900 60px "Thmanyah Serif Display"`)]);
  } catch {
    /* fall back to system fonts */
  }
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#070707";
  ctx.fillRect(0, 0, W, H);

  // gold glow
  const g = ctx.createRadialGradient(W / 2, 760, 40, W / 2, 760, 900);
  g.addColorStop(0, "rgba(245,185,66,0.30)");
  g.addColorStop(1, "rgba(245,185,66,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.direction = "rtl";
  ctx.textBaseline = "alphabetic";

  // headline above ticket
  ctx.textAlign = "center";
  ctx.fillStyle = CREAM;
  ctx.font = `900 64px ${FONT}`;
  ctx.fillText("حجزت مكاني بالندوة ✅", W / 2, 190);

  // ticket body
  const tx = 90, ty = 260, tw = 900, th = 1420, perf = 1290;
  ctx.save();
  roundRect(ctx, tx, ty, tw, th, 44);
  ctx.fillStyle = "#121212";
  ctx.shadowColor = "rgba(245,185,66,0.45)";
  ctx.shadowBlur = 60;
  ctx.fill();
  ctx.restore();
  roundRect(ctx, tx, ty, tw, th, 44);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(245,185,66,0.7)";
  ctx.stroke();

  // notches + perforation
  ctx.fillStyle = "#070707";
  for (const cx of [tx, tx + tw]) {
    ctx.beginPath();
    ctx.arc(cx, perf, 38, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.setLineDash([18, 14]);
  ctx.strokeStyle = "rgba(245,185,66,0.8)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(tx + 56, perf);
  ctx.lineTo(tx + tw - 56, perf);
  ctx.stroke();
  ctx.setLineDash([]);

  const right = tx + tw - 64;

  // pill
  ctx.font = `700 30px ${FONT}`;
  const pill = "تذكرة دخول · ندوة لايف مجانية";
  const pw = ctx.measureText(pill).width + 56;
  roundRect(ctx, right - pw, 330, pw, 62, 31);
  ctx.fillStyle = "rgba(245,185,66,0.14)";
  ctx.fill();
  ctx.strokeStyle = "rgba(245,185,66,0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = GOLD;
  ctx.textAlign = "right";
  ctx.fillText(pill, right - 28, 372);

  // title
  ctx.font = `900 80px ${FONT}`;
  ctx.fillStyle = GOLD;
  ctx.fillText("ليش الأقل خبرة", right, 500);
  ctx.fillStyle = CREAM;
  ctx.fillText("منك معروف أكتر؟", right, 600);
  ctx.font = `400 38px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.fillText("مع أحمد السقا", right, 666);

  // photo (bottom-left of the upper part)
  try {
    const img = await loadImage("/images/ahmad-cutout.webp");
    const ph = 560;
    const pw2 = (img.width / img.height) * ph;
    const px = tx + 20;
    const py = perf - ph - 4;
    ctx.save();
    roundRect(ctx, tx, ty, tw, perf - ty, 44);
    ctx.clip();
    const pg = ctx.createRadialGradient(px + pw2 / 2, py + ph * 0.42, 10, px + pw2 / 2, py + ph * 0.42, 330);
    pg.addColorStop(0, "rgba(245,185,66,0.42)");
    pg.addColorStop(1, "rgba(245,185,66,0)");
    ctx.fillStyle = pg;
    ctx.fillRect(tx, ty, tw, perf - ty);
    ctx.drawImage(img, px, py, pw2, ph);
    ctx.restore();
    // fade photo bottom into the ticket
    const fade = ctx.createLinearGradient(0, perf - 120, 0, perf - 4);
    fade.addColorStop(0, "rgba(18,18,18,0)");
    fade.addColorStop(1, "rgba(18,18,18,1)");
    ctx.fillStyle = fade;
    ctx.fillRect(px - 10, perf - 120, pw2 + 20, 118);
  } catch {
    /* photo optional */
  }

  // holder name
  const colW = 470;
  ctx.textAlign = "right";
  ctx.font = `400 32px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.fillText("باسم", right, 800);
  const shown = name.trim() || "اسمك هون";
  const ns = fitText(ctx, shown, 900, 84, colW);
  ctx.fillStyle = GOLD;
  ctx.fillText(shown, right, 800 + ns + 6);

  // date + times
  const dy = 1010;
  ctx.font = `700 46px ${FONT}`;
  ctx.fillStyle = CREAM;
  ctx.fillText(`${w.dateLabel} 2026`, right, dy);
  ctx.font = `400 33px ${FONT}`;
  ctx.fillStyle = CREAM;
  const times = ["8 م السعودية · 9 م الإمارات", "7 م مصر · 5 م GMT", "12 الظهر تورنتو ونيويورك"];
  times.forEach((t, i) => ctx.fillText(t, right, dy + 66 + i * 52));
  ctx.font = `400 30px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.fillText("أونلاين بالكامل", right, dy + 66 + times.length * 52 + 10);

  // stub
  ctx.textAlign = "center";
  ctx.font = `400 34px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.fillText("تابعني وشاركها عالستوري مع تاغ", W / 2, perf + 110);
  ctx.direction = "ltr";
  ctx.font = `700 58px Inter, ${FONT}`;
  ctx.fillStyle = GOLD;
  ctx.fillText(IG_HANDLE, W / 2, perf + 200);
  ctx.direction = "rtl";
  ctx.font = `400 34px ${FONT}`;
  ctx.fillStyle = CREAM;
  ctx.fillText("سجّل مجاناً:", W / 2 + 4, perf + 290);
  ctx.direction = "ltr";
  ctx.font = `600 36px Inter, ${FONT}`;
  ctx.fillText("ahmad-alsakka.com/workshop", W / 2, perf + 345);
}

export function WorkshopTicket({ initialName }: { initialName: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState(initialName);
  const [url, setUrl] = useState("");
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    let alive = true;
    const t = setTimeout(async () => {
      await drawTicket(c, name);
      if (alive) setUrl(c.toDataURL("image/png"));
    }, 250);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [name]);

  useEffect(() => {
    try {
      const probe = new File([new Blob()], "t.png", { type: "image/png" });
      setCanShare(typeof navigator !== "undefined" && !!navigator.canShare && navigator.canShare({ files: [probe] }));
    } catch {
      setCanShare(false);
    }
  }, []);

  async function share() {
    const c = canvasRef.current;
    if (!c) return;
    const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/png"));
    if (!blob) return;
    const file = new File([blob], "ahmad-alsakka-ticket.png", { type: "image/png" });
    try {
      await navigator.share({ files: [file], text: `حجزت مكاني بندوة ${w.title} ${IG_HANDLE}` });
    } catch {
      /* user cancelled */
    }
  }

  return (
    <section className="glow-card glow-card--always mt-10 rounded-[22px] border border-bronze/40 bg-[#111] p-6 sm:p-8">
      <p className="font-latin text-sm font-semibold tracking-[0.2em] text-bronze">🎟️</p>
      <h2 className="mt-2 text-2xl font-bold">تذكرتك جاهزة</h2>
      <p className="mt-2 text-base leading-[1.8] text-cream/70">
        نزّلها وحطّها عالستوري، واعملي تاغ <span className="font-latin font-semibold text-bronze" dir="ltr">{IG_HANDLE}</span>، وأنا بشاركها عندي
      </p>

      <div className="mt-6 grid items-start gap-6 sm:grid-cols-[1fr_240px]">
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-cream/80">الاسم اللي بيطلع عالتذكرة</span>
            <input
              className="focus-ring w-full rounded-[12px] border border-white/15 bg-white/[0.06] px-4 py-3 text-base text-cream"
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-3">
            {canShare && (
              <button type="button" onClick={share} className="btn-shine focus-ring rounded-[12px] bg-bronze px-6 py-3.5 text-base font-bold text-[#070707]">
                شاركها عالستوري
              </button>
            )}
            <a
              href={url || undefined}
              download="ahmad-alsakka-ticket.png"
              className={`focus-ring rounded-[12px] px-6 py-3.5 text-base font-bold ${canShare ? "border border-bronze/50 text-cream" : "btn-shine bg-bronze text-[#070707]"}`}
            >
              نزّل التذكرة
            </a>
          </div>
        </div>
        <div className="mx-auto w-[220px] sm:w-[240px]">
          {url ? <img src={url} alt="تذكرة الندوة" className="w-full rounded-[14px] border border-white/10" /> : <div className="aspect-[9/16] w-full animate-pulse rounded-[14px] bg-white/5" />}
        </div>
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="hidden" />
    </section>
  );
}
