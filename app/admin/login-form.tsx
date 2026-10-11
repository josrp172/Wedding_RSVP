"use client";

import { useActionState } from "react";
import { adminLogin } from "@/app/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(adminLogin, {});

  return (
    <form action={action} className="mx-auto mt-[12vh] max-w-sm bg-card p-10 text-center">
      <p className="eyebrow">For the couple</p>
      <h1 className="mt-3 font-script text-5xl">Guest list</h1>
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        className="field mt-8 text-center"
        placeholder="Password"
        required
      />
      {state.error && <p className="mt-3 font-display text-rose italic">{state.error}</p>}
      <button
        disabled={pending}
        className="mt-8 w-full rounded-full bg-ink py-3.5 text-[0.7rem] tracking-[0.26em] text-paper uppercase disabled:opacity-70"
      >
        {pending ? "Opening…" : "Open"}
      </button>
    </form>
  );
}
