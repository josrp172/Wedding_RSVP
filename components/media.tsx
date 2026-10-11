"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const isUnsplash = (src: string) => src.startsWith("https://images.unsplash.com/");

/** Builds a sized URL for Unsplash; local/other images are used as-is. */
export function photoUrl(src: string, width: number) {
  return isUnsplash(src) ? `${src}?auto=format&fit=crop&w=${width}&q=78` : src;
}

/** Local clips ship with a first-frame poster next to them: /videos/hero.mp4 → /videos/hero.jpg */
export const posterFor = (src: string) => (src.startsWith("/") ? src.replace(/\.mp4$/, ".jpg") : undefined);

const portraitQuery = "(orientation: portrait) and (max-width: 900px)";

/** Picks the portrait cut of a clip on phones held upright. */
export function usePortraitSrc(src: string, portraitSrc?: string) {
  const [chosen, setChosen] = useState<string | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(portraitQuery);
    const pick = () => setChosen(portraitSrc && mq.matches ? portraitSrc : src);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, [src, portraitSrc]);
  return chosen;
}

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Responsive photo that fades and un-blurs in once it has loaded. */
export function Photo({ src, alt, className = "", sizes = "100vw", priority }: PhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const srcSet = isUnsplash(src)
    ? [400, 700, 1000, 1400, 1900].map((w) => `${photoUrl(src, w)} ${w}w`).join(", ")
    : undefined;

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={photoUrl(src, 1200)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-[opacity,filter,transform] duration-[1400ms] ease-[var(--ease-silk)] ${
        loaded ? "opacity-100 blur-0" : "scale-[1.04] opacity-0 blur-md"
      }`}
    />
  );
}

/* ───────────── Autoplay helpers ─────────────
 * In-app browsers (Messenger, Facebook, Instagram) and iPhones in Low Power
 * Mode refuse to autoplay video. Any tap counts as permission, so we keep a
 * registry of videos and start the visible ones on the next tap anywhere. */

const videos = new Set<HTMLVideoElement>();
let gestureListening = false;

export function kickVideos() {
  videos.forEach((v) => {
    if (v.dataset.inview === "1" && v.dataset.autoplay === "1" && v.paused) v.play().catch(() => {});
  });
}

function listenForGestures() {
  if (gestureListening) return;
  gestureListening = true;
  (["pointerdown", "touchend", "click", "keydown"] as const).forEach((g) =>
    window.addEventListener(g, kickVideos, { passive: true }),
  );
}

type VideoProps = {
  src: string;
  /** Optional vertical cut used on phones held upright. */
  portraitSrc?: string;
  className?: string;
  /** Start downloading immediately instead of waiting until it's near the screen. */
  eager?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  /** Show a small "tap to play" hint when the browser blocks autoplay. */
  hint?: boolean;
  onEnded?: () => void;
};

/**
 * Muted, inline video that only downloads when it comes near the viewport,
 * pauses itself when scrolled away, and recovers when autoplay is blocked.
 */
export function LazyVideo({ src, portraitSrc, className = "", eager, autoPlay = true, loop = true, hint = true, onEnded }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const chosen = usePortraitSrc(src, portraitSrc);
  const [near, setNear] = useState(Boolean(eager));
  const [blocked, setBlocked] = useState(false);

  const tryPlay = () => {
    const el = ref.current;
    if (!el || !autoPlay || el.dataset.inview !== "1") return;
    el.play()
      .then(() => setBlocked(false))
      .catch((err: DOMException) => {
        if (err?.name === "NotAllowedError") setBlocked(true);
      });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    listenForGestures();
    videos.add(el);
    el.dataset.autoplay = autoPlay ? "1" : "0";
    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.inview = entry.isIntersecting ? "1" : "0";
        if (entry.isIntersecting) {
          setNear(true);
          tryPlay();
        } else {
          el.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      videos.delete(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  // Once the source is attached, start playing if we're on screen.
  useEffect(() => {
    if (near && chosen) tryPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near, chosen]);

  const active = chosen && (near || eager);

  return (
    <div className="relative h-full w-full">
      <motion.video
        ref={ref}
        className={className}
        src={active ? chosen : undefined}
        poster={chosen ? posterFor(chosen) : undefined}
        muted
        loop={loop}
        playsInline
        preload={eager ? "auto" : "none"}
        autoPlay={autoPlay}
        onEnded={onEnded}
        onPlaying={() => setBlocked(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: chosen ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        aria-hidden
      />
      <AnimatePresence>
        {hint && blocked && (
          <motion.span
            className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-[0.55rem] tracking-[0.2em] text-white uppercase backdrop-blur-md"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            ▶ Tap to play
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
