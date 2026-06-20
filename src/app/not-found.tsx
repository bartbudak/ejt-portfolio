import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-start justify-center gap-6 px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        404
      </p>
      <h1 className="font-heading text-4xl font-medium leading-tight tracking-tight">
        Nothing lives at this URL.
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground">
        The link may be broken or the page may have moved. Head back to the home
        page to pick up the trail.
      </p>
      <Button nativeButton={false} render={<a href="/" />}>
        Go home
      </Button>
    </main>
  );
}
