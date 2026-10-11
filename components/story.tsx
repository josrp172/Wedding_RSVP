"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/content/wedding";
import { MilestoneGlyph } from "./icons";
import { Photo } from "./media";
import { silk } from "./reveal";
import { SectionHeading } from "./section-heading";

type Milestone = (typeof wedding.story.milestones)[number];

const tapes = ["bg-rose-soft/70", "bg-gold-soft/80", "bg-blush/90"];

/** A polaroid with washi tape that drifts gently as you scroll. */
function Polaroid({ m, index }: { m: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const tilt = index % 2 ? 3 : -3;
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [tilt * 2, tilt, 0]);

  return (
    <motion.div ref={ref} style={{ y, rotate }} className="relative mx-auto w-full max-w-[22rem]">
      <motion.div
        className="relative bg-white p-3 pb-14 shadow-[0_30px_60px_-25px_rgba(62,31,44,0.45)] sm:p-4 sm:pb-16"
        initial={{ opacity: 0, scale: 0.85, rotate: tilt * 3 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.3, ease: silk }}
        whileHover={{ scale: 1.03, rotate: -tilt / 2 }}
      >
        <span
          aria-hidden
          className={`absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 ${tapes[index % 3]} shadow-sm backdrop-blur-sm`}
          style={{ rotate: `${-tilt}deg`, clipPath: "polygon(3% 0,97% 4%,100% 100%,0 96%)" }}
        />
        <div className="relative aspect-[4/5] overflow-hidden bg-blush">
          <Photo
            src={m.photo}
            alt={m.title}
            sizes="(max-width: 768px) 80vw, 22rem"
            className="h-full w-full object-cover saturate-[0.92] sepia-[0.08]"
          />
          <div aria-hidden className="absolute inset-0 bg-[#f4b4c4]/10 mix-blend-soft-light" />
        </div>
        <p className="absolute inset-x-0 bottom-3 text-center font-script text-[1.7rem] text-ink sm:bottom-4">
          {m.date}
        </p>
      </motion.div>
    </motion.div>
  );
}

function MilestoneRow({ m, index, onActive }: { m: Milestone; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const centered = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const right = index % 2 === 1;
  const last = index === wedding.story.milestones.length - 1;

  useEffect(() => {
    if (centered) onActive(index);
  }, [centered, index, onActive]);

  return (
    <li ref={ref} className="relative pb-24 pl-14 last:pb-0 md:grid md:grid-cols-2 md:items-center md:gap-24 md:pl-0">
      {/* node on the line */}
      <motion.div
        className={`absolute top-1 left-5 z-10 grid h-11 w-11 place-items-center rounded-full border-2 md:top-1/2 md:left-1/2 md:-mt-5.5 ${
          last ? "border-rose bg-rose text-white" : "border-blush bg-paper text-ink-faint"
        }`}
        style={{ x: "-50%" }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1, borderColor: "var(--color-rose)", color: last ? "#ffffff" : "var(--color-berry)" } : {}}
        transition={{ duration: 0.9, ease: silk }}
      >
        <MilestoneGlyph name={m.icon} className="h-5 w-5" />
        {last && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-rose"
            animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>

      <div className={`mb-10 md:mb-0 ${right ? "md:order-1" : "md:order-2"}`}>
        <Polaroid m={m} index={index} />
      </div>

      <motion.article
        className={`relative ${right ? "md:order-2" : "md:order-1 md:text-right"}`}
        initial={{ opacity: 0, x: right ? 40 : -40, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, delay: 0.15, ease: silk }}
      >
        <div className={`flex items-baseline gap-3 ${right ? "" : "md:flex-row-reverse"}`}>
          <span className="bg-gradient-to-br from-rose to-gold bg-clip-text font-display text-6xl leading-none font-light text-transparent sm:text-7xl">
            {m.year}
          </span>
          <span className="eyebrow">{m.date}</span>
        </div>
        <h3 className="mt-3 font-display text-[2.1rem] leading-tight text-ink sm:text-[2.6rem]">{m.title}</h3>
        <p className="mt-4 font-display text-[1.2rem] leading-[1.75] text-ink-soft sm:text-[1.3rem]">{m.body}</p>
      </motion.article>
    </li>
  );
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: value > 10 ? 2.4 : 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function Story() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const milestones = wedding.story.milestones;

  return (
    <section id="story" className="relative px-5 py-24 sm:py-36">
      <SectionHeading eyebrow="Our Story" title="The long way to forever" intro={wedding.story.intro} />

      <div className="relative mx-auto mt-24 max-w-6xl">
        {/* giant year watermark that follows the chapter you're reading */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="sticky top-[30vh] flex h-[40vh] items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={milestones[active].year}
                className={`font-display leading-none font-light text-blush/60 ${
                  milestones[active].year.length > 4 ? "text-[13vw] lg:text-[11rem]" : "text-[22vw] lg:text-[18rem]"
                }`}
                initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -80, filter: "blur(12px)" }}
                transition={{ duration: 0.9, ease: silk }}
              >
                {milestones[active].year}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div aria-hidden className="absolute top-0 bottom-0 left-5 w-[2px] rounded-full bg-blush md:left-1/2 md:-ml-px" />
        <motion.div
          aria-hidden
          className="absolute top-0 bottom-0 left-5 w-[2px] origin-top rounded-full bg-gradient-to-b from-rose-soft via-rose to-berry md:left-1/2 md:-ml-px"
          style={{ scaleY: line }}
        />
        <ol ref={listRef} className="relative">
          {milestones.map((m, i) => (
            <MilestoneRow key={m.title} m={m} index={i} onActive={setActive} />
          ))}
        </ol>
      </div>

      <div className="relative mx-auto mt-32 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-blush md:grid-cols-4">
        {wedding.story.numbers.map((n, i) => (
          <motion.div
            key={n.label}
            className="bg-card px-3 py-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.12, ease: silk }}
          >
            <p className="bg-gradient-to-br from-berry to-rose bg-clip-text font-display text-5xl font-light text-transparent sm:text-6xl">
              <CountUp value={n.value} suffix={n.suffix} />
            </p>
            <p className="mt-2 font-display text-base text-ink-soft italic">{n.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
