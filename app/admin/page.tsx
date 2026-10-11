import type { Metadata } from "next";
import { adminLogout } from "@/app/actions";
import { coupleNames } from "@/content/wedding";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { listRsvps, storageMode } from "@/lib/rsvp-store";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Guest list",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-svh bg-paper px-4 py-12 text-ink sm:px-8 sm:py-16">{children}</main>;
}

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <Shell>
        <div className="mx-auto max-w-md text-center">
          <p className="font-script text-5xl">Almost there</p>
          <p className="mt-4 font-display text-xl text-ink-soft">
            Set an <code className="font-sans text-base">ADMIN_PASSWORD</code> environment variable to unlock your guest
            list.
          </p>
        </div>
      </Shell>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Shell>
        <LoginForm />
      </Shell>
    );
  }

  let rsvps: Awaited<ReturnType<typeof listRsvps>> = [];
  let loadError: string | null = null;
  try {
    rsvps = await listRsvps();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Could not load RSVPs.";
  }

  const yes = rsvps.filter((r) => r.attending === "yes");
  const no = rsvps.filter((r) => r.attending === "no");
  const headcount = yes.reduce((sum, r) => sum + r.partySize, 0);
  const stats = [
    { label: "Responses", value: rsvps.length },
    { label: "Attending", value: yes.length },
    { label: "Total guests", value: headcount },
    { label: "Declined", value: no.length },
  ];

  return (
    <Shell>
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Guest list</p>
            <h1 className="mt-2 font-script text-5xl sm:text-6xl">{coupleNames}</h1>
            {storageMode === "local" && (
              <p className="mt-2 font-display text-ink-soft italic">Development mode — saving to .data/rsvps.json</p>
            )}
          </div>
          <div className="flex gap-3">
            <a
              href="/admin/export"
              className="rounded-full bg-ink px-5 py-2.5 text-[0.66rem] tracking-[0.22em] text-paper uppercase"
            >
              Download CSV
            </a>
            <form action={adminLogout}>
              <button className="rounded-full border border-ink/20 px-5 py-2.5 text-[0.66rem] tracking-[0.22em] uppercase">
                Sign out
              </button>
            </form>
          </div>
        </header>

        {loadError && <p className="mt-8 font-display text-lg text-rose">{loadError}</p>}

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-6 text-center">
              <dt className="eyebrow !text-[0.6rem]">{s.label}</dt>
              <dd className="mt-2 font-display text-5xl font-light">{s.value}</dd>
            </div>
          ))}
        </dl>

        {rsvps.length === 0 ? (
          <p className="mt-16 text-center font-display text-2xl text-ink-soft italic">
            No responses yet — they’ll appear here as they arrive.
          </p>
        ) : (
          <ul className="mt-10 space-y-3">
            {rsvps.map((r) => (
              <li key={r.email} className="bg-card p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-2xl">
                    {r.fullName}
                    {r.guestNames && <span className="text-ink-soft"> + {r.guestNames}</span>}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-[0.6rem] tracking-[0.2em] uppercase ${
                      r.attending === "yes" ? "bg-berry text-paper" : "bg-paper-deep text-ink-soft"
                    }`}
                  >
                    {r.attending === "yes" ? `Attending · ${r.partySize}` : "Declined"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-soft">
                  {r.email}
                  {r.phone && ` · ${r.phone}`} · {new Date(r.updatedAt).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}
                </p>
                {(r.dietary || r.song || r.message) && (
                  <div className="mt-3 space-y-1 font-display text-lg text-ink-soft">
                    {r.dietary && (
                      <p>
                        <span className="eyebrow mr-2 !text-[0.55rem]">Dietary</span>
                        {r.dietary}
                      </p>
                    )}
                    {r.song && (
                      <p>
                        <span className="eyebrow mr-2 !text-[0.55rem]">Song</span>
                        {r.song}
                      </p>
                    )}
                    {r.message && <p className="italic">“{r.message}”</p>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Shell>
  );
}
