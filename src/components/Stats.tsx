"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  label: string;
}

export function Stats({ items }: { items: readonly Stat[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [k, setK] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setK(1);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry || !entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          setK(1 - Math.pow(1 - t, 3));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ul ref={ref} className="grid grid-cols-3 gap-4 text-center">
      {items.map((s) => (
        <li key={s.label}>
          <p className="font-display text-4xl font-bold text-saffron sm:text-6xl">{Math.round(s.value * k)}</p>
          <p className="mt-1 text-sm text-fg-soft sm:text-base">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}
