/* Brand Fulfillment logo lockup — the official navy brandmark (reorder-loop
   parcel + two-line wordmark) as a single image. The artwork is navy on
   transparent, so on dark surfaces pass tone="white" to invert it to white;
   on light surfaces the navy original is used as-is. */

export function Logo({
  className = "",
  height = 40,
  tone = "navy",
}: {
  className?: string;
  /** rendered height in px; width scales to keep the aspect ratio */
  height?: number;
  tone?: "navy" | "white";
}) {
  return (
    <img
      src="/brand/logo.png"
      alt="Brand Fulfillment"
      style={{ height, width: "auto" }}
      className={`${tone === "white" ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
