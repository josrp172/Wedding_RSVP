import type { MilestoneIcon } from "@/content/wedding";

const paths: Record<string, React.ReactNode> = {
  bus: (
    <>
      <path d="M5 16V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9z" />
      <path d="M5 11h14M8 4v7M16 4v7" />
      <path d="M4 16h16v2H4z" />
      <circle cx="7.5" cy="19.5" r="1.5" />
      <circle cx="16.5" cy="19.5" r="1.5" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5h16v10H10l-4 3.5v-3.5H4z" />
      <path d="M12 13s-3-1.8-3-4a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 2.2-3 4-3 4z" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v-3l2-5h12l2 5v3z" />
      <path d="M4 13h16" />
      <circle cx="7.5" cy="16.5" r="1.8" />
      <circle cx="16.5" cy="16.5" r="1.8" />
    </>
  ),
  wave: (
    <>
      <circle cx="16.5" cy="7" r="2.5" />
      <path d="M3 15c2 0 2-1.5 4.5-1.5S10 15 12 15s2.5-1.5 4.5-1.5S19 15 21 15" />
      <path d="M3 19c2 0 2-1.5 4.5-1.5S10 19 12 19s2.5-1.5 4.5-1.5S19 19 21 19" />
    </>
  ),
  church: (
    <>
      <path d="M12 2v4M10.5 3.5h3" />
      <path d="M7 11l5-5 5 5v10H7z" />
      <path d="M3 21h18M10 21v-4a2 2 0 0 1 4 0v4" />
      <path d="M12 10.5v.01" />
    </>
  ),
  home: <path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z" />,
  ring: (
    <>
      <circle cx="12" cy="15" r="6" />
      <path d="M9.5 5.5 12 3l2.5 2.5L12 8.5z" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />,
};

export function MilestoneGlyph({ name, className = "" }: { name: MilestoneIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name] ?? paths.heart}
    </svg>
  );
}
