"use client";

import { useEffect, useState } from "react";

type Petal = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  spin: number;
  opacity: number;
  color: string;
};

const colors = ["#e7cdc4", "#efd9cf", "#dcc3b4", "#e9dcc4", "#d9b8ae"];

/** Soft petals drifting down. Generated on the client so server and client HTML match. */
export function Petals({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 640px)").matches;
    const n = small ? Math.round(count * 0.6) : count;
    setPetals(
      Array.from({ length: n }, () => ({
        left: Math.random() * 100,
        size: 8 + Math.random() * 10,
        duration: 14 + Math.random() * 12,
        delay: -Math.random() * 26,
        drift: (Math.random() - 0.3) * 160,
        spin: 180 + Math.random() * 360,
        opacity: 0.35 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.8,
              color: p.color,
              "--petal-duration": `${p.duration}s`,
              "--petal-delay": `${p.delay}s`,
              "--petal-drift": `${p.drift}px`,
              "--petal-spin": `${p.spin}deg`,
              "--petal-opacity": p.opacity,
            } as React.CSSProperties
          }
        >
          <i />
        </span>
      ))}
    </div>
  );
}
