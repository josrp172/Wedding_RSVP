import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Fragment } from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MONTAGE_FADE, f } from "./data";
import { Backdrop, Box, FOOTAGE } from "./parts";

function Clip({ from, frames }: { from: number; frames: number }) {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, frames], [1, 1.07]);
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <OffthreadVideo src={FOOTAGE} muted trimBefore={f(from)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
}

function Reel({ segments }: { segments: [number, number][] }) {
  return (
    <TransitionSeries>
      {segments.map(([a, b], i) => (
        <Fragment key={i}>
          <TransitionSeries.Sequence durationInFrames={f(b - a)}>
            <Clip from={a} frames={f(b - a)} />
          </TransitionSeries.Sequence>
          {i < segments.length - 1 && (
            <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: MONTAGE_FADE })} />
          )}
        </Fragment>
      ))}
    </TransitionSeries>
  );
}

export type MontageLayout = "raw" | "arch" | "center-wide" | "center-tall";

/** Highlight reel. `raw` is the bare footage; the others frame it over a blurred copy. */
export const Montage: React.FC<{ segments: [number, number][]; layout: MontageLayout }> = ({ segments, layout }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // dip to dark at the loop seam so the restart is invisible
  const seam = Math.min(
    interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: "clamp" }),
  );

  if (layout === "raw") {
    return (
      <AbsoluteFill style={{ background: "#2f1520" }}>
        <AbsoluteFill style={{ opacity: seam }}>
          <Reel segments={segments} />
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  const box =
    layout === "arch"
      ? { x: 690, y: 48, w: 485, h: 624, radius: "242px 242px 26px 26px" }
      : layout === "center-wide"
        ? { x: 390, y: 40, w: 499, h: 640, radius: "26px" }
        : { x: 0, y: 178, w: 720, h: 924, radius: "0px" };

  return (
    <AbsoluteFill style={{ background: "#2f1520" }}>
      <AbsoluteFill style={{ opacity: seam }}>
        <Backdrop>
          <AbsoluteFill style={{ transform: "scale(1.3)", filter: "blur(42px) saturate(1.25)" }}>
            <Reel segments={segments} />
          </AbsoluteFill>
        </Backdrop>
        <Box {...box}>
          <Reel segments={segments} />
        </Box>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
