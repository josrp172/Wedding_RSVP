"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { wedding } from "@/content/wedding";
import { googleCalendarUrl, mapsUrl } from "@/lib/calendar";
import { Photo } from "./media";
import { Reveal, silk } from "./reveal";
import { SectionHeading } from "./section-heading";

const ROUTE = "M58 168 C 110 160, 120 70, 190 92 S 280 150, 330 72 S 420 40, 452 58";

/** Illustrated drive from the church to the reception. */
function RouteMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [church, reception] = wedding.venues;

  return (
    <div ref={ref} className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-[2rem] bg-card p-4 shadow-[0_40px_80px_-50px_rgba(62,31,44,0.5)] sm:p-6">
      <svg viewBox="0 0 500 220" className="w-full" aria-label={`Route from ${church.name} to ${reception.name}`}>
        <defs>
          <linearGradient id="lake" x1="0" x2="1">
            <stop offset="0" stopColor="#f6d3da" />
            <stop offset="1" stopColor="#e3a3b4" />
          </linearGradient>
          <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#3e1f2c" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="500" height="220" fill="url(#dots)" />
        {/* lake & volcano island */}
        <path d="M250 170 Q300 140 380 160 Q450 178 430 205 Q330 222 260 205 Q220 192 250 170Z" fill="url(#lake)" opacity="0.6" />
        <path d="M318 182 L330 166 L342 182 Z" fill="#cf6f8c" opacity="0.5" />
        <text x="345" y="200" fontSize="9" fill="#9b3a5c" fontStyle="italic" fontFamily="var(--font-display)">Taal Lake</text>
        {/* hills */}
        <path d="M0 210 Q60 150 120 200 Q170 160 230 210Z" fill="#9caf88" opacity="0.25" />
        <path d="M20 60 Q50 30 80 60 Z M380 120 Q410 92 440 120 Z" fill="#9caf88" opacity="0.3" />
        {/* tiny trees */}
        {[[150, 150], [170, 140], [260, 70], [280, 80], [400, 95], [100, 60], [230, 140]].map(([x, y]) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
            <circle r="6" fill="#9caf88" opacity="0.6" />
            <rect x="-0.7" y="5" width="1.4" height="4" fill="#7b5662" opacity="0.5" />
          </g>
        ))}

        <path d={ROUTE} fill="none" stroke="#f6d3da" strokeWidth="9" strokeLinecap="round" />
        <motion.path
          d={ROUTE}
          fill="none"
          stroke="#cf6f8c"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
        />

        {/* the car */}
        {inView && (
          <motion.g
            style={{ offsetPath: `path("${ROUTE}")`, offsetRotate: "auto" } as React.CSSProperties}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 6, delay: 2.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          >
            <rect x="-9" y="-5" width="18" height="10" rx="4" fill="#9b3a5c" />
            <rect x="-3" y="-4" width="7" height="8" rx="2" fill="#fbe3ea" />
            <text x="-5" y="-8" fontSize="8" fill="#cf6f8c">♥</text>
          </motion.g>
        )}

        {[
          { x: 58, y: 168, label: church.name, sub: church.time.split(" in ")[0], anchor: "start" as const, dx: -6, dy: 26 },
          { x: 452, y: 58, label: reception.name, sub: reception.time.split(" in ")[0], anchor: "end" as const, dx: -18, dy: 4 },
        ].map((p, i) => (
          <motion.g
            key={p.label}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i ? 2.2 : 0.2, duration: 0.8, ease: silk }}
          >
            <circle cx={p.x} cy={p.y} r="12" fill="#cf6f8c" opacity="0.2" />
            <path
              d={`M${p.x} ${p.y + 2} c -7 -7 -9 -10 -9 -14 a 9 9 0 0 1 18 0 c 0 4 -2 7 -9 14z`}
              fill="#9b3a5c"
            />
            <circle cx={p.x} cy={p.y - 12} r="3.2" fill="#fff" />
            <text x={p.x + p.dx} y={p.y + p.dy} textAnchor={p.anchor} fontSize="13" fill="#3e1f2c" fontFamily="var(--font-display)">
              {p.label}
            </text>
            <text x={p.x + p.dx} y={p.y + p.dy + 12} textAnchor={p.anchor} fontSize="8" letterSpacing="2" fill="#7b5662">
              {p.sub.toUpperCase()}
            </text>
          </motion.g>
        ))}
        <text x="250" y="24" textAnchor="middle" fontSize="10" letterSpacing="3" fill="#9b3a5c">
          ≈ 25 MINUTE DRIVE
        </text>
      </svg>
    </div>
  );
}

export function Details() {
  return (
    <section id="details" className="relative overflow-hidden bg-paper-deep/70 px-5 py-24 sm:py-36">
      <SectionHeading eyebrow="When & Where" title="Save the date" intro={`${wedding.date.display}, ${wedding.date.year}.`} />

      <div className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-2">
        {wedding.venues.map((v, i) => (
          <motion.article
            key={v.kind}
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: silk }}
          >
            <div className="relative overflow-hidden rounded-t-[999px] bg-card shadow-[0_40px_80px_-50px_rgba(62,31,44,0.5)] transition-transform duration-700 ease-[var(--ease-silk)] group-hover:-translate-y-1.5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-[999px]">
                <Photo
                  src={v.photo}
                  alt={v.name}
                  sizes="(max-width: 768px) 90vw, 32rem"
                  className="h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
                <span className="absolute top-[22%] left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-4 py-1.5 text-[0.6rem] tracking-[0.3em] text-berry uppercase backdrop-blur-md">
                  {v.kind}
                </span>
              </div>
              <div className="relative -mt-10 px-8 pb-12 text-center sm:px-12">
                <p className="font-script text-[2.7rem] leading-tight text-ink sm:text-5xl">{v.name}</p>
                <p className="mt-2 font-display text-lg text-ink-soft italic">{v.address}</p>
                <div className="mx-auto my-5 h-px w-12 bg-rose/50" />
                <p className="font-display text-2xl text-berry">{v.time}</p>
                <p className="mx-auto mt-3 max-w-xs font-display text-[1.1rem] leading-relaxed text-ink-soft">{v.note}</p>
                <a
                  href={mapsUrl(v.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.64rem] tracking-[0.26em] text-white uppercase transition-colors hover:bg-berry"
                >
                  Get directions <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <RouteMap />

      <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" delay={0.2}>
        <span className="eyebrow">Add to your calendar</span>
        <div className="flex gap-3">
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/20 bg-white/60 px-5 py-2.5 text-[0.66rem] tracking-[0.22em] text-ink uppercase transition-colors duration-500 hover:border-berry hover:bg-berry hover:text-white"
          >
            Google
          </a>
          <a
            href="/calendar"
            className="rounded-full border border-ink/20 bg-white/60 px-5 py-2.5 text-[0.66rem] tracking-[0.22em] text-ink uppercase transition-colors duration-500 hover:border-berry hover:bg-berry hover:text-white"
          >
            Apple · Outlook
          </a>
        </div>
      </Reveal>
    </section>
  );
}
