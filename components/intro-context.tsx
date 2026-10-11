"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";

const OPENED_KEY = "invitation-opened";
const GUEST_KEY = "invitation-guest";

type IntroState = {
  /** null until we know on the client whether the envelope should show. */
  opened: boolean | null;
  open: () => void;
  /** Name from a personalised link, e.g. /?to=Tita%20Rosa */
  guest: string | null;
};

const IntroContext = createContext<IntroState>({ opened: null, open: () => {}, guest: null });

export const useIntro = () => useContext(IntroContext);

function cleanName(value: string | null) {
  const v = value?.replace(/\s+/g, " ").trim().slice(0, 60);
  return v ? v : null;
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState<boolean | null>(null);
  const [guest, setGuest] = useState<string | null>(null);

  useEffect(() => {
    let alreadyOpened = false;
    let name: string | null = null;
    try {
      alreadyOpened = Boolean(sessionStorage.getItem(OPENED_KEY));
      name = cleanName(new URLSearchParams(location.search).get("to"));
      if (name) sessionStorage.setItem(GUEST_KEY, name);
      else name = cleanName(sessionStorage.getItem(GUEST_KEY));
    } catch {}
    setGuest(name);
    setOpened(alreadyOpened);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = opened === false ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [opened]);

  const open = () => {
    try {
      sessionStorage.setItem(OPENED_KEY, "1");
    } catch {}
    setOpened(true);
  };

  return (
    <IntroContext.Provider value={{ opened, open, guest }}>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </IntroContext.Provider>
  );
}
