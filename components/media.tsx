"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const isUnsplash = (src: string) => src.startsWith("https://images.unsplash.com/");

/** Builds a sized URL for Unsplash; local/other images are used as-is. */
export function photoUrl(src: string, width: number) {
  return isUnsplash(src) ? `${src}?auto=format&fit=crop&w=${width}&q=78` : src;
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

type VideoProps = {
  src: string;
  className?: string;
  poster?: string;
  /** Start playing as soon as it's near the viewport. */
  autoPlay?: boolean;
  loop?: boolean;
  onEnded?: () => void;
  onTime?: (progress: number) => void;
};

/**
 * Muted, inline, looping video that only downloads when it comes near the
 * viewport and pauses itself when scrolled away — kind to phones and data plans.
 */
export function LazyVideo({ src, className = "", poster, autoPlay = true, loop = true, onEnded, onTime }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          if (autoPlay && !reduce) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay, src]);

  return (
    <motion.video
      ref={ref}
      className={className}
      src={near ? src : undefined}
      poster={poster ? photoUrl(poster, 1400) : undefined}
      muted
      loop={loop}
      playsInline
      preload="none"
      autoPlay={autoPlay}
      onEnded={onEnded}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (onTime && v.duration) onTime(v.currentTime / v.duration);
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      aria-hidden
    />
  );
}
