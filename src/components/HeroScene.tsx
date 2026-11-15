"use client";

import { useEffect, useRef } from "react";

interface HeroSceneProps {
  eyebrow: string;
  scroll: string;
  title: string;
  lead: string;
  cta: string;
  secondary: string;
  telegramUrl: string;
  chips: readonly string[];
}

const CHIP_POS = [
  { left: "6%", top: "24%", dx: "-60px" },
  { left: "68%", top: "18%", dx: "60px" },
  { left: "4%", top: "62%", dx: "-60px" },
  { left: "72%", top: "64%", dx: "60px" },
  { left: "40%", top: "10%", dx: "0px" },
] as const;

export function HeroScene({ eyebrow, scroll, title, lead, cta, secondary, telegramUrl, chips }: HeroSceneProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      el.dataset.static = "true";
      el.dataset.live = "true";
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      el.style.setProperty("--p", p.toFixed(4));
      el.dataset.live = p > 0.82 ? "true" : "false";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-scene" data-live="false" id="top">
      <noscript>
        <style>{`.hero-scene{--p:1!important;height:100svh!important}.hero-copy{pointer-events:auto!important}.hero-scene .hero-copy a{visibility:visible!important}`}</style>
      </noscript>
      <div className="hero-stick">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/scenes/desk.webp" alt="" className="hero-photo" aria-hidden="true" />
        <div className="hero-glow" />
        <div className="hero-grid" />

        <div className="laptop" aria-hidden="true">
          <div className="laptop-screen">
            {/* Browser chrome */}
            <div className="ui" style={{ "--s": 0.0, inset: "0 0 auto 0" } as React.CSSProperties}>
              <div className="flex h-[9%] min-h-5 items-center gap-1.5 bg-[#142046] px-3 py-2">
                <i className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <i className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <i className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-3 h-2.5 w-1/3 rounded-full bg-white/10" />
              </div>
            </div>
            {/* Nav */}
            <div className="ui flex items-center justify-between" style={{ "--s": 0.04, inset: "14% 6% auto 6%" } as React.CSSProperties}>
              <span className="h-3 w-[16%] rounded bg-saffron" />
              <span className="flex gap-3">
                <i className="h-2 w-8 rounded-full bg-white/25" />
                <i className="h-2 w-8 rounded-full bg-white/25" />
                <i className="h-2 w-8 rounded-full bg-white/25" />
              </span>
            </div>
            {/* Headline */}
            <div className="ui" style={{ "--s": 0.09, inset: "30% auto auto 6%", width: "52%" } as React.CSSProperties}>
              <span className="block h-5 w-full rounded bg-white" />
            </div>
            <div className="ui" style={{ "--s": 0.14, inset: "42% auto auto 6%", width: "40%" } as React.CSSProperties}>
              <span className="block h-5 w-full rounded bg-white" />
            </div>
            {/* Lead */}
            <div className="ui space-y-2" style={{ "--s": 0.2, inset: "56% auto auto 6%", width: "46%" } as React.CSSProperties}>
              <span className="block h-2 w-full rounded-full bg-white/30" />
              <span className="block h-2 w-4/5 rounded-full bg-white/30" />
            </div>
            {/* Buttons */}
            <div className="ui flex gap-3" style={{ "--s": 0.26, inset: "72% auto auto 6%" } as React.CSSProperties}>
              <span className="block h-6 w-24 rounded-full bg-cobalt" />
              <span className="block h-6 w-16 rounded-full border border-white/30" />
            </div>
            {/* Image card */}
            <div
              className="ui rounded-xl bg-gradient-to-br from-cobalt via-turquoise/70 to-saffron/70"
              style={{ "--s": 0.31, inset: "28% 6% 14% auto", width: "30%" } as React.CSSProperties}
            />
          </div>
          <div className="laptop-base" />
        </div>


        {chips.map((label, i) => {
          const pos = CHIP_POS[i % CHIP_POS.length]!;
          return (
            <span
              key={label}
              aria-hidden="true"
              className="chip"
              style={{ left: pos.left, top: pos.top, "--c": 0.12 + i * 0.05, "--dx": pos.dx } as React.CSSProperties}
            >
              {label}
            </span>
          );
        })}

        <div className="hero-intro">
          <p className="font-display text-sm tracking-[0.2em] text-fg-soft uppercase">{eyebrow}</p>
          <p className="mt-3 text-sm text-fg-soft">{scroll} ↓</p>
        </div>

        <div className="hero-copy">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-display text-xs tracking-[0.22em] text-turquoise uppercase sm:text-sm">{eyebrow}</p>
            <h1 className="mt-5 font-display text-[2.2rem] leading-[1.04] font-bold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.6rem]">
              {title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-fg-soft sm:text-xl">{lead}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={telegramUrl}
                className="inline-flex items-center gap-2.5 rounded-full bg-cobalt px-7 py-4 font-semibold text-white transition-colors hover:bg-cobalt-deep"
              >
                <TelegramIcon />
                {cta}
              </a>
              <a href="#services" className="px-3 py-3 font-semibold text-saffron underline-offset-4 hover:underline">
                {secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
      <path d="M21.9 4.3c.3-1.3-.5-1.8-1.4-1.5L2.8 9.6c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 1.7 5.3c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-12.4ZM8.6 12.1l9.7-6.1c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.5-1.7-5Z" />
    </svg>
  );
}
