import { wedding, coupleNames } from "@/content/wedding";

const toUtcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const venue = wedding.venues[0];
const title = `${coupleNames} — Wedding`;
const details = `Ceremony at ${wedding.venues[0].name}, reception to follow at ${wedding.venues[1].name}. ${wedding.couple.hashtag}`;
const location = `${venue.name}, ${venue.address}`;

export const googleCalendarUrl = () =>
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toUtcStamp(wedding.date.ceremonyStart)}/${toUtcStamp(wedding.date.receptionEnd)}`,
    details,
    location,
    ctz: wedding.date.timezone,
  }).toString();

const escapeIcs = (s: string) => s.replace(/[\;,]/g, (m) => `\${m}`).replace(/\n/g, "\n");

export function buildIcs() {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding//rsvp//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${toUtcStamp(wedding.date.ceremonyStart)}-wedding@${wedding.couple.partnerOne.toLowerCase()}`,
    `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
    `DTSTART:${toUtcStamp(wedding.date.ceremonyStart)}`,
    `DTEND:${toUtcStamp(wedding.date.receptionEnd)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `DESCRIPTION:${escapeIcs(details)}`,
    `LOCATION:${escapeIcs(location)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(`Tomorrow: ${title}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
