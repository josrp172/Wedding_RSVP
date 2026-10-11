import { listRsvps } from "@/lib/rsvp-store";

export const dynamic = "force-dynamic";

/** "Maria Clara Santos" → "Maria S." */
const shortName = (full: string) => {
  const parts = full.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];
};

/** Notes guests chose to share publicly on the wishes wall. */
export async function GET() {
  let wishes: { name: string; message: string }[] = [];
  try {
    wishes = (await listRsvps())
      .filter((r) => r.shareNote && r.message)
      .slice(0, 40)
      .map((r) => ({ name: shortName(r.fullName), message: r.message!.slice(0, 280) }));
  } catch {
    // Storage not configured yet — the wall falls back to sample wishes.
  }
  return Response.json(
    { wishes },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}
