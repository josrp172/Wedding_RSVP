import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "wedding_admin";

const digest = (value: string) =>
  createHash("sha256").update(`wedding-admin:${value}`).digest("hex");

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function passwordMatches(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(digest(candidate));
  const b = Buffer.from(digest(expected));
  return timingSafeEqual(a, b);
}

export const sessionToken = () => digest(`session:${process.env.ADMIN_PASSWORD ?? ""}`);

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === sessionToken();
}
