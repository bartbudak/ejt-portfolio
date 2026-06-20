import { ParticleHeadline } from "@/components/shared/ParticleHeadline";

// Holding page for elliejthompson.com — "ejt." over "coming soon" rendered as a
// field of warm dots that scatter from the pointer and spring back into shape.
export function ComingSoon() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#f6f1e7" }}
    >
      <div
        aria-hidden
        className="cs-blob pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] rounded-full"
      />
      {/* accessible heading; the canvas itself is decorative */}
      <h1 className="sr-only">ejt. — coming soon</h1>
      <ParticleHeadline />
    </div>
  );
}
