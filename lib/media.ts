type MediaLike =
  | string
  | number
  | null
  | undefined
  | { url?: string | null; filename?: string | null };

export function mediaUrl(media: MediaLike, fallback: string): string {
  if (!media) return fallback;
  if (typeof media === "string") return media;
  if (typeof media === "number") return fallback;
  if (media.url) return media.url;
  return fallback;
}

export function formatNewsDate(publishedAt?: string | null, fallback = ""): string {
  if (!publishedAt) return fallback;
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return fallback;

  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
}

export function richTextToPlain(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const root = value as { root?: { children?: Array<{ children?: Array<{ text?: string }> }> } };
  const children = root.root?.children ?? [];
  return children
    .flatMap((block) => block.children?.map((node) => node.text ?? "") ?? [])
    .join("\n")
    .trim();
}
