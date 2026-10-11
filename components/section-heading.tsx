import { Reveal, WordReveal } from "./reveal";
import { Divider } from "./ornaments";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className = "",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <h2 className="mt-4 font-display text-[2.6rem] leading-[1.05] font-light text-ink sm:text-6xl">
        <WordReveal text={title} delay={0.1} />
      </h2>
      <div className="mt-5 flex justify-center">
        <Divider />
      </div>
      {intro && (
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl font-display text-xl leading-relaxed text-ink-soft italic sm:text-[1.35rem]">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
