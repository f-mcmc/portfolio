"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface SceneProps {
  src: string;
  alt: string;
  title: string;
  text: string;
  align?: "left" | "right";
  children?: ReactNode;
}

/** Full-screen photo that slowly pushes in while the visitor scrolls past it. */
export function Scene({ src, alt, title, text, align = "left", children }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "0.5");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
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
    <div ref={ref} className="scene">
      <div className="scene-stick">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="scene-img" loading="lazy" decoding="async" />
        <div className="scene-shade" data-align={align} />
        <div className="scene-copy" data-align={align}>
          <h2 className="font-display text-3xl leading-[1.1] font-bold tracking-[-0.02em] text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/80 sm:text-xl">{text}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
