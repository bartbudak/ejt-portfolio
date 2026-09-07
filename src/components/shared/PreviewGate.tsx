"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// The password wall in front of the work-in-progress site.
//
// ⚠️ READ THIS BEFORE TRUSTING IT. The site is a STATIC EXPORT on Firebase
// Hosting — there is no server in the request path, so this check happens in
// the visitor's browser, after the page has already been sent to them. The
// prerendered HTML carries the content whether or not this component chooses to
// paint it. Anyone who opens devtools, reads view-source, or fetches the URL
// with curl can read the whole site without ever seeing this screen.
//
// What it IS good for: keeping the work off the open web from the point of view
// of anyone who is not deliberately digging — a stray visitor, someone the link
// gets forwarded to, a crawler. Paired with the noindex on these routes and the
// robots disallow, that is the actual job.
//
// If it ever needs to be real, the content has to stop being served to
// unauthenticated requests, which needs a server: either a Cloud Function on
// the Blaze plan sitting in front of Hosting, or an expiring preview channel
// (`pnpm deploy:preview`) whose URL is unguessable in the first place.
//
// The password is stored as a salted SHA-256 rather than a literal, so the
// string itself is not sitting in the shipped bundle for anyone who greps it.
// That is about password reuse, not about strength — a five-character password
// falls to a dictionary in no time once someone has the hash.

const SALT = "ejt-preview:";
const EXPECTED = "2492638b0557142a5f0bb50658d2c61db5895685b4f2c1fc62b8e0549c92b300";
const STORAGE_KEY = "ejt-preview-unlocked";

async function hash(value: string) {
  const bytes = new TextEncoder().encode(SALT + value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function PreviewGate({ children }: { children: React.ReactNode }) {
  // `null` is "we have not looked at storage yet". Rendering the lock during
  // that beat would flash a password screen at someone who is already through.
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Private windows refuse storage; the visitor just types it again.
    }
    setUnlocked(stored === EXPECTED);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    const digest = await hash(value);
    setChecking(false);
    if (digest !== EXPECTED) {
      setWrong(true);
      setValue("");
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, digest);
    } catch {
      // Not fatal — the unlock just does not survive a reload.
    }
    setUnlocked(true);
  }

  if (unlocked === null) return null;
  if (unlocked) return <>{children}</>;

  return (
    <main
      className="flex min-h-[100svh] w-full items-center justify-center px-5 py-16"
      style={{ backgroundColor: "var(--ejd-blush)" }}
    >
      <div
        className="flex w-full max-w-md flex-col items-center gap-6 px-8 py-12 text-center"
        style={{
          backgroundColor: "var(--mv-paper)",
          border: "var(--mv-stroke) solid var(--ejd-ink)",
          boxShadow:
            "0 0 0 var(--mv-frame) var(--ejd-vermilion), 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--ejd-ink)",
          borderRadius: 28,
          margin: "calc(var(--mv-frame) + var(--mv-stroke))",
        }}
      >
        <h1
          className="font-display font-black uppercase leading-[0.86] tracking-[-0.03em]"
          style={{
            fontVariationSettings: '"SOFT" 0, "WONK" 1',
            color: "var(--ejd-vermilion)",
            fontSize: "clamp(2.5rem,9vw,3.5rem)",
          }}
        >
          Nearly there
        </h1>

        <p className="text-base leading-relaxed" style={{ color: "var(--ejd-ink)" }}>
          {site.name}&rsquo;s portfolio is still being built. If you were given a
          password, it goes here.
        </p>

        <form onSubmit={submit} className="flex w-full flex-col gap-4">
          <label htmlFor="preview-password" className="sr-only">
            Preview password
          </label>
          <input
            id="preview-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setWrong(false);
            }}
            aria-invalid={wrong}
            aria-describedby={wrong ? "preview-password-error" : undefined}
            className="w-full rounded-full px-5 py-3 text-center text-base focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "var(--ejd-blush)",
              border: "var(--mv-stroke) solid var(--ejd-ink)",
              color: "var(--ejd-ink)",
            }}
          />

          <button
            type="submit"
            disabled={checking || value.length === 0}
            className="rounded-full px-5 py-3 text-base font-semibold transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:hover:translate-y-0"
            style={{
              backgroundColor: "var(--ejd-vermilion)",
              color: "var(--mv-paper)",
              border: "var(--mv-stroke) solid var(--ejd-ink)",
            }}
          >
            {checking ? "Checking…" : "Let me in"}
          </button>

          {/* aria-live so the failure is announced, not just coloured. */}
          <p
            id="preview-password-error"
            role="status"
            aria-live="polite"
            className="min-h-6 font-mono text-xs uppercase tracking-[0.14em]"
            style={{ color: "var(--ejd-deep)" }}
          >
            {wrong ? "That is not it, try again" : ""}
          </p>
        </form>
      </div>
    </main>
  );
}
