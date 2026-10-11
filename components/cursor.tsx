"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type Spark = { id: number; x: number; y: number };

/** A soft rose cursor ring that swells over links, and little hearts on click. Desktop only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    setEnabled(fine.matches);
    if (!fine.matches) return;

    let id = 0;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(Boolean(t?.closest("a, button, label, [role=tab], [role=radio]")));
    };
    const press = (e: PointerEvent) => {
      setDown(true);
      const spark = { id: id++, x: e.clientX, y: e.clientY };
      setSparks((s) => [...s.slice(-6), spark]);
      setTimeout(() => setSparks((s) => s.filter((p) => p.id !== spark.id)), 900);
    };
    const release = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
      <motion.div className="absolute top-0 left-0" style={{ x: rx, y: ry }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="rounded-full border border-rose mix-blend-multiply"
            animate={{
              width: hover ? 56 : 30,
              height: hover ? 56 : 30,
              backgroundColor: hover ? "rgba(207,111,140,0.18)" : "rgba(207,111,140,0)",
              scale: down ? 0.8 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          />
        </div>
      </motion.div>
      <motion.div className="absolute top-0 left-0 -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-berry" style={{ x, y }} />
      <AnimatePresence>
        {sparks.map((s) =>
          [0, 1, 2, 3, 4].map((k) => (
            <motion.span
              key={`${s.id}-${k}`}
              className="absolute -mt-2 -ml-1.5 text-[11px] text-rose"
              style={{ left: s.x, top: s.y }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
              animate={{ x: Math.cos((k / 5) * Math.PI * 2) * 34, y: Math.sin((k / 5) * Math.PI * 2) * 34 - 10, opacity: 0, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              ♥
            </motion.span>
          )),
        )}
      </AnimatePresence>
    </div>
  );
}
