import { testimonial } from "@/data/testimonial";

// The reference letter, run whole. Ellie asked for it to wear the layout the
// retired "So, what exactly did I do?" section had, so it keeps that section's
// marigold ground and vermilion display type. The letter itself sits on paper
// inside the Maeve frame, because a letter should look like a letter and not
// like more body copy on a coloured field.

const WONK = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export function Testimonial() {
  return (
    <section
      id="testimonial"
      className="relative w-full"
      style={{ backgroundColor: "var(--ejd-marigold)" }}
    >
      <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-10 sm:py-24">
        <h2
          className="text-center font-display font-black uppercase leading-[0.86] tracking-[-0.03em]"
          style={{ ...WONK, color: "var(--ejd-vermilion)", fontSize: "clamp(2.5rem,9vw,5rem)" }}
        >
          {testimonial.heading}
        </h2>

        <figure
          className="mt-12 px-6 py-10 sm:px-12 sm:py-14"
          style={{
            backgroundColor: "var(--mv-paper)",
            border: "var(--mv-stroke) solid var(--ejd-ink)",
            boxShadow:
              "0 0 0 var(--mv-frame) var(--ejd-vermilion), 0 0 0 calc(var(--mv-frame) + var(--mv-stroke)) var(--ejd-ink)",
            borderRadius: 28,
            margin: "calc(var(--mv-frame) + var(--mv-stroke))",
          }}
        >
          <blockquote
            className="space-y-5 text-base leading-relaxed sm:text-xl"
            style={{ color: "var(--ejd-ink)" }}
          >
            {testimonial.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </blockquote>

          <figcaption className="mt-10" style={{ color: "var(--ejd-ink)" }}>
            <p className="text-base sm:text-xl">{testimonial.signOff}</p>
            <p
              className="mt-4 font-display text-xl font-black uppercase leading-none tracking-[-0.01em] sm:text-2xl"
              style={{ ...WONK, color: "var(--ejd-vermilion)" }}
            >
              {testimonial.name}
            </p>
            <p className="mt-2 font-mono text-xs uppercase leading-relaxed tracking-[0.14em] opacity-70">
              {testimonial.title}
              <br />
              {testimonial.company}
              <br />
              {testimonial.address}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
