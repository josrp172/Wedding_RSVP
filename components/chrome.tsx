"use client";

import { useIntro } from "./intro-context";
import { MusicToggle } from "./music";

/** Floating UI that only appears once the invitation has been opened. */
export function Chrome() {
  const { opened } = useIntro();
  return <MusicToggle visible={opened === true} />;
}
