"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/content/wedding";
import { LazyVideo } from "./media";
import { useMusic } from "./music";
import { silk } from "./reveal";

const film = wedding.media.film;
const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/** Full-screen chaptered player with story-style progress bars. */
function FilmPlayer({ onClose }: { onClose: () => void }) {
  const [chapter, setChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const { duck } = useMusic();
  const duckRef = useRef(duck);
  duckRef.current = duck;

  useEffect(() => {
    duckRef.current(true);
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      duckRef.current(false);
      root.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const next = () => {
    setProgress(0);
    setChapter((c) => (c + 1 < film.chapters.length ? c + 1 : 0));
  };
  const prev = () => {
    setProgress(0);
    setChapter((c) => (c > 0 ? c - 1 : 0));
  };
  const togglePause = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  const current = film.chapters[chapter];

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col bg-wine text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      role="dialog"
      aria-modal="true"
      aria-label={film.title}
    >
      {/* chapter progress */}
      <div className="absolute inset-x-0 top-0 z-20 flex gap-1.5 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
        {film.chapters.map((c, i) => (
          <button
            key={c.title}
            type="button"
            onClick={() => {
              setProgress(0);
              setChapter(i);
            }}
            className="h-6 flex-1 py-2.5"
            aria-label={`Chapter ${i + 1}: ${c.title}`}
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-white/25">
              <span
                className="block h-full rounded-full bg-white"
                style={{ width: `${i < chapter ? 100 : i === chapter ? progress * 100 : 0}%` }}
              />
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-[max(2.4rem,calc(env(safe-area-inset-top)+1.6rem))] right-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/25 sm:right-8"
        aria-label="Close film"
      >
        <span className="absolute h-px w-5 rotate-45 bg-white" />
        <span className="absolute h-px w-5 -rotate-45 bg-white" />
      </button>

      <div className="relative flex flex-1 items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.video
            key={current.src}
            ref={video}
            src={current.src}
            className="absolute inset-0 h-full w-full object-cover sm:object-contain"
            autoPlay
            muted
            playsInline
            onEnded={next}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgress(v.currentTime / v.duration);
            }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: silk }}
          />
        </AnimatePresence>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine via-transparent to-wine/60" />

        {/* tap zones */}
        <button type="button" className="absolute inset-y-0 left-0 w-1/3" onClick={prev} aria-label="Previous chapter" />
        <button type="button" className="absolute inset-y-0 left-1/3 w-1/3" onClick={togglePause} aria-label={paused ? "Play" : "Pause"} />
        <button type="button" className="absolute inset-y-0 right-0 w-1/3" onClick={next} aria-label="Next chapter" />

        <AnimatePresence>
          {paused && (
            <motion.span
              className="pointer-events-none absolute grid h-20 w-20 place-items-center rounded-full bg-white/15 text-2xl backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
            >
              ▶
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-center sm:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: silk }}
          >
            <p className="text-[0.62rem] tracking-[0.4em] text-blush uppercase">Chapter {roman[chapter]}</p>
            <p className="mt-2 font-script text-5xl sm:text-7xl">{current.title}</p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-4 text-[0.58rem] tracking-[0.3em] text-white/50 uppercase">{film.credit}</p>
      </div>
    </motion.div>
  );
}

/** The video frame grows from a card to full-screen as you scroll, then invites guests to watch. */
export function Film() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsPhone(mq.matches);
    const on = () => setIsPhone(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const t = useTransform(scrollYProgress, [0, 0.55], [1, 0], { clamp: true });
  const insetY = useTransform(t, (v) => v * (isPhone ? 24 : 18));
  const insetX = useTransform(t, (v) => v * (isPhone ? 7 : 24));
  const round = useTransform(t, (v) => v * 32);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${round}px)`;
  const leftX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-60%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["0%", "60%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 0.6], [1.25, 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setPhase(v > 0.5 ? 1 : 0));

  return (
    <section ref={ref} id="film" className="relative h-[260vh] bg-paper">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-wine" style={{ clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={preview}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <LazyVideo
                  src={film.chapters[preview].src}
                  loop={false}
                  onEnded={() => setPreview((p) => (p + 1) % film.chapters.length)}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-[#e98aa5]/20 mix-blend-soft-light" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-wine/50 via-wine/10 to-wine/70" />
          {/* letterbox film grain lines */}
          <div aria-hidden className="absolute inset-0 opacity-[0.07] [background:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_3px)]" />
        </motion.div>

        <motion.h2
          className="pointer-events-none relative z-10 flex flex-col items-center font-display text-[clamp(3.5rem,15vw,11rem)] leading-[0.85] font-light text-white mix-blend-difference sm:flex-row sm:gap-8"
          style={{ opacity: titleOpacity }}
        >
          <motion.span style={{ x: leftX }}>Our</motion.span>
          <motion.span style={{ x: rightX }} className="italic">
            Prenup
          </motion.span>
        </motion.h2>

        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-[max(3rem,env(safe-area-inset-bottom))] text-center text-white sm:pb-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, ease: silk }}
            >
              <p className="text-[0.62rem] tracking-[0.42em] text-blush uppercase">A short film</p>
              <p className="mt-3 font-script text-5xl sm:text-7xl">{film.title}</p>
              <p className="mt-3 max-w-md font-display text-lg text-white/85 italic">{film.subtitle}</p>
              <motion.button
                type="button"
                onClick={() => setOpen(true)}
                className="group relative mt-8 grid h-24 w-24 place-items-center rounded-full bg-white text-berry"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Play the prenup film"
              >
                <motion.span
                  className="absolute inset-0 rounded-full border border-white"
                  animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border border-white"
                  animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden>
                  <path d="M7 4.5v15l13-7.5z" />
                </svg>
              </motion.button>
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {film.chapters.map((c, i) => (
                  <span key={c.title} className={`text-[0.6rem] tracking-[0.28em] uppercase transition-opacity ${i === preview ? "opacity-100" : "opacity-50"}`}>
                    {roman[i]}. {c.title}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>{open && <FilmPlayer onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
}
