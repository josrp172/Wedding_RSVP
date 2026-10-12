"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { wedding } from "@/content/wedding";
import { mapsUrl } from "@/lib/calendar";
import { Reveal, silk } from "./reveal";
import { SectionHeading } from "./section-heading";
import { Snapshot } from "./snapshot";

const tipIcons = [
  <path key="car" d="M5 16h14M6 16l1.5-5h9L18 16M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  <path key="bus" d="M6 4h12v12H6zM6 10h12M8 19v-3M16 19v-3M8.5 13.5h.01M15.5 13.5h.01" />,
  <path key="p" d="M5 4h14v16H5zM10 16V8h3a2.5 2.5 0 0 1 0 5h-3" />,
  <path key="w" d="M7 17h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.5 1.5A3.3 3.3 0 0 0 7 17zM9 20l-1 2M13 20l-1 2" />,
];

const packing = [
  "A light shawl or jacket",
  "Comfortable shoes for grass",
  "A pamaypay (hand fan)",
  "Tissues — trust us",
  "Your dancing energy",
  "Cash for the money dance",
];

function Checklist() {
  const [done, setDone] = useState<boolean[]>(() => packing.map(() => false));

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("packing") ?? "null");
      if (Array.isArray(saved) && saved.length === packing.length) setDone(saved);
    } catch {}
  }, []);

  const toggle = (i: number) =>
    setDone((d) => {
      const next = d.map((v, j) => (j === i ? !v : v));
      try {
        localStorage.setItem("packing", JSON.stringify(next));
      } catch {}
      return next;
    });

  const count = done.filter(Boolean).length;

  return (
    <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-9">
      <div className="flex items-baseline justify-between">
        <p className="font-script text-4xl text-blush">Don’t forget</p>
        <span className="text-[0.6rem] tracking-[0.25em] text-white/60 uppercase">
          {count}/{packing.length} packed
        </span>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full bg-gradient-to-r from-rose to-gold-soft" animate={{ width: `${(count / packing.length) * 100}%` }} />
      </div>
      <ul className="mt-6 space-y-1">
        {packing.map((item, i) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-4 rounded-xl px-2 py-2.5 text-left hover:bg-white/5"
              aria-pressed={done[i]}
            >
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${done[i] ? "border-rose bg-rose" : "border-white/30"}`}>
                <AnimatePresence>
                  {done[i] && (
                    <motion.svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="#fff" strokeWidth="3" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35 }} />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </span>
              <span className={`font-display text-[1.15rem] transition-all ${done[i] ? "text-white/45 line-through decoration-rose" : "text-white"}`}>{item}</span>
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {count === packing.length && (
          <motion.p className="mt-4 text-center font-script text-3xl text-gold-soft" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            You’re all set — see you there!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function GiftEnvelope() {
  const [open, setOpen] = useState(false);
  const g = wedding.gifts;
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <p className="eyebrow">Gifts</p>
        <p className="mt-5 font-display text-[1.9rem] leading-snug text-ink italic sm:text-[2.4rem]">{g.lead}</p>
      </Reveal>

      <div className="relative mx-auto mt-24 w-[min(88vw,380px)] [perspective:1200px]">
        <button type="button" onClick={() => setOpen((v) => !v)} className="relative block aspect-[3/2] w-full" aria-expanded={open} aria-label="Open the gift note">
          <span className="absolute inset-0 rounded-lg bg-[#efc6cf] shadow-[0_30px_50px_-25px_rgba(110,40,65,0.5)]" />
          <motion.span
            className="absolute inset-x-[6%] top-[8%] bottom-[6%] z-[2] flex flex-col justify-start rounded bg-card p-4 shadow"
            animate={{ y: open ? "-58%" : "0%" }}
            transition={{ duration: 0.9, delay: open ? 0.4 : 0, ease: silk }}
          >
            <span className="block text-center font-script text-3xl text-berry">With gratitude</span>
            <span className="mt-1 block text-center font-display text-[0.95rem] leading-snug text-ink-soft">
              Gift box at the reception · e-wallet details from our coordinator
            </span>
          </motion.span>
          <svg className="absolute inset-0 z-[3] h-full w-full" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden>
            <path d="M0 0 L150 110 L0 200Z" fill="#f4d3da" />
            <path d="M300 0 L150 110 L300 200Z" fill="#f2cdd5" />
            <path d="M0 200 L150 96 L300 200Z" fill="#f8dde2" />
          </svg>
          <motion.span
            className="absolute inset-x-0 top-0 h-[58%] origin-top"
            initial={false}
            animate={{ rotateX: open ? 180 : 0, zIndex: open ? 1 : 4 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <svg className="h-full w-full" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden>
              <path d="M0 0 L300 0 L150 120Z" fill="#ecbcc7" />
            </svg>
          </motion.span>
          <motion.span
            className="absolute top-[58%] left-1/2 z-[5] grid h-12 w-12 place-items-center rounded-full bg-berry text-lg text-white shadow-lg"
            style={{ x: "-50%", y: "-50%" }}
            animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
          >
            ♥
          </motion.span>
        </button>
        <p className="mt-4 text-[0.6rem] tracking-[0.3em] text-ink-faint uppercase">{open ? "Tap to close" : "Tap the envelope"}</p>
      </div>

      <Reveal delay={0.2}>
        <p className="mt-8 font-display text-[1.18rem] leading-relaxed text-ink-soft">{g.body}</p>
        <p className="mt-4 font-display text-[1.1rem] leading-relaxed text-ink-soft italic">{g.tradition}</p>
      </Reveal>
    </div>
  );
}

export function Travel() {
  const t = wedding.travel;

  return (
    <section id="travel" className="relative overflow-hidden bg-paper-deep/70 px-5 py-24 sm:py-36">
      <SectionHeading eyebrow="Travel & Stay" title="Finding your way" intro={t.intro} />

      {/* the couple's favourite getaways */}
      <div className="mt-14">
        <Reveal className="text-center">
          <p className="eyebrow !text-[0.6rem] text-rose">Our favourite getaways</p>
          <p className="mt-2 font-script text-4xl text-berry sm:text-5xl">We do love a good trip</p>
        </Reveal>
        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 pt-6 pb-10 [scrollbar-width:none] sm:justify-center sm:gap-7 [&::-webkit-scrollbar]:hidden">
          {t.getaways.map((g, i) => (
            <Snapshot
              key={g.src}
              src={g.src}
              caption={g.caption}
              tilt={[-4, 3, -2, 4, -3][i % 5]}
              delay={i * 0.08}
              className="w-48 shrink-0 snap-center sm:w-52"
              sizes="13rem"
            />
          ))}
        </div>
        <p className="text-center font-display text-lg text-ink-soft italic">Next stop: our wedding. Here’s how to get there →</p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.tips.map((tip, i) => (
          <motion.div
            key={tip.title}
            className="group relative overflow-hidden rounded-[1.75rem] bg-card p-7 shadow-[0_20px_50px_-35px_rgba(62,31,44,0.5)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.1, ease: silk }}
            whileHover={{ y: -6 }}
          >
            <span aria-hidden className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blush/60 transition-transform duration-700 group-hover:scale-150" />
            <svg viewBox="0 0 24 24" className="relative h-9 w-9 text-berry" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {tipIcons[i % tipIcons.length]}
            </svg>
            <h3 className="relative mt-5 font-display text-[1.6rem] text-ink">{tip.title}</h3>
            <p className="relative mt-2 font-display text-[1.08rem] leading-relaxed text-ink-soft">{tip.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="font-script text-5xl text-berry">Where to stay</p>
          <ul className="mt-6">
            {t.stays.map((s, i) => (
              <li key={s.name} className="border-b border-line first:border-t">
                <a href={mapsUrl(`${s.name} ${wedding.date.city}`)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-6">
                  <span className="font-display text-3xl text-rose-soft tabular-nums">0{i + 1}</span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.6rem] text-ink transition-colors group-hover:text-berry">{s.name}</span>
                    <span className="block font-display text-[1.05rem] text-ink-soft italic">{s.note}</span>
                    <span className="mt-1 block text-[0.58rem] tracking-[0.2em] text-ink-faint uppercase">{s.distance}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-berry group-hover:bg-berry group-hover:text-white">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <Checklist />
        </Reveal>
      </div>

      <div id="gifts" className="mt-28">
        <GiftEnvelope />
      </div>
    </section>
  );
}
