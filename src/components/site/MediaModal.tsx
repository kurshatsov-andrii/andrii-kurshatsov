import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { youtubeEmbed, tiktokEmbed, instagramEmbed, type PortfolioRow } from "@/lib/portfolio";

export function MediaModal({
  item,
  onClose,
}: {
  item: PortfolioRow | null;
  onClose: () => void;
}) {
  const open = !!item;
  const title = item?.title_uk || item?.title_en || "Media";

  let embed: string | null = null;
  if (item?.video_url) {
    if (item.video_platform === "youtube") embed = youtubeEmbed(item.video_url);
    else if (item.video_platform === "tiktok") embed = tiktokEmbed(item.video_url);
    else if (item.video_platform === "instagram") embed = instagramEmbed(item.video_url);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl bg-background border-border">
        <DialogTitle className="font-display text-xl">{title}</DialogTitle>

        {embed && (
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            <iframe
              src={embed}
              title={title}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {!embed && item?.video_url && (
          <video src={item.video_url} controls className="w-full rounded-xl bg-black" />
        )}

        {item?.audio_url && (
          <div className="space-y-3">
            {item.cover_url && (
              <img src={item.cover_url} alt={title} className="w-full max-h-80 object-cover rounded-xl" />
            )}
            <audio src={item.audio_url} controls className="w-full" />
          </div>
        )}

        {item?.description_uk && (
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description_uk}</p>
        )}

        {item?.external_url && (
          <a
            href={item.external_url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-electric hover:underline"
          >
            {item.external_url}
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}
