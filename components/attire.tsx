"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/content/wedding";
import { Barong, Gown, Midi, Suit } from "./outfits";
import { Reveal, silk } from "./reveal";
import { SectionHeading } from "./section-heading";

const looks = [
  { key: "barong", label: "Barong Tagalog", note: "Piña or jusi, embroidered in your colour", Figure: Barong, group: "Gentlemen" },
  { key: "suit", label: "Light Suit", note: "Linen or wool, tie optional", Figure: Suit, group: "Gentlemen" },
  { key: "gown", label: "Formal Gown", note: "Floor-length, flowing fabrics", Figure: Gown, group: "Ladies" },
  { key: "midi", label: "Midi Dress", note: "Florals welcome, block heels for grass", Figure: Midi, group: "Ladies" },
] as const;

export function Attire() {
  const d = wedding.dressCode;
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const color = d.palette[active].hex;

  // Gently cycle through the palette until a guest picks one themselves.
  useEffect(() => {
    if (touched || !inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % d.palette.length), 2600);
    return () => clearInterval(id);
  }, [touched, inView, d.palette.length]);

  return (
    <section id="attire" className="relative overflow-hidden bg-paper-deep/70 px-5 py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[90vh] w-[90vh] -translate-x-1/2 rounded-full opacity-40 blur-3xl transition-colors duration-1000"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 65%)` }}
      />
      <SectionHeading eyebrow="Attire" title={d.title} intro={d.description} />

      <div ref={ref} className="relative mx-auto mt-14 max-w-6xl">
        {/* palette picker */}
        <Reveal className="flex flex-col items-center">
          <p className="eyebrow !text-[0.6rem]">Tap a colour to dress them up</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:gap-3" role="radiogroup" aria-label="Palette colour">
            {d.palette.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.name}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => {
                    setTouched(true);
                    setActive(i);
                  }}
                  className="relative flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-left"
                >
                  {on && (
                    <motion.span
                      layoutId="palette-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_8px_24px_-10px_rgba(62,31,44,0.35)]"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <motion.span
                    className="relative block h-8 w-8 rounded-full ring-1 ring-black/5"
                    style={{
                      background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55), transparent 55%), ${c.hex}`,
                    }}
                    animate={{ scale: on ? 1.08 : 1 }}
                  />
                  <span className={`relative font-display text-base italic ${on ? "text-ink" : "text-ink-soft"}`}>{c.name}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* the runway */}
        <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {looks.map((look, i) => (
            <motion.figure
              key={look.key}
              className="group flex flex-col items-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, delay: i * 0.12, ease: silk }}
            >
              <p className="eyebrow mb-3 !text-[0.55rem] text-rose">{look.group}</p>
              <div className="relative w-full overflow-hidden rounded-t-[999px] bg-gradient-to-b from-white/90 to-blush/60 px-0 pt-6 shadow-[inset_0_0_0_1px_rgba(185,138,88,0.25)]">
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-paper-deep to-transparent" />
                <motion.div
                  animate={{ rotate: [-1.2, 1.2, -1.2] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "50% 95%" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <look.Figure color={color} className="relative mx-auto h-72 w-auto drop-shadow-[0_12px_18px_rgba(62,31,44,0.18)] sm:h-[26rem]" />
                </motion.div>
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-display text-[1.45rem] leading-tight text-ink sm:text-[1.6rem]">{look.label}</p>
                <p className="mt-1 font-display text-[0.98rem] text-ink-soft italic sm:text-base">{look.note}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-[1fr_1fr_0.9fr]">
          {[
            { label: "For the gentlemen", text: d.gentlemen },
            { label: "For the ladies", text: d.ladies },
          ].map((x, i) => (
            <Reveal key={x.label} delay={i * 0.12} className="rounded-[1.5rem] bg-card p-8 text-center shadow-[0_20px_50px_-35px_rgba(62,31,44,0.5)]">
              <p className="eyebrow">{x.label}</p>
              <p className="mt-4 font-display text-[1.25rem] leading-relaxed text-ink">{x.text}</p>
            </Reveal>
          ))}
          <Reveal delay={0.24} className="relative flex items-center gap-4 overflow-hidden rounded-[1.5rem] bg-ink p-6 text-white">
            <div className="relative h-32 w-20 shrink-0">
              <Gown color="#fbf6ee" veil className="h-full w-full" />
              <svg viewBox="0 0 80 128" className="absolute inset-0 h-full w-full" aria-hidden>
                <motion.line
                  x1="8" y1="8" x2="72" y2="120"
                  stroke="#cf6f8c" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </svg>
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.3em] text-blush uppercase">Reserved for the bride</p>
              <p className="mt-2 font-display text-[1.15rem] leading-snug text-white/90 italic">{d.avoid}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
