"use client";

import { motion } from "motion/react";
import { wedding } from "@/content/wedding";
import { useIntro } from "./intro-context";
import { Photo } from "./media";
import { Divider } from "./ornaments";
import { Reveal, silk } from "./reveal";

export function Letter() {
  const { guest } = useIntro();
  const { letter, couple } = wedding;

  return (
    <section id="letter" className="relative px-5 pt-32 pb-24 sm:pt-44 sm:pb-36">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-40 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,#f8cfd8_0%,transparent_65%)] opacity-70"
      />
      <Reveal className="relative mx-auto max-w-2xl">
        <div className="relative rounded-[4px] bg-card px-7 pt-10 pb-14 shadow-[0_50px_90px_-50px_rgba(62,31,44,0.45)] sm:px-16 sm:pt-20 sm:pb-20">
          <div aria-hidden className="pointer-events-none absolute inset-3 border border-rose/30 sm:inset-4" />
          <div aria-hidden className="pointer-events-none absolute inset-[18px] border border-rose/15 sm:inset-[22px]" />

          {/* pinned polaroid */}
          <div className="relative mx-auto -mt-28 mb-6 w-40 sm:absolute sm:-top-16 sm:-right-14 sm:m-0 sm:w-48">
            <motion.div
              className="bg-white p-2.5 pb-10 shadow-[0_25px_45px_-20px_rgba(62,31,44,0.55)]"
              initial={{ rotate: 18, y: -30, opacity: 0 }}
              whileInView={{ rotate: 6, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 70, damping: 12, delay: 0.3 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
            >
              <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-rose-soft/70" />
              <div className="aspect-square overflow-hidden bg-blush">
                <Photo src={wedding.media.letterPhoto} alt={`${couple.partnerOne} and ${couple.partnerTwo}`} sizes="12rem" className="h-full w-full object-cover" />
              </div>
              <p className="absolute inset-x-0 bottom-2 text-center font-script text-xl text-ink">us, always</p>
            </motion.div>
          </div>

          <p className="eyebrow text-center sm:text-left">A note from us</p>
          <p className="mt-6 font-script text-[2.6rem] leading-tight text-ink sm:text-5xl">{guest ? `Dear ${guest},` : letter.greeting}</p>

          <div className="mt-6 space-y-5 font-display text-[1.28rem] leading-[1.7] text-ink-soft sm:text-[1.4rem]">
            {letter.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.12} y={16}>
                <p className={i === 0 ? "first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-script first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-rose" : ""}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5} y={12} className="mt-10 text-right">
            <p className="font-display text-lg text-ink-soft italic">{letter.signOff}</p>
            <svg viewBox="0 0 320 70" className="ml-auto h-16 w-auto sm:h-20" aria-label={`${couple.partnerOne} and ${couple.partnerTwo}`}>
              <motion.text
                x="310"
                y="52"
                textAnchor="end"
                fontFamily="var(--font-script)"
                fontSize="48"
                fill="transparent"
                stroke="var(--color-ink)"
                strokeWidth="0.8"
                initial={{ strokeDasharray: "0 600", fill: "rgba(62,31,44,0)" }}
                whileInView={{ strokeDasharray: "600 0", fill: "rgba(62,31,44,1)" }}
                viewport={{ once: true }}
                transition={{ strokeDasharray: { duration: 3, ease: "easeInOut" }, fill: { delay: 2.2, duration: 1.2 } }}
              >
                {couple.partnerOne} &amp; {couple.partnerTwo}
              </motion.text>
            </svg>
          </Reveal>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: silk }}
          >
            <Divider tone="var(--color-rose)" />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
