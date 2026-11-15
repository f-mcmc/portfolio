"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/site";

interface Labels {
  hint: string;
  demo: string;
  code: string;
  close: string;
}

interface Body {
  el: HTMLElement;
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  drag: boolean;
  ox: number;
  oy: number;
  lastX: number;
  lastY: number;
  tvx: number;
  tvy: number;
  moved: number;
}

const GRAVITY = 0.85;
const RESTITUTION = 0.5;

export function WorkArena({ items, labels }: { items: readonly Project[]; labels: Labels }) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const suppressClick = useRef(false);
  const [live, setLive] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  // Physics only on large screens with a mouse and no reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setLive(mq.matches && !rm.matches);
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!live) return;
    const arena = arenaRef.current;
    if (!arena) return;
    const els = cardRefs.current.filter((e): e is HTMLButtonElement => e !== null);
    let W = arena.clientWidth;
    let H = arena.clientHeight;

    const bodies: Body[] = els.map((el, i) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const cols = 4;
      const gap = Math.max(12, (W - cols * w) / (cols + 1));
      return {
        el,
        w,
        h,
        x: gap + (i % cols) * (w + gap),
        y: -h - Math.floor(i / cols) * (h + 40) - i * 30,
        vx: (Math.random() - 0.5) * 3,
        vy: 0,
        rot: 0,
        drag: false,
        ox: 0,
        oy: 0,
        lastX: 0,
        lastY: 0,
        tvx: 0,
        tvy: 0,
        moved: 0,
      };
    });

    let running = false;
    let raf = 0;

    const render = () => {
      for (const b of bodies) {
        const target = b.drag ? 0 : Math.max(-7, Math.min(7, b.vx * 0.8));
        b.rot += (target - b.rot) * 0.2;
        b.el.style.transform = `translate3d(${b.x.toFixed(1)}px,${b.y.toFixed(1)}px,0) rotate(${b.rot.toFixed(2)}deg)`;
      }
    };

    const collide = () => {
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const b = bodies[j];
          if (!a || !b) continue;
          const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox <= 0 || oy <= 0) continue;
          const shareA = a.drag ? 0 : b.drag ? 1 : 0.5;
          const shareB = 1 - shareA;
          if (ox < oy) {
            const dir = a.x + a.w / 2 < b.x + b.w / 2 ? -1 : 1;
            a.x += dir * ox * shareA;
            b.x -= dir * ox * shareB;
            if (!a.drag && !b.drag) {
              const t = a.vx;
              a.vx = b.vx * RESTITUTION;
              b.vx = t * RESTITUTION;
            } else if (a.drag) {
              b.vx = -dir * 4;
            } else {
              a.vx = dir * 4;
            }
          } else {
            const dir = a.y + a.h / 2 < b.y + b.h / 2 ? -1 : 1;
            a.y += dir * oy * shareA;
            b.y -= dir * oy * shareB;
            if (!a.drag && !b.drag) {
              const t = a.vy;
              a.vy = b.vy * RESTITUTION;
              b.vy = t * RESTITUTION;
            }
          }
        }
      }
    };

    const step = () => {
      for (const b of bodies) {
        if (b.drag) continue;
        b.vy += GRAVITY;
        b.vx *= 0.995;
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < 0) {
          b.x = 0;
          b.vx = -b.vx * RESTITUTION;
        } else if (b.x + b.w > W) {
          b.x = W - b.w;
          b.vx = -b.vx * RESTITUTION;
        }
        if (b.y + b.h > H) {
          b.y = H - b.h;
          b.vy = -b.vy * RESTITUTION;
          if (Math.abs(b.vy) < 2) b.vy = 0;
          b.vx *= 0.9;
        }
      }
      collide();
      collide();
      for (const b of bodies) {
        if (b.x < 0) b.x = 0;
        if (b.x + b.w > W) b.x = W - b.w;
        if (b.y + b.h > H) b.y = H - b.h;
        if (!b.drag && Math.abs(b.vx) < 0.05) b.vx = 0;
      }
    };

    const loop = () => {
      if (!running) return;
      step();
      render();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      running = entry.isIntersecting;
      if (running) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    });
    io.observe(arena);

    const ro = new ResizeObserver(() => {
      W = arena.clientWidth;
      H = arena.clientHeight;
    });
    ro.observe(arena);

    const cleanups: Array<() => void> = [];
    bodies.forEach((b) => {
      const down = (e: PointerEvent) => {
        const rect = arena.getBoundingClientRect();
        b.drag = true;
        b.moved = 0;
        b.vx = 0;
        b.vy = 0;
        b.tvx = 0;
        b.tvy = 0;
        b.ox = e.clientX - rect.left - b.x;
        b.oy = e.clientY - rect.top - b.y;
        b.lastX = e.clientX;
        b.lastY = e.clientY;
        suppressClick.current = false;
        b.el.setPointerCapture(e.pointerId);
        b.el.dataset.drag = "true";
      };
      const move = (e: PointerEvent) => {
        if (!b.drag) return;
        const rect = arena.getBoundingClientRect();
        const dx = e.clientX - b.lastX;
        const dy = e.clientY - b.lastY;
        b.lastX = e.clientX;
        b.lastY = e.clientY;
        b.moved += Math.abs(dx) + Math.abs(dy);
        b.tvx = b.tvx * 0.5 + dx * 0.5;
        b.tvy = b.tvy * 0.5 + dy * 0.5;
        b.x = Math.max(0, Math.min(W - b.w, e.clientX - rect.left - b.ox));
        b.y = Math.max(-b.h, Math.min(H - b.h, e.clientY - rect.top - b.oy));
        render();
      };
      const up = () => {
        if (!b.drag) return;
        b.drag = false;
        b.el.dataset.drag = "false";
        b.vx = Math.max(-30, Math.min(30, b.tvx * 1.4));
        b.vy = Math.max(-30, Math.min(30, b.tvy * 1.4));
        if (b.moved >= 6) suppressClick.current = true;
      };
      b.el.addEventListener("pointerdown", down);
      b.el.addEventListener("pointermove", move);
      b.el.addEventListener("pointerup", up);
      b.el.addEventListener("pointercancel", up);
      cleanups.push(() => {
        b.el.removeEventListener("pointerdown", down);
        b.el.removeEventListener("pointermove", move);
        b.el.removeEventListener("pointerup", up);
        b.el.removeEventListener("pointercancel", up);
        b.el.style.transform = "";
        delete b.el.dataset.drag;
      });
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [live, items]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const open = (p: Project) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    setSelected(p);
  };

  return (
    <>
      <p className="mt-3 hidden text-sm text-fg-soft min-[900px]:[@media(hover:hover)]:block">{labels.hint}</p>
      <div
        ref={arenaRef}
        data-live={live ? "true" : "false"}
        className="arena mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 data-[live=true]:block"
      >
        {items.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            type="button"
            className="pcard"
            data-hot
            onClick={() => open(p)}
          >
            <span className="text-xs font-medium tracking-wide text-turquoise uppercase">{p.kind}</span>
            <span className="mt-1 block font-display text-lg leading-snug font-semibold">{p.name}</span>
            <span className="mt-2 line-clamp-3 block text-sm text-fg-soft">{p.summary}</span>
            <span className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 3).map((s) => (
                <span key={s} className="rounded-full bg-white/8 px-2 py-0.5 text-[0.7rem] text-fg-soft">
                  {s}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-bg-2/95 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <i className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <i className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <i className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 min-w-0 flex-1 truncate rounded-full bg-white/10 px-3 py-1 text-xs text-fg-soft">
                {selected.demo ? selected.demo.replace("https://", "") : selected.github.replace("https://", "")}
              </span>
              <button
                type="button"
                autoFocus
                onClick={() => setSelected(null)}
                className="rounded-full px-3 py-1 text-xs text-fg-soft hover:text-white"
              >
                {labels.close} ✕
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-medium tracking-wide text-turquoise uppercase">{selected.kind}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{selected.name}</h3>
              <p className="mt-3 text-fg-soft">{selected.summary}</p>
              <p className="mt-4 flex flex-wrap gap-2">
                {selected.stack.map((s) => (
                  <span key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs text-fg-soft">
                    {s}
                  </span>
                ))}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {selected.demo ? (
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-cobalt px-5 py-3 text-sm font-semibold text-white hover:bg-cobalt-deep"
                  >
                    {labels.demo} ↗
                  </a>
                ) : null}
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold hover:border-saffron hover:text-saffron"
                >
                  {labels.code} ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
