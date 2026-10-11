"use client";

import { motion } from "motion/react";
import { wedding } from "@/content/wedding";

const draw = (delay = 0, duration = 2) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] as const },
      opacity: { delay, duration: 0.3 },
    },
  },
});

/** A pair of leafy sprigs meeting at a small bud — the site's signature divider. */
export function Divider({ className = "", tone = "var(--color-gold)" }: { className?: string; tone?: string }) {
  const leaves = [
    "M74 30 q-6 -10 -16 -10 q5 9 16 10z",
    "M58 31 q-5 9 -15 10 q4 -9 15 -10z",
    "M44 29 q-7 -9 -15 -8 q5 8 15 8z",
    "M126 30 q6 -10 16 -10 q-5 9 -16 10z",
    "M142 31 q5 9 15 10 q-4 -9 -15 -10z",
    "M156 29 q7 -9 15 -8 q-5 8 -15 8z",
  ];
  return (
    <motion.svg
      viewBox="0 0 200 60"
      className={`h-10 w-40 ${className}`}
      fill="none"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      aria-hidden
    >
      <motion.path d="M88 30 C70 30 40 32 14 26" stroke={tone} strokeWidth="0.9" strokeLinecap="round" variants={draw(0, 1.6)} />
      <motion.path d="M112 30 C130 30 160 32 186 26" stroke={tone} strokeWidth="0.9" strokeLinecap="round" variants={draw(0, 1.6)} />
      {leaves.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke={tone}
          strokeWidth="0.8"
          fill={tone}
          fillOpacity={0.12}
          variants={draw(0.5 + (i % 3) * 0.18, 1)}
        />
      ))}
      <motion.path
        d="M100 21 C105 26 105 34 100 39 C95 34 95 26 100 21z"
        stroke={tone}
        strokeWidth="0.9"
        fill={tone}
        fillOpacity={0.2}
        variants={draw(0.9, 0.9)}
      />
      <motion.circle cx="100" cy="30" r="12" stroke={tone} strokeWidth="0.5" variants={draw(1.1, 1.2)} />
    </motion.svg>
  );
}

/** Circular monogram that draws itself in. Pass `play` to control it, or it plays on scroll. */
export function Monogram({ size = 96, play }: { size?: number; play?: boolean }) {
  const [a, b] = wedding.couple.monogram;
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true } }
      : { animate: play ? "show" : "hidden" };
  return (
    <motion.svg width={size} height={size} viewBox="0 0 100 100" fill="none" initial="hidden" {...trigger} aria-hidden>
      <motion.circle cx="50" cy="50" r="46" stroke="var(--color-gold)" strokeWidth="0.8" variants={draw(0.1, 1.8)} />
      <motion.circle
        cx="50"
        cy="50"
        r="41"
        stroke="var(--color-gold)"
        strokeWidth="0.4"
        strokeDasharray="1 3"
        variants={draw(0.4, 1.8)}
      />
      <motion.text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontStyle="italic"
        fontSize="26"
        fill="var(--color-ink)"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.9, duration: 1.2 } } }}
      >
        {a}
        <tspan fill="var(--color-gold)" fontSize="18" dx="2" dy="-2">
          &amp;
        </tspan>
        <tspan dx="2" dy="2">
          {b}
        </tspan>
      </motion.text>
    </motion.svg>
  );
}

/** A tall botanical branch used at the edges of sections. */
export function Branch({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const leaves = [
    "M51 38 q-15 -6 -23 -19 q15 2 23 19z",
    "M51 68 q14 -9 25 -7 q-10 11 -25 7z",
    "M50 100 q-16 -4 -24 -17 q16 0 24 17z",
    "M52 132 q14 -10 26 -8 q-10 12 -26 8z",
    "M49 165 q-15 -4 -23 -17 q15 1 23 17z",
    "M51 198 q13 -9 24 -7 q-10 11 -24 7z",
  ];
  return (
    <motion.svg
      viewBox="0 0 100 240"
      className={className}
      style={flip ? { scaleX: -1 } : undefined}
      fill="none"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      aria-hidden
    >
      <motion.path
        d="M50 236 C46 180 56 120 50 70 C46 40 48 20 52 4"
        stroke="var(--color-rose-soft)"
        strokeWidth="1"
        strokeLinecap="round"
        variants={draw(0, 2.2)}
      />
      {leaves.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="var(--color-rose-soft)"
          strokeWidth="0.8"
          fill="var(--color-rose-soft)"
          fillOpacity={0.14}
          variants={draw(0.6 + (leaves.length - i) * 0.15, 1.1)}
        />
      ))}
    </motion.svg>
  );
}
