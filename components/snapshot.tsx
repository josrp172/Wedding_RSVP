"use client";

import { motion } from "motion/react";
import { Photo } from "./media";
import { silk } from "./reveal";

const tapes = ["bg-rose-soft/70", "bg-gold-soft/80", "bg-blush/90"];

/** A taped-on polaroid with a handwritten caption. */
export function Snapshot({
  src,
  caption,
  tilt = -3,
  aspect = "aspect-[4/5]",
  sizes = "18rem",
  className = "",
  delay = 0,
}: {
  src: string;
  caption: string;
  tilt?: number;
  aspect?: string;
  sizes?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.figure
      className={`relative bg-white p-2.5 pb-12 shadow-[0_25px_50px_-22px_rgba(62,31,44,0.5)] sm:p-3 sm:pb-14 ${className}`}
      initial={{ opacity: 0, y: 40, rotate: tilt * 3, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, delay, ease: silk }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 5 }}
    >
      <span
        aria-hidden
        className={`absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 ${tapes[Math.abs(Math.round(tilt)) % 3]} shadow-sm`}
        style={{ rotate: `${-tilt}deg`, clipPath: "polygon(3% 0,97% 4%,100% 100%,0 96%)" }}
      />
      <div className={`relative overflow-hidden bg-blush ${aspect}`}>
        <Photo src={src} alt={caption} sizes={sizes} className="h-full w-full object-cover" />
      </div>
      <figcaption className="absolute inset-x-2 bottom-2.5 truncate text-center font-script text-[1.2rem] leading-tight text-ink sm:bottom-3 sm:text-2xl">
        {caption}
      </figcaption>
    </motion.figure>
  );
}
