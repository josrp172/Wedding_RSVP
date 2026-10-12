/** Everything is timed in seconds of the cleaned proposal footage (public/proposal.mp4). */

export const FPS = 30;
export const FOOTAGE_SECONDS = 76.9;
export const TITLE_SECONDS = 4.5;
export const END_SECONDS = 4.5;
/** The end card fades in over the last moments of footage. */
export const END_OVERLAP_SECONDS = 1.5;

export const f = (seconds: number) => Math.round(seconds * FPS);

export const FILM_FRAMES = f(TITLE_SECONDS + FOOTAGE_SECONDS + END_SECONDS - END_OVERLAP_SECONDS);

/** Chapter starts in footage time. The website reads the film-time version of these. */
export const chapters = [
  { title: "Just an ordinary photoshoot", at: 0 },
  { title: "Something’s up", at: 17 },
  { title: "The question", at: 38 },
  { title: "Oo naman, yes!", at: 51 },
  { title: "May ring ka na!", at: 66 },
];

export type Line = { from: number; to: number; who?: "Her" | "Him"; text: string; note?: boolean };

/** Re-set from the original on-screen captions. */
export const subtitles: Line[] = [
  { from: 0.4, to: 5.9, text: "I thought it was just an ordinary photoshoot." },
  { from: 6.0, to: 8.9, text: "Nagtataka ako bakit si ate nag vivideo, hindi si Alvin." },
  { from: 9.0, to: 16.8, text: "Kasi before this moment, may inspo photos/videos na ako na pinakita kay boyfie para di siya mahirapan mag picture sakin." },
  { from: 17.0, to: 22.0, text: "Yung ang tagal ko ng nakatalikod kay boyfie, nafifeel ko na mag propropose na siya — kaya medyo kinabahan na ako." },
  { from: 23.0, to: 25.5, who: "Her", text: "“Sabi ko na eh…”" },
  { from: 26.0, to: 27.9, who: "Her", text: "“HAHAHAHAHAHA”" },
  { from: 28.0, to: 30.2, who: "Her", text: "“Kaya pala nasa likod…”" },
  { from: 31.0, to: 33.2, who: "Him", text: "“Di pa nga naguumpisa eh.”" },
  { from: 35.0, to: 36.4, who: "Her", text: "“Nagsabi ka ba kay mama at papa?”" },
  { from: 36.4, to: 37.9, who: "Him", text: "“Yaahhh, nagsabi na ako.”" },
  { from: 38.0, to: 40.9, who: "Him", text: "“So, I’m asking you today…”" },
  { from: 41.0, to: 41.9, who: "Her", text: "“Hala…”" },
  { from: 42.0, to: 47.2, who: "Him", text: "“So, Rheena… will you marry me?”" },
  { from: 49.6, to: 50.9, who: "Him", text: "“Yes?”" },
  { from: 51.0, to: 53.9, who: "Her", text: "“Oo naman, yes! Tagal kong inantay itoooo.”" },
  { from: 54.0, to: 55.9, who: "Him", text: "“HAHAHAHAHAHA”" },
  { from: 58.0, to: 59.9, who: "Him", text: "“Right? Left palaaaa.”" },
  { from: 60.0, to: 62.2, note: true, text: "— he slips the ring on —" },
  { from: 68.0, to: 70.2, who: "Him", text: "“May ring ka na!!!”" },
  { from: 73.0, to: 76.6, who: "Her", text: "“San mo nabili ’to? Sabi ko na eh, may hindi ’to nakukwento eh.”" },
];

/** Highlights for the opening loop and the film teaser, in footage seconds. */
export const heroSegments: [number, number][] = [
  [1, 4.5],
  [24, 27.5],
  [43, 46.5],
  [61, 64.5],
  [72.5, 76],
];

export const teaserSegments: [number, number][] = [
  [8, 11.5],
  [17.5, 21],
  [35, 38.5],
  [51, 54.5],
  [66, 69.5],
];

export const MONTAGE_FADE = 18;
export const montageFrames = (segments: [number, number][]) =>
  segments.reduce((sum, [a, b]) => sum + f(b - a), 0) - MONTAGE_FADE * (segments.length - 1);
