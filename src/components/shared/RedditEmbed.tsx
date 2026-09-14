import { FRAME_ASPECT } from "@/components/shared/InstagramEmbed";

// One Reddit post, in the same 4:5 window the Instagram cards use.
//
// Reddit's own embed lives at embed.reddit.com and sends `frame-ancestors *`,
// so it frames from anywhere (checked 2026-09-13). It is the whole post — title,
// media, vote row — and it sizes itself by postMessage, which is ignored here:
// the window is fixed and the overflow cropped, the same treatment the
// Instagram embed gets, so the two read as one wall.

export function RedditEmbed({ url, title }: { url: string; title: string }) {
  const src =
    url
      .replace(
        /^https?:\/\/(www\.|old\.)?reddit\.com/,
        "https://embed.reddit.com",
      )
      .replace(/\/?(\?.*)?$/, "/") +
    "?ref_source=embed&ref=share&embed=true&showmedia=true&theme=light";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: FRAME_ASPECT, backgroundColor: "#fff" }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        className="absolute left-0 top-0 h-full w-full"
        style={{ border: 0 }}
      />
    </div>
  );
}
