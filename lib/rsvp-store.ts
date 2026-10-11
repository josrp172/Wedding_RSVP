import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";
import type { RsvpInput, RsvpRecord } from "./rsvp-schema";

const KEY = "wedding:rsvps";

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export class StorageNotConfiguredError extends Error {
  constructor() {
    super(
      "RSVP storage is not configured. Connect Upstash Redis to this Vercel project (see README).",
    );
  }
}

/* ── Local JSON fallback, for `npm run dev` only ─────────────── */
const file = path.join(process.cwd(), ".data", "rsvps.json");

async function readLocal(): Promise<Record<string, RsvpRecord>> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return {};
  }
}

async function writeLocal(all: Record<string, RsvpRecord>) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(all, null, 2));
}

function assertLocalAllowed() {
  if (process.env.NODE_ENV === "production") throw new StorageNotConfiguredError();
}
/* ─────────────────────────────────────────────────────────────── */

/** Saves an RSVP keyed by email, so guests can update their response. */
export async function saveRsvp(input: RsvpInput): Promise<{ updated: boolean }> {
  const now = new Date().toISOString();

  if (redis) {
    const existing = await redis.hget<RsvpRecord>(KEY, input.email);
    const record: RsvpRecord = { ...input, createdAt: existing?.createdAt ?? now, updatedAt: now };
    await redis.hset(KEY, { [input.email]: record });
    return { updated: Boolean(existing) };
  }

  assertLocalAllowed();
  const all = await readLocal();
  const existing = all[input.email];
  all[input.email] = { ...input, createdAt: existing?.createdAt ?? now, updatedAt: now };
  await writeLocal(all);
  return { updated: Boolean(existing) };
}

export async function listRsvps(): Promise<RsvpRecord[]> {
  let all: Record<string, RsvpRecord> | null;
  if (redis) {
    all = await redis.hgetall<Record<string, RsvpRecord>>(KEY);
  } else {
    assertLocalAllowed();
    all = await readLocal();
  }
  return Object.values(all ?? {}).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export const storageMode = redis ? "redis" : "local";
