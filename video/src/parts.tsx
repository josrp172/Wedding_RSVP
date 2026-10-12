import { AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { c, display, sans, script } from "./theme";

export const FOOTAGE = staticFile("proposal.mp4");

/** The same footage, heavily blurred and tinted, filling the frame behind the sharp video. */
export const Backdrop: React.FC<{ trimBefore?: number; children?: React.ReactNode }> = ({ trimBefore = 0, children }) => (
  <AbsoluteFill style={{ background: c.wine, overflow: "hidden" }}>
    {children ?? (
      <OffthreadVideo
        src={FOOTAGE}
        muted
        trimBefore={trimBefore}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.3)", filter: "blur(42px) saturate(1.25)" }}
      />
    )}
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(47,21,32,0.55), rgba(47,21,32,0.35) 45%, rgba(47,21,32,0.7))" }} />
  </AbsoluteFill>
);

export const Box: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  radius?: string;
  children: React.ReactNode;
}> = ({ x, y, w, h, radius = "22px", children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: radius,
      overflow: "hidden",
      boxShadow: "0 40px 80px -30px rgba(0,0,0,0.65), 0 0 0 1px rgba(236,208,167,0.35)",
    }}
  >
    {children}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 120px rgba(47,21,32,0.35)", borderRadius: radius }} />
  </div>
);

/** Monogram ring that draws itself in. */
export const Monogram: React.FC<{ size: number; color?: string; delay?: number }> = ({ size, color = c.gold, delay = 0 }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame - delay, [0, 45], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const letters = interpolate(frame - delay, [25, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const len = 2 * Math.PI * 46;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="0.9" strokeDasharray={len} strokeDashoffset={len * draw} transform="rotate(-90 50 50)" />
      <circle cx="50" cy="50" r="41" fill="none" stroke={color} strokeWidth="0.4" strokeDasharray="1 3" opacity={1 - draw} />
      <text x="50" y="58" textAnchor="middle" fontFamily={display} fontStyle="italic" fontSize="26" fill={c.ink} opacity={letters}>
        A<tspan fill={c.rose} fontSize="18" dx="2" dy="-2">&amp;</tspan>
        <tspan dx="2" dy="2">R</tspan>
      </text>
    </svg>
  );
};

const rise = (frame: number, fps: number, delay: number) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 40 });
  return { opacity: s, transform: `translateY(${(1 - s) * 24}px)`, filter: `blur(${(1 - s) * 8}px)` };
};

export const TitleCard: React.FC<{ wide: boolean; fadeOutFrom: number }> = ({ wide, fadeOutFrom }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(frame, [fadeOutFrom, fadeOutFrom + 15], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        opacity: out,
        background: `radial-gradient(90% 70% at 50% 0%, ${c.blush} 0%, transparent 70%), radial-gradient(80% 60% at 100% 100%, #f3dcd0 0%, transparent 70%), ${c.paper}`,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Monogram size={wide ? 110 : 130} />
      <div style={{ ...rise(frame, fps, 20), marginTop: 26, fontFamily: sans, fontSize: wide ? 15 : 17, letterSpacing: "0.45em", color: "#7b5662", textTransform: "uppercase" }}>
        The Proposal
      </div>
      <div style={{ ...rise(frame, fps, 32), fontFamily: script, fontSize: wide ? 118 : 92, lineHeight: 1.15, color: c.ink, marginTop: 6 }}>
        Alvin <span style={{ color: c.rose }}>&amp;</span> Rheena
      </div>
      <div style={{ ...rise(frame, fps, 48), fontFamily: display, fontStyle: "italic", fontSize: wide ? 30 : 32, color: "#7b5662", marginTop: 8 }}>
        Hong Kong · September 2026
      </div>
    </AbsoluteFill>
  );
};

export const EndCard: React.FC<{ wide: boolean; fadeInFrames: number }> = ({ wide, fadeInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, fadeInFrames], [0, 1], { extrapolateRight: "clamp" });
  const zoom = interpolate(frame, [0, 150], [1.08, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: fadeIn, background: c.wine, alignItems: "center", justifyContent: "center", textAlign: "center", color: "white" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Img src={staticFile("end.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", opacity: 0.35 }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(70% 60% at 50% 50%, rgba(47,21,32,0.45), rgba(47,21,32,0.92))" }} />
      <div style={{ ...rise(frame, fps, 10), fontFamily: script, fontSize: wide ? 120 : 110, lineHeight: 1.1, color: c.blush }}>She said yes.</div>
      <div style={{ ...rise(frame, fps, 24), fontFamily: display, fontSize: wide ? 44 : 46, fontWeight: 300, marginTop: 10 }}>Alvin &amp; Rheena</div>
      <div style={{ ...rise(frame, fps, 36), fontFamily: sans, fontSize: wide ? 15 : 17, letterSpacing: "0.4em", textTransform: "uppercase", color: c.goldSoft, marginTop: 18 }}>
        October 2027 · Forever, before God
      </div>
      <div style={{ ...rise(frame, fps, 48), fontFamily: display, fontStyle: "italic", fontSize: wide ? 26 : 28, color: "rgba(255,255,255,0.7)", marginTop: 26 }}>
        #RheenaAcceptedAlvin
      </div>
    </AbsoluteFill>
  );
};
