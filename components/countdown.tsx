"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { wedding } from "@/content/wedding";

const target = new Date(wedding.date.ceremonyStart).getTime();

function remaining(now: number) {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: diff === 0,
  };
}

function Unit({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? "––" : String(value).padStart(2, "0");
  return (
    <div className="relative flex min-w-[4.1rem] flex-col items-center overflow-hidden rounded-2xl border border-white/25 bg-white/10 px-2 pt-2 pb-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md sm:min-w-[5.6rem] sm:px-4 sm:pt-3 sm:pb-3">
      <div className="relative h-[2.4rem] overflow-hidden sm:h-[3.3rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block font-display text-[2rem] leading-[1.2] font-light text-white tabular-nums sm:text-[2.8rem]"
            initial={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-0.5 text-[0.52rem] tracking-[0.26em] text-white/75 uppercase sm:text-[0.58rem]">{label}</span>
    </div>
  );
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const r = now === null ? null : remaining(now);

  if (r?.done) return <p className="font-script text-5xl text-white">Today is the day!</p>;

  return (
    <div className="flex items-start justify-center gap-2 sm:gap-3" role="timer" aria-label="Countdown to the wedding">
      <Unit value={r?.days ?? null} label="Days" />
      <Unit value={r?.hours ?? null} label="Hours" />
      <Unit value={r?.minutes ?? null} label="Mins" />
      <Unit value={r?.seconds ?? null} label="Secs" />
    </div>
  );
}
