"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform, type PanInfo } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { wedding } from "@/content/wedding";
import { LazyVideo, Photo, photoUrl } from "./media";
import { silk } from "./reveal";
import { SectionHeading } from "./section-heading";

/* ───────────────────────── Moments: pinned horizontal reel ───────────────────────── */

export function Moments() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section ref={section} id="moments" className="relative bg-wine" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/3 -left-1/4 h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,rgba(207,111,140,0.35)_0%,transparent_65%)]"
        />
        <motion.div ref={track} className="flex w-max items-center gap-5 px-6 sm:gap-8 sm:px-16" style={{ x }}>
          <div className="w-[78vw] shrink-0 pr-4 text-white sm:w-[34vw] lg:w-[28vw]">
            <p className="text-[0.62rem] tracking-[0.42em] text-blush uppercase">Little moments</p>
            <h2 className="mt-4 font-display text-[3.2rem] leading-[0.95] font-light sm:text-7xl">
              Behind the <span className="font-script text-rose-soft">scenes</span>
            </h2>
            <p className="mt-5 max-w-sm font-display text-lg text-white/75 italic">
              Little moments from the day he asked, in Hong Kong. Keep scrolling →
            </p>
          </div>

          {wedding.media.moments.map((m, i) => (
            <motion.figure
              key={m.src}
              className="group relative aspect-[3/4] w-[70vw] shrink-0 overflow-hidden rounded-[1.75rem] bg-berry/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:w-[34vw] lg:w-[24vw]"
              style={{ rotate: i % 2 ? 2 : -2 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <LazyVideo src={m.src} className="h-full w-full object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-wine/85 via-transparent to-transparent" />
              <span className="absolute top-5 left-5 font-display text-sm tracking-[0.2em] text-white/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <figcaption className="absolute inset-x-5 bottom-6 font-script text-3xl leading-tight text-white sm:text-4xl">
                {m.caption}
              </figcaption>
            </motion.figure>
          ))}

          <div className="flex w-[60vw] shrink-0 flex-col items-center justify-center text-center text-white sm:w-[26vw]">
            <p className="font-script text-6xl text-rose-soft">and so much more…</p>
            <a
              href="#gallery"
              className="mt-6 rounded-full border border-white/40 px-6 py-3 text-[0.62rem] tracking-[0.28em] uppercase transition-colors hover:bg-white hover:text-ink"
            >
              See the photos
            </a>
          </div>
        </motion.div>

        <div className="absolute inset-x-6 bottom-[max(2rem,env(safe-area-inset-bottom))] h-px bg-white/15 sm:inset-x-16">
          <motion.div className="h-full bg-gradient-to-r from-rose to-gold-soft" style={{ width: bar }} />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Gallery: parallax masonry + lightbox ───────────────────────── */

type Shot = (typeof wedding.gallery)[number];

function Lightbox({ index, onClose, onIndex }: { index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const shots = wedding.gallery;
  const [dir, setDir] = useState(0);
  const go = (d: number) => {
    setDir(d);
    onIndex((index + d + shots.length) % shots.length);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  const shot = shots[index];

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col bg-wine/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <div className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] text-white sm:px-8">
        <span className="font-display text-sm tracking-[0.2em]">
          {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
          aria-label="Close"
        >
          <span className="absolute h-px w-5 rotate-45 bg-white" />
          <span className="absolute h-px w-5 -rotate-45 bg-white" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.figure
            key={index}
            custom={dir}
            className="relative flex max-h-full flex-col items-center"
            variants={{
              enter: (d: number) => ({ x: d * 120, opacity: 0, scale: 0.95 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: d * -120, opacity: 0, scale: 0.95 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: silk }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl(shot.src, 1600)}
              alt={shot.caption}
              className="max-h-[72svh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              draggable={false}
            />
            <figcaption className="mt-5 font-script text-4xl text-white">{shot.caption}</figcaption>
          </motion.figure>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 hidden h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid"
          aria-label="Previous photo"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 hidden h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid"
          aria-label="Next photo"
        >
          →
        </button>
      </div>

      <div className="flex justify-center gap-2 overflow-x-auto px-4 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => {
              setDir(i > index ? 1 : -1);
              onIndex(i);
            }}
            className={`h-14 w-11 shrink-0 overflow-hidden rounded-md transition-all ${i === index ? "opacity-100 ring-2 ring-rose" : "opacity-40 hover:opacity-80"}`}
            aria-label={`Show photo ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoUrl(s.src, 120)} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function Tile({ shot, index, onOpen }: { shot: Shot; index: number; onOpen: (i: number) => void }) {
  const tall = index % 3 !== 1;
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative block w-full overflow-hidden rounded-[1.25rem] bg-blush ${tall ? "aspect-[3/4]" : "aspect-square"}`}
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, ease: silk }}
      aria-label={`Open photo: ${shot.caption}`}
    >
      <Photo
        src={shot.src}
        alt={shot.caption}
        sizes="(max-width: 640px) 50vw, 33vw"
        className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-wine/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <span className="absolute inset-x-4 bottom-4 translate-y-3 text-left font-script text-2xl text-white opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 sm:text-3xl">
        {shot.caption}
      </span>
    </motion.button>
  );
}

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [cols, setCols] = useState(3);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 140]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const ys = [y1, y2, y3];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setCols(mq.matches ? 2 : 3);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const columns = Array.from({ length: cols }, (_, c) =>
    wedding.gallery.map((s, i) => ({ s, i })).filter(({ i }) => i % cols === c),
  );

  return (
    <section id="gallery" className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-36">
      <SectionHeading
        eyebrow="The Prenup Gallery"
        title="Frames of forever"
        intro="Nine years of favourite frames — tap any photo to see it up close."
      />

      <div ref={ref} className="mx-auto mt-16 grid max-w-6xl gap-3 sm:gap-5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {columns.map((col, c) => (
          <motion.div key={c} className="flex flex-col gap-3 sm:gap-5" style={{ y: ys[c] }}>
            {col.map(({ s, i }) => (
              <Tile key={s.src} shot={s} index={i} onOpen={setOpen} />
            ))}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
      </AnimatePresence>
    </section>
  );
}
