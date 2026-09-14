import { embedUrl } from "@/data/launch";

// One Instagram post, cropped down to its media.
//
// Instagram's embed is a cross-origin iframe: its header ("handle · View
// profile") and its footer ("View more on Instagram", the like row) cannot be
// hidden or restyled from out here — same-origin policy — and no parameter
// returns the media on its own. So the embed is CROPPED rather than styled: the
// iframe is made taller than its window and pulled up by the height of
// Instagram's header, and `overflow: hidden` takes the footer off the bottom.
//
// Lifted out of Launch.tsx (2026-09-11) because the Campaigns page needs the
// same treatment — Ellie asked for the seasonal posts to be "framed and pretty,
// like you did on the About page", and two copies of this crop would drift.

// Instagram's chrome is a fixed pixel height rather than a proportion of the
// width, so these are absolute values — and they are the two numbers to move if
// Instagram ever restyles the embed.
const IG_HEADER = 54;
const IG_FOOTER = 210;

/** Every card frames the same 4:5 window, so a wall of them stays a wall. */
export const FRAME_ASPECT = "4 / 5";

/** Letterbox colour. Instagram uses black for its own bars, so black it is. */
const LETTERBOX = "#000";

export function InstagramEmbed({
  post,
  title,
  aspect,
}: {
  /** Post URL or bare shortcode. */
  post: string;
  /** Accessible name for the frame. */
  title: string;
  /**
   * The shape of the post's OWN media, as a CSS aspect ratio.
   *
   * The embed renders its media at the iframe's full width, so the media's
   * height is set by this and nothing else. Left to fill a 4:5 frame, a square
   * post shows Instagram's white chrome in the leftover height, which is what
   * Ellie saw on the Su'Juk card (2026-09-11). Given its real ratio, the media
   * is centred in the frame and the remainder is black instead.
   *
   * MEASURE it, do not guess: open the post's own /embed/ and read the media
   * element's natural size.
   */
  aspect?: string;
}) {
  const src = embedUrl(post);
  if (!src) return null;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: FRAME_ASPECT, backgroundColor: LETTERBOX }}
    >
      {/* The media's own box, centred in the frame. Its height comes from the
          post's ratio, which is exactly the height the embed will draw at this
          width, so the crop lands on the media's edges rather than near them. */}
      <div
        className="absolute left-0 top-1/2 w-full -translate-y-1/2 overflow-hidden"
        style={{ aspectRatio: aspect ?? FRAME_ASPECT }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          scrolling="no"
          allow="encrypted-media"
          className="absolute left-0 w-full"
          style={{
            top: `-${IG_HEADER}px`,
            height: `calc(100% + ${IG_HEADER + IG_FOOTER}px)`,
            border: 0,
          }}
        />
      </div>
    </div>
  );
}
