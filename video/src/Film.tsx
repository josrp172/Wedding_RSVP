import { AbsoluteFill, OffthreadVideo, Sequence, interpolate, useCurrentFrame } from "remotion";
import { END_OVERLAP_SECONDS, END_SECONDS, FOOTAGE_SECONDS, FPS, TITLE_SECONDS, chapters, f, subtitles } from "./data";
import { Backdrop, Box, EndCard, FOOTAGE, TitleCard } from "./parts";
import { c, display, sans } from "./theme";

const roman = ["I", "II", "III", "IV", "V", "VI"];
/** The footage starts underneath the last half-second of the title card. */
export const TITLE_OVERLAP = 15;

export const filmFrames = () =>
  f(TITLE_SECONDS) - TITLE_OVERLAP + f(FOOTAGE_SECONDS) - f(END_OVERLAP_SECONDS) + f(END_SECONDS);

/** Film-time chapter starts, for the website's player. */
export const filmChapterStarts = () =>
  chapters.map((ch, i) => (i === 0 ? 0 : (f(TITLE_SECONDS) - TITLE_OVERLAP) / FPS + ch.at));

function ChapterLabel({ t, wide }: { t: number; wide: boolean }) {
  const frame = useCurrentFrame();
  let idx = 0;
  chapters.forEach((ch, i) => {
    if (t >= ch.at) idx = i;
  });
  const since = frame - f(chapters[idx].at);
  const appear = interpolate(since, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: appear, transform: `translateY(${(1 - appear) * 12}px)`, textAlign: wide ? "left" : "center" }}>
      <div style={{ fontFamily: sans, fontSize: wide ? 14 : 15, letterSpacing: "0.42em", textTransform: "uppercase", color: c.roseSoft }}>
        Chapter {roman[idx]}
      </div>
      <div style={{ fontFamily: display, fontStyle: "italic", fontSize: wide ? 44 : 40, color: "white", marginTop: 6, lineHeight: 1.1 }}>
        {chapters[idx].title}
      </div>
    </div>
  );
}

function Subtitle({ t, wide }: { t: number; wide: boolean }) {
  const line = subtitles.find((l) => t >= l.from && t < l.to);
  if (!line) return null;
  const inT = (t - line.from) * FPS;
  const outT = (line.to - t) * FPS;
  const o = Math.min(interpolate(inT, [0, 8], [0, 1], { extrapolateRight: "clamp" }), interpolate(outT, [0, 8], [0, 1], { extrapolateRight: "clamp" }));
  const long = line.text.length > 70;
  return (
    <div style={{ opacity: o, transform: `translateY(${(1 - o) * 10}px)`, filter: `blur(${(1 - o) * 4}px)`, textAlign: wide ? "left" : "center" }}>
      {line.who && (
        <div style={{ fontFamily: sans, fontSize: wide ? 14 : 14, letterSpacing: "0.38em", textTransform: "uppercase", color: c.goldSoft, marginBottom: 10 }}>
          {line.who}
        </div>
      )}
      <div
        style={{
          fontFamily: display,
          fontStyle: "italic",
          fontWeight: 400,
          color: line.note ? c.blush : "white",
          fontSize: wide ? (long ? 34 : 44) : long ? 29 : 36,
          lineHeight: 1.3,
          textShadow: "0 2px 20px rgba(0,0,0,0.45)",
        }}
      >
        {line.text}
      </div>
    </div>
  );
}

function FootageScene({ wide }: { wide: boolean }) {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const total = f(FOOTAGE_SECONDS);
  const volume = (vf: number) =>
    Math.min(interpolate(vf, [0, 20], [0, 1], { extrapolateRight: "clamp" }), interpolate(vf, [total - 60, total], [1, 0], { extrapolateLeft: "clamp" }));

  // 720×924 footage framed in the layout
  const box = wide ? { x: 110, y: 40, w: 499, h: 640 } : { x: 24, y: 196, w: 672, h: 862 };

  return (
    <AbsoluteFill>
      <Backdrop />
      <Box {...box}>
        <OffthreadVideo src={FOOTAGE} volume={volume} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>

      {wide ? (
        <div style={{ position: "absolute", left: 680, top: 0, width: 520, height: 720 }}>
          <div style={{ position: "absolute", top: 72, left: 0, right: 0 }}>
            <ChapterLabel t={t} wide />
          </div>
          <div style={{ position: "absolute", top: 250, left: 0, right: 0 }}>
            <Subtitle t={t} wide />
          </div>
          <div style={{ position: "absolute", bottom: 56, left: 0, fontFamily: sans, fontSize: 13, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            Alvin &amp; Rheena · Hong Kong
          </div>
        </div>
      ) : (
        <>
          <div style={{ position: "absolute", top: 58, left: 40, right: 40 }}>
            <ChapterLabel t={t} wide={false} />
          </div>
          <div style={{ position: "absolute", top: 1082, left: 44, right: 44 }}>
            <Subtitle t={t} wide={false} />
          </div>
        </>
      )}
    </AbsoluteFill>
  );
}

export const Film: React.FC<{ wide: boolean }> = ({ wide }) => {
  const footageStart = f(TITLE_SECONDS) - TITLE_OVERLAP;
  const endStart = footageStart + f(FOOTAGE_SECONDS) - f(END_OVERLAP_SECONDS);
  return (
    <AbsoluteFill style={{ background: c.wine }}>
      <Sequence from={footageStart} durationInFrames={f(FOOTAGE_SECONDS)}>
        <FootageScene wide={wide} />
      </Sequence>
      <Sequence durationInFrames={f(TITLE_SECONDS)}>
        <TitleCard wide={wide} fadeOutFrom={f(TITLE_SECONDS) - TITLE_OVERLAP} />
      </Sequence>
      <Sequence from={endStart}>
        <EndCard wide={wide} fadeInFrames={f(END_OVERLAP_SECONDS)} />
      </Sequence>
    </AbsoluteFill>
  );
};
