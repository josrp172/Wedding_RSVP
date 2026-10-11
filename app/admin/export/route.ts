import { isAdmin } from "@/lib/admin-auth";
import { listRsvps } from "@/lib/rsvp-store";

export const dynamic = "force-dynamic";

const columns = [
  "fullName",
  "email",
  "phone",
  "attending",
  "partySize",
  "guestNames",
  "dietary",
  "song",
  "message",
  "createdAt",
  "updatedAt",
] as const;

/** Quote for CSV, and neutralise leading characters spreadsheets treat as formulas. */
function cell(value: unknown) {
  let s = value === undefined || value === null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });

  const rows = await listRsvps();
  const csv = [columns.join(","), ...rows.map((r) => columns.map((c) => cell(r[c])).join(","))].join("\r\n");

  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rsvps-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
