"use client";

import { useEffect } from "react";

/**
 * Applies this page's chosen palette ground on mount, with no UI.
 *
 * Replaces the preview-only ThemeSwitcher's apply-on-mount behavior now that
 * the floating picker is gone from the public site (2026-11-15). Of its 24
 * experimental grounds, only two were ever a real design decision (Bart,
 * 2026-09-13): the default ("Rosewater", no attribute — About, Work, Resume)
 * and "pistachio" (Campaigns & Collabs). Only the latter needs this.
 */
export function PageTheme({ theme }: { theme: string }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [theme]);

  return null;
}
