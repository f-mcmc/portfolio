"use client";

import { useEffect, useRef } from "react";

export function Mission({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>(".mission-word"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.dataset.on = "true"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block enters at 85% of the viewport, 1 when it reaches 35%
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.5)));
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => (s.dataset.on = i < lit ? "true" : "false"));
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
  }, [text]);

  return (
    <p
      ref={ref}
      className="font-display text-2xl leading-[1.25] font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl"
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="mission-word" data-on="false">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
