import Link from "next/link";
import { site } from "@/lib/site";
import { PixelLogo } from "@/components/shared/PixelLogo";
import { RightNav } from "@/components/layout/RightNav";

// Floating header — transparent, no border/blur, so there's no seam between the
// header and the page (Marimba-style). pointer-events-none lets presses pass
// through to the page (the whisp) everywhere except the logo + nav themselves.
export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-7xl items-start justify-between px-6 py-5 sm:px-8">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="pointer-events-auto -my-1 inline-flex items-center"
        >
          <PixelLogo text="ejt." />
        </Link>
        <div className="pointer-events-auto">
          <RightNav />
        </div>
      </div>
    </header>
  );
}
