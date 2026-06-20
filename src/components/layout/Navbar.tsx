import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { PixelLogo } from "@/components/shared/PixelLogo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="-my-1 inline-flex items-center"
          aria-label={`${site.name} — home`}
        >
          <PixelLogo text="ejt." />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-1 hidden items-center gap-6 sm:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
