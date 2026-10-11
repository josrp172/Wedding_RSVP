import { z } from "zod";
import { wedding } from "@/content/wedding";

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((v) => v || undefined);

export const rsvpSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please tell us your name.").max(120),
    email: z.string().trim().toLowerCase().max(200).pipe(z.email("That email doesn’t look quite right.")),
    phone: text(40),
    attending: z.enum(["yes", "no"], { error: "Will you be joining us?" }),
    partySize: z.coerce.number().int().min(1).max(wedding.rsvp.maxPartySize).default(1),
    guestNames: text(300),
    dietary: text(300),
    song: text(200),
    message: text(1500),
    shareNote: z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean()),
  })
  .transform((v) =>
    v.attending === "no"
      ? { ...v, partySize: 0, guestNames: undefined, dietary: undefined, song: undefined }
      : v,
  );

export type RsvpInput = z.infer<typeof rsvpSchema>;

export type RsvpRecord = RsvpInput & {
  createdAt: string;
  updatedAt: string;
};

export type RsvpFormState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<string, string>> }
  | { status: "success"; attending: boolean; firstName: string; updated: boolean };
