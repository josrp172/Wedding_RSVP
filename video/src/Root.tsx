import { Composition } from "remotion";
import { FPS, heroSegments, montageFrames, teaserSegments } from "./data";
import { Film, filmFrames } from "./Film";
import { Montage } from "./Montage";

export const RemotionRoot: React.FC = () => (
  <>
    {/* The prenup film (placeholder: the proposal) — phone and desktop cuts */}
    <Composition id="FilmTall" component={Film} defaultProps={{ wide: false }} width={720} height={1280} fps={FPS} durationInFrames={filmFrames()} />
    <Composition id="FilmWide" component={Film} defaultProps={{ wide: true }} width={1280} height={720} fps={FPS} durationInFrames={filmFrames()} />

    {/* Opening loop behind the names */}
    <Composition id="HeroTall" component={Montage} defaultProps={{ segments: heroSegments, layout: "raw" as const }} width={720} height={924} fps={FPS} durationInFrames={montageFrames(heroSegments)} />
    <Composition id="HeroWide" component={Montage} defaultProps={{ segments: heroSegments, layout: "arch" as const }} width={1280} height={720} fps={FPS} durationInFrames={montageFrames(heroSegments)} />

    {/* Teaser loop in the film section */}
    <Composition id="TeaserTall" component={Montage} defaultProps={{ segments: teaserSegments, layout: "center-tall" as const }} width={720} height={1280} fps={FPS} durationInFrames={montageFrames(teaserSegments)} />
    <Composition id="TeaserWide" component={Montage} defaultProps={{ segments: teaserSegments, layout: "center-wide" as const }} width={1280} height={720} fps={FPS} durationInFrames={montageFrames(teaserSegments)} />
  </>
);
