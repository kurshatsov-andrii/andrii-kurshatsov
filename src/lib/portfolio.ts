export const PORTFOLIO_CATEGORIES = [
  { key: "songs", labelUk: "ШІ пісні", labelEn: "AI songs" },
  { key: "ads", labelUk: "ШІ реклама", labelEn: "AI ads" },
  { key: "clips", labelUk: "ШІ кліпи", labelEn: "AI clips" },
  { key: "code", labelUk: "Вайб кодинг", labelEn: "Vibe coding" },
] as const;

export type PortfolioCategoryKey = (typeof PORTFOLIO_CATEGORIES)[number]["key"];

export type PortfolioRow = {
  id: string;
  category: PortfolioCategoryKey;
  title_uk: string;
  title_en: string;
  description_uk: string | null;
  description_en: string | null;
  cover_url: string | null;
  video_url: string | null;
  video_platform: "youtube" | "instagram" | "tiktok" | null;
  audio_url: string | null;
  external_url: string | null;
  tags: string[];
  sort_order: number;
};

export function detectPlatform(url: string): "youtube" | "instagram" | "tiktok" | null {
  if (!url) return null;
  const u = url.toLowerCase();
  if (u.includes("youtu")) return "youtube";
  if (u.includes("instagram")) return "instagram";
  if (u.includes("tiktok")) return "tiktok";
  return null;
}

export function youtubeEmbed(url: string): string | null {
  const m =
    url.match(/youtu\.be\/([\w-]+)/) ||
    url.match(/[?&]v=([\w-]+)/) ||
    url.match(/youtube\.com\/embed\/([\w-]+)/) ||
    url.match(/youtube\.com\/shorts\/([\w-]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export function tiktokEmbed(url: string): string | null {
  const m = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/) || url.match(/tiktok\.com\/v\/(\d+)/);
  return m ? `https://www.tiktok.com/embed/v2/${m[1]}` : null;
}

export function instagramEmbed(url: string): string | null {
  const m = url.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/);
  return m ? `https://www.instagram.com/p/${m[1]}/embed` : null;
}
