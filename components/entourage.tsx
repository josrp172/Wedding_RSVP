"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { wedding } from "@/content/wedding";
import { Reveal, silk } from "./reveal";
import { SectionHeading } from "./section-heading";

const e = wedding.entourage;

const initials = (name: string) =>
  name
    .replace(/^(Mr\.|Mrs\.|Dr\.|Atty\.|Ms\.)\s*/i, "")
    .split(/[\s·]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

function Person({ name, i }: { name: string; i: number }) {
  return (
    <motion.li
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.04, ease: silk }}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blush to-rose-soft font-display text-sm text-berry italic">
        {initials(name)}
      </span>
      <span className="font-display text-[1.15rem] text-ink">{name}</span>
    </motion.li>
  );
}

function Card({ role, names, offset = 0 }: { role: string; names: readonly string[]; offset?: number }) {
  return (
    <div className="rounded-[1.5rem] bg-card p-6 shadow-[0_20px_50px_-35px_rgba(62,31,44,0.5)] sm:p-7">
      <p className="eyebrow !text-[0.6rem] text-rose">{role}</p>
      <ul className="mt-4 space-y-3">
        {names.map((n, i) => (
          <Person key={n} name={n} i={i + offset} />
        ))}
      </ul>
    </div>
  );
}

const tabs = [
  {
    key: "family",
    label: "Family",
    render: () => (
      <div className="grid gap-5 md:grid-cols-2">
        {e.parents.map((g, i) => (
          <Card key={g.role} {...g} offset={i * 2} />
        ))}
        {e.honor.map((g, i) => (
          <Card key={g.role} {...g} offset={4 + i} />
        ))}
      </div>
    ),
  },
  {
    key: "sponsors",
    label: "Sponsors",
    render: () => (
      <div className="space-y-5">
        <div className="rounded-[1.5rem] bg-card p-6 shadow-[0_20px_50px_-35px_rgba(62,31,44,0.5)] sm:p-8">
          <p className="text-center font-script text-4xl text-berry">Principal Sponsors</p>
          <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {e.principalSponsors.map(([a, b], i) => (
              <motion.li
                key={a}
                className="flex items-center justify-center gap-2 text-center font-display text-[1.12rem] text-ink"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
              >
                {a} <span className="text-rose">&amp;</span> {b}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {e.secondarySponsors.map((g, i) => (
            <Card key={g.role} {...g} offset={i * 2} />
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "party",
    label: "Bridal Party",
    render: () => (
      <div className="grid gap-5 md:grid-cols-2">
        {e.party.map((g, i) => (
          <Card key={g.role} {...g} offset={i * 2} />
        ))}
      </div>
    ),
  },
] as const;

export function Entourage() {
  const [tab, setTab] = useState(0);
  const Current = tabs[tab].render;

  return (
    <section id="entourage" className="relative px-5 py-24 sm:py-36">
      <SectionHeading
        eyebrow="The Entourage"
        title="Our guiding lights"
        intro="The people who walk beside us — on this day, and every day."
      />

      <Reveal className="mt-12 flex justify-center">
        <div className="inline-flex rounded-full bg-paper-deep p-1.5" role="tablist" aria-label="Entourage groups">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`relative rounded-full px-4 py-2.5 text-[0.62rem] tracking-[0.22em] uppercase transition-colors sm:px-6 ${
                tab === i ? "text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              {tab === i && (
                <motion.span
                  layoutId="entourage-tab"
                  className="absolute inset-0 rounded-full bg-berry"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-10 max-w-5xl" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: silk }}
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
