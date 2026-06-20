"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("App error boundary caught:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-start justify-center gap-6 px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        Something broke
      </p>
      <h1 className="font-heading text-4xl font-medium leading-tight tracking-tight">
        That shouldn&apos;t have happened.
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground">
        An unexpected error stopped the page from rendering. You can try again,
        or head back home and poke around.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" nativeButton={false} render={<a href="/" />}>
          Go home
        </Button>
      </div>
    </main>
  );
}
