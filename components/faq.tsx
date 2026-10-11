"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { wedding } from "@/content/wedding";
import { Reveal, silk } from "./reveal";
import { SectionHeading } from "./section-heading";

function Item({ q, a, open, onToggle, index }: { q: string; a: string; open: boolean; onToggle: () => void; index: number }) {
  const id = useId();
  return (
    <motion.div
      layout
      className={`overflow-hidden rounded-[1.5rem] transition-colors duration-500 ${open ? "bg-card shadow-[0_20px_50px_-35px_rgba(62,31,44,0.5)]" : "bg-white/40"}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: silk }}
    >
      <h3>
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id} className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7">
          <span className="font-display text-sm text-rose tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex-1 font-display text-[1.3rem] leading-snug text-ink sm:text-[1.45rem]">{q}</span>
          <motion.span
            className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full"
            animate={{ backgroundColor: open ? "#9b3a5c" : "rgba(0,0,0,0)", rotate: open ? 180 : 0 }}
            transition={{ duration: 0.5, ease: silk }}
            aria-hidden
          >
            <span className={`absolute h-px w-3.5 ${open ? "bg-white" : "bg-ink"}`} />
            <motion.span className={`absolute h-px w-3.5 ${open ? "bg-white" : "bg-ink"}`} animate={{ rotate: open ? 0 : 90 }} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: silk }}
          >
            <p className="px-5 pb-6 pl-[3.25rem] font-display text-[1.12rem] leading-relaxed text-ink-soft sm:px-7 sm:pl-[4rem]">
              {a}
              {q.includes("photos") && <span className="ml-1 font-script text-2xl text-berry">{wedding.couple.hashtag}</span>}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<string | null>(wedding.faq[0].q);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = wedding.faq.filter((f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));

  return (
    <section id="faq" className="relative px-5 py-24 sm:py-36">
      <SectionHeading eyebrow="Good to know" title="Questions & answers" />

      <Reveal className="mx-auto mt-12 max-w-3xl">
        <label className="relative block">
          <span className="sr-only">Search questions</span>
          <svg viewBox="0 0 24 24" className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-ink-faint" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="11" cy="11" r="6.5" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — kids, parking, rain…"
            className="w-full rounded-full border border-blush bg-white/70 py-4 pr-5 pl-13 font-display text-lg text-ink placeholder:text-ink-faint focus:border-rose focus:outline-none"
          />
        </label>
      </Reveal>

      <motion.div layout className="mx-auto mt-6 max-w-3xl space-y-3">
        <AnimatePresence mode="popLayout">
          {list.map((f) => (
            <Item
              key={f.q}
              q={f.q}
              a={f.a}
              index={wedding.faq.indexOf(f)}
              open={open === f.q}
              onToggle={() => setOpen(open === f.q ? null : f.q)}
            />
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <p className="py-10 text-center font-display text-xl text-ink-soft italic">
            No answer for that yet — message our coordinator and we’ll help!
          </p>
        )}
      </motion.div>
    </section>
  );
}
