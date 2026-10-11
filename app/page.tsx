import { coupleNames, wedding } from "@/content/wedding";
import { Attire } from "@/components/attire";
import { Cursor } from "@/components/cursor";
import { Details } from "@/components/details";
import { Entourage } from "@/components/entourage";
import { Envelope } from "@/components/envelope";
import { Faq } from "@/components/faq";
import { Film } from "@/components/film";
import { Footer } from "@/components/footer";
import { Gallery, Moments } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { IntroProvider } from "@/components/intro-context";
import { Letter } from "@/components/letter";
import { Manifesto } from "@/components/manifesto";
import { Ribbons } from "@/components/marquee";
import { MusicProvider } from "@/components/music";
import { FloatingRsvp, Nav } from "@/components/nav";
import { Rsvp } from "@/components/rsvp";
import { Schedule } from "@/components/schedule";
import { Story } from "@/components/story";
import { Travel } from "@/components/travel";
import { Wishes } from "@/components/wishes";
import { Chrome } from "@/components/chrome";

export default function Home() {
  return (
    <MusicProvider>
      <IntroProvider>
        <Envelope />
        <Nav />
        <main>
          <Hero />
          <Ribbons couple={coupleNames} date={wedding.date.short} hashtag={wedding.couple.hashtag} />
          <Letter />
          <Manifesto />
          <Story />
          <Film />
          <Moments />
          <Gallery />
          <Details />
          <Schedule />
          <Attire />
          <Entourage />
          <Travel />
          <Wishes />
          <Faq />
          <Rsvp />
        </main>
        <Footer />
        <FloatingRsvp />
        <Chrome />
        <Cursor />
      </IntroProvider>
    </MusicProvider>
  );
}
