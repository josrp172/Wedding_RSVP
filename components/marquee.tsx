"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** An endless ribbon of text that speeds up and reverses with your scrolling. */
export function Marquee({
  items,
  speed = 2,
  className = "",
  rotate = 0,
}: {
  items: string[];
  speed?: number;
  className?: string;
  rotate?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(speed > 0 ? -1 : 1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * Math.abs(speed) * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = speed > 0 ? 1 : -1;
    else if (f > 0) direction.current = speed > 0 ? -1 : 1;
    move += direction.current * Math.abs(move) * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const row = (
    <div className="flex shrink-0 items-center">
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 sm:px-10">{t}</span>
          <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 opacity-70 sm:h-5 sm:w-5" aria-hidden>
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="10" cy="5" rx="2.6" ry="5" fill="currentColor" transform={`rotate(${r} 10 10)`} />
            ))}
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden py-4 sm:py-5 ${className}`} style={{ rotate: `${rotate}deg` }} aria-hidden>
      <motion.div className="flex w-max" style={{ x }}>
        {row}
        {row}
      </motion.div>
    </div>
  );
}

export function Ribbons({ couple, date, hashtag }: { couple: string; date: string; hashtag: string }) {
  return (
    <div className="relative z-10 -my-10 overflow-hidden py-12 sm:-my-14 sm:py-16">
      <Marquee
        items={[couple, date, hashtag, "forever starts here"]}
        speed={1.6}
        rotate={-3}
        className="bg-berry font-display text-2xl text-white italic shadow-[0_20px_40px_-20px_rgba(110,35,64,0.6)] sm:text-4xl"
      />
      <Marquee
        items={["save the date", "from RTU to forever", "with love", "nine years & counting", date]}
        speed={-1.2}
        rotate={2.5}
        className="-mt-3 bg-blush font-sans text-sm tracking-[0.4em] text-berry uppercase sm:text-base"
      />
    </div>
  );
}
