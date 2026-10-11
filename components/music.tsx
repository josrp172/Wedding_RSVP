"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { wedding } from "@/content/wedding";

type MusicState = { playing: boolean; start: () => void; toggle: () => void; duck: (on: boolean) => void };

const MusicContext = createContext<MusicState>({ playing: false, start: () => {}, toggle: () => {}, duck: () => {} });
export const useMusic = () => useContext(MusicContext);

const TARGET_VOLUME = 0.45;
const MUTED_KEY = "music-muted";
/** Events browsers accept as a "user gesture" for starting audio. */
const GESTURES = ["pointerdown", "touchend", "keydown", "click"] as const;

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const fade = useRef<number | null>(null);
  const wanted = useRef(false); // should music be playing right now?
  const ducked = useRef(false);
  const [playing, setPlaying] = useState(false);

  const rampTo = useCallback((target: number, ms = 1800, then?: () => void) => {
    const el = audio.current;
    if (!el) return;
    if (fade.current) cancelAnimationFrame(fade.current);
    const from = el.volume;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      el.volume = Math.max(0, Math.min(1, from + (target - from) * k));
      if (k < 1) fade.current = requestAnimationFrame(step);
      else then?.();
    };
    fade.current = requestAnimationFrame(step);
  }, []);

  const ensure = useCallback(() => {
    if (!audio.current) {
      const el = new Audio(wedding.media.music);
      el.loop = true;
      el.volume = 0;
      el.preload = "auto";
      el.setAttribute("playsinline", "");
      // Keep the toggle honest if the OS or browser pauses us (calls, other media…)
      el.addEventListener("play", () => setPlaying(true));
      el.addEventListener("pause", () => setPlaying(false));
      // Belt and braces: some browsers ignore `loop` on streamed mp3s.
      el.addEventListener("ended", () => {
        if (wanted.current) {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      });
      audio.current = el;
    }
    return audio.current;
  }, []);

  const start = useCallback(() => {
    wanted.current = true;
    try {
      sessionStorage.removeItem(MUTED_KEY);
    } catch {}
    const el = ensure();
    if (!el.paused) return;
    el.play()
      .then(() => rampTo(ducked.current ? 0.08 : TARGET_VOLUME))
      .catch(() => {
        /* not allowed yet — the next tap anywhere will try again */
      });
  }, [ensure, rampTo]);

  const stop = useCallback(() => {
    wanted.current = false;
    try {
      sessionStorage.setItem(MUTED_KEY, "1");
    } catch {}
    rampTo(0, 600, () => audio.current?.pause());
  }, [rampTo]);

  const toggle = useCallback(() => (wanted.current && playing ? stop() : start()), [playing, start, stop]);

  /** Lower the music while the film is playing. */
  const duck = useCallback(
    (on: boolean) => {
      ducked.current = on;
      if (audio.current && !audio.current.paused) rampTo(on ? 0.08 : TARGET_VOLUME, 800);
    },
    [rampTo],
  );

  // Start (or resume) on the first real interaction anywhere on the page,
  // unless the guest has explicitly paused the music this visit.
  useEffect(() => {
    let mutedByGuest = false;
    try {
      mutedByGuest = sessionStorage.getItem(MUTED_KEY) === "1";
    } catch {}
    if (!mutedByGuest) wanted.current = true;

    const onGesture = (e: Event) => {
      // Let the music toggle handle its own clicks.
      if ((e.target as HTMLElement | null)?.closest?.("[data-music-toggle]")) return;
      if (wanted.current && (!audio.current || audio.current.paused)) start();
    };
    GESTURES.forEach((g) => window.addEventListener(g, onGesture, { passive: true }));

    const onVisibility = () => {
      const el = audio.current;
      if (!el) return;
      if (document.hidden) el.pause();
      else if (wanted.current) el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      GESTURES.forEach((g) => window.removeEventListener(g, onGesture));
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [start]);

  return <MusicContext.Provider value={{ playing, start, toggle, duck }}>{children}</MusicContext.Provider>;
}

/** Floating vinyl-style music toggle with live equaliser bars. */
export function MusicToggle({ visible }: { visible: boolean }) {
  const { playing, toggle } = useMusic();
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          data-music-toggle
          onClick={toggle}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-30 flex items-center gap-3 rounded-full border border-white/40 bg-paper/70 py-2 pr-4 pl-2 text-ink shadow-[0_12px_30px_-12px_rgba(62,31,44,0.45)] backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          aria-label={playing ? "Pause music" : "Play music"}
          aria-pressed={playing}
        >
          <motion.span
            className="relative grid h-9 w-9 place-items-center rounded-full bg-[repeating-radial-gradient(circle,#3e1f2c_0_2px,#55303f_2px_3px)]"
            animate={{ rotate: playing ? 360 : 0 }}
            transition={playing ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.6 }}
          >
            <span className="h-3 w-3 rounded-full bg-rose" />
          </motion.span>
          <span className="flex h-4 items-end gap-[3px]" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-berry"
                animate={playing ? { height: ["30%", "100%", "45%", "80%", "30%"] } : { height: "30%" }}
                transition={playing ? { duration: 1.1 + i * 0.15, repeat: Infinity, ease: "easeInOut" } : {}}
              />
            ))}
          </span>
          <span className="text-[0.6rem] tracking-[0.24em] uppercase">{playing ? "Our song" : "Play music"}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
