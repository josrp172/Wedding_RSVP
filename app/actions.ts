"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { rsvpSchema, type RsvpFormState } from "@/lib/rsvp-schema";
import { saveRsvp, StorageNotConfiguredError } from "@/lib/rsvp-store";
import { ADMIN_COOKIE, passwordMatches, sessionToken } from "@/lib/admin-auth";

export async function submitRsvp(_prev: RsvpFormState, formData: FormData): Promise<RsvpFormState> {
  // Honeypot: real guests never see or fill this field.
  if (formData.get("website")) {
    return { status: "success", attending: true, firstName: "friend", updated: false };
  }

  const raw = Object.fromEntries(
    [...formData.entries()].filter(([k]) => !k.startsWith("$") && k !== "website"),
  );
  const parsed = rsvpSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "A few details need a second look.",
      fieldErrors,
    };
  }

  try {
    const { updated } = await saveRsvp(parsed.data);
    return {
      status: "success",
      attending: parsed.data.attending === "yes",
      firstName: parsed.data.fullName.split(/\s+/)[0],
      updated,
    };
  } catch (err) {
    console.error("[rsvp] failed to save", err);
    return {
      status: "error",
      message:
        err instanceof StorageNotConfiguredError
          ? "Our RSVP book isn’t quite ready yet. Please message us directly — we’re so sorry!"
          : "Something went wrong on our side. Please try again in a moment.",
    };
  }
}

export async function adminLogin(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) return { error: "That’s not the right password." };

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function adminLogout() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin");
}
