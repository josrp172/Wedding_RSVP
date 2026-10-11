"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/content/wedding";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Wish = { name: string; message: string };

const tints = ["bg-card", "bg-blush/70", "bg-[#fbe9dc]", "bg-white"];

function WishCard({ w, i }: { w: Wish; i: number }) {
  return (
    <figure
      className={`relative w-[17rem] shrink-0 rounded-[1.5rem] p-6 shadow-[0_20px_40px_-28px_rgba(62,31,44,0.55)] sm:w-[20rem] ${tints[i % tints.length]}`}
      style={{ rotate: `${(i % 3) - 1}deg` }}
    >
      <span aria-hidden className="absolute -top-3 left-6 font-display text-6xl leading-none text-rose">
        “
      </span>
      <blockquote className="mt-3 font-display text-[1.12rem] leading-relaxed text-ink">{w.message}</blockquote>
      <figcaption className="mt-4 flex items-center gap-2 font-script text-2xl text-berry">
        <span className="text-sm text-rose">♥</span> {w.name}
      </figcaption>
    </figure>
  );
}

function Row({ wishes, reverse, duration }: { wishes: Wish[]; reverse?: boolean; duration: number }) {
  return (
    <div className="marquee-pause overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className="marquee-track flex w-max gap-5"
        data-reverse={reverse ? "" : undefined}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[...wishes, ...wishes].map((w, i) => (
          <WishCard key={i} w={w} i={i} />
        ))}
      </div>
    </div>
  );
}

export function Wishes() {
  const [real, setReal] = useState<Wish[]>([]);

  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => (r.ok ? r.json() : { wishes: [] }))
      .then((d: { wishes: Wish[] }) => setReal(d.wishes ?? []))
      .catch(() => {});
  }, []);

  const all: Wish[] = [...real, ...wedding.sampleWishes.slice(0, Math.max(0, 8 - real.length))];
  const half = Math.ceil(all.length / 2);

  return (
    <section id="wishes" className="relative overflow-hidden py-24 sm:py-36">
      <div className="px-5">
        <SectionHeading
          eyebrow="The Wishes Wall"
          title="Love notes from our people"
          intro="Leave yours when you RSVP — tick “share on the wall” and it’ll appear here."
        />
      </div>
      <div className="mt-14 space-y-2">
        <Row wishes={all.slice(0, half)} duration={70} />
        <Row wishes={all.slice(half)} reverse duration={80} />
      </div>
      <Reveal className="mt-10 flex justify-center">
        <a
          href="#rsvp"
          className="rounded-full bg-berry px-8 py-4 text-[0.68rem] tracking-[0.28em] text-white uppercase shadow-[0_14px_30px_-12px_rgba(155,58,92,0.7)] transition-transform hover:-translate-y-0.5"
        >
          Leave a wish ♥
        </a>
      </Reveal>
    </section>
  );
}
