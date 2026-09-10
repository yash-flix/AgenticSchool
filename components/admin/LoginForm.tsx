"use client";

import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CONTINUITY_SPRING } from "@/lib/motion";
import { browserSupabase } from "@/lib/supabase/client";
import Logo from "../Logo";

export default function LoginForm() {
  const router = useRouter();
  const denied = useSearchParams().get("denied") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    denied ? "That account is signed in but is not an admin." : null
  );
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = browserSupabase();
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }

    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }

    // refresh() re-runs the server layout so its admin check sees the new cookie.
    router.refresh();
    router.push("/admin");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={CONTINUITY_SPRING}
      className="card w-full max-w-[380px] p-8 hover:translate-y-0"
    >
      <Logo href="/" />
      <h1 className="display-4 mt-8">Admin</h1>
      <p className="mt-2 text-[13.5px] text-muted">
        Sign in with the account that holds the admin role.
      </p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="block">
          <span className="label">Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-[10px] border border-line-2 bg-paper px-3.5 py-2.5 text-[14.5px] outline-none focus:border-ink"
          />
        </label>

        <label className="block">
          <span className="label">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-[10px] border border-line-2 bg-paper px-3.5 py-2.5 text-[14.5px] outline-none focus:border-ink"
          />
        </label>

        {error && (
          <p role="alert" className="text-[13px] leading-[1.5] text-flame">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn btn-solid w-full justify-center disabled:opacity-55"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </motion.div>
  );
}
