"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { wedding } from "@/content/wedding";
import { silk } from "./reveal";
import { SectionHeading } from "./section-heading";

const items = wedding.schedule;

/** Afternoon → golden hour → night: the sky follows the timeline as you scroll. */
function SkyDial({ progress, active }: { progress: ReturnType<typeof useSpring>; active: number }) {
  const top = useTransform(progress, [0, 0.45, 0.7, 1], ["#fbd3dc", "#f6a99a", "#a24e72", "#2f1520"]);
  const bottom = useTransform(progress, [0, 0.45, 0.7, 1], ["#fff1ea", "#fbd7b4", "#e7909f", "#5a2a44"]);
  const angle = useTransform(progress, [0, 0.72], [Math.PI * 0.95, Math.PI * 0.02]);
  const sunX = useTransform(angle, (a) => 150 + 118 * Math.cos(a));
  const sunY = useTransform(angle, (a) => 168 - 118 * Math.sin(a));
  const sunOpacity = useTransform(progress, [0.62, 0.74], [1, 0]);
  const moonOpacity = useTransform(progress, [0.7, 0.82], [0, 1]);
  const moonY = useTransform(progress, [0.7, 1], [130, 60]);
  const stars = useTransform(progress, [0.68, 0.9], [0, 1]);
  const background = useTransform([top, bottom], ([t, b]) => `linear-gradient(180deg, ${t} 0%, ${b} 100%)`);

  return (
    <motion.div
      className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(62,31,44,0.55)]"
      style={{ background }}
    >
      <svg viewBox="0 0 300 200" className="block h-40 w-full sm:h-auto" preserveAspectRatio="xMidYMax slice" aria-hidden>
        <motion.g style={{ opacity: stars }} fill="#fff">
          {[
            [30, 30], [70, 50], [110, 20], [160, 40], [210, 22], [250, 48], [280, 18], [190, 70], [50, 80], [130, 66],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={i % 3 ? 0.9 : 1.4}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.g>
        <path d="M32 168 A118 118 0 0 1 268 168" fill="none" stroke="#fff" strokeOpacity="0.5" strokeDasharray="2 5" />
        <motion.circle cx={sunX} cy={sunY} r="15" fill="#fff6e0" style={{ opacity: sunOpacity }} />
        <motion.circle cx={sunX} cy={sunY} r="26" fill="#ffd9a8" style={{ opacity: sunOpacity }} opacity="0.35" />
        <motion.g style={{ opacity: moonOpacity, y: moonY }}>
          <circle cx="220" cy="0" r="12" fill="#fff4f6" />
          <circle cx="226" cy="-4" r="11" fill="#5a2a44" opacity="0.9" />
        </motion.g>
        {/* Taal-ish hills and the lake */}
        <path d="M0 172 Q50 140 100 160 T200 150 T300 162 V200 H0Z" fill="#3e1f2c" opacity="0.35" />
        <path d="M0 182 Q70 160 140 176 T300 172 V200 H0Z" fill="#3e1f2c" opacity="0.55" />
        <path d="M120 190 Q150 184 190 190" stroke="#fff" strokeOpacity="0.4" strokeWidth="1" fill="none" />
      </svg>
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-white sm:p-7">
        <div>
          <p className="text-[0.55rem] tracking-[0.35em] uppercase opacity-80">Now</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              className="font-display text-3xl [text-shadow:0_2px_12px_rgba(62,31,44,0.35)] sm:text-5xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: silk }}
            >
              {items[active].time}
            </motion.p>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            className="max-w-[55%] text-right font-script text-2xl leading-tight [text-shadow:0_2px_12px_rgba(62,31,44,0.35)] sm:text-4xl"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.5, ease: silk }}
          >
            {items[active].title}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Schedule() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length)))),
  );

  return (
    <section id="schedule" className="relative px-5 py-24 sm:py-36">
      <SectionHeading
        eyebrow="The Day"
        title="From sunlight to starlight"
        intro={`${wedding.couple.partnerTwo} planned it down to the minute (of course). Here’s the guest-friendly version — watch the sky change as you scroll.`}
      />

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="sticky top-16 z-10 h-fit lg:top-28">
          <SkyDial progress={progress} active={active} />
        </div>

        <ol ref={listRef} className="relative">
          {items.map((item, i) => {
            const on = i === active;
            const past = i < active;
            return (
              <motion.li
                key={item.time}
                className="relative grid grid-cols-[4.6rem_1fr] gap-4 py-7 sm:grid-cols-[6.5rem_1fr] sm:gap-8"
                animate={{ opacity: on ? 1 : past ? 0.55 : 0.4, x: on ? 6 : 0 }}
                transition={{ duration: 0.6, ease: silk }}
              >
                <span className={`pt-1 text-right font-display text-lg tabular-nums sm:text-xl ${on ? "text-berry" : "text-ink-soft"}`}>
                  {item.time}
                </span>
                <div className="relative border-l border-blush pl-5 sm:pl-8">
                  <motion.span
                    className="absolute top-2.5 -left-[7px] h-3 w-3 rounded-full border-2 border-paper"
                    animate={{ backgroundColor: on || past ? "#cf6f8c" : "#f6d3da", scale: on ? 1.5 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <p className="font-display text-[1.6rem] leading-tight text-ink sm:text-[2rem]">{item.title}</p>
                  <p className="mt-1 font-display text-[1.08rem] text-ink-soft italic sm:text-lg">{item.detail}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
