import { PlatformHub } from "@/components/shared/PlatformHub";

export default function TikTokHubPage() {
  return (
    <PlatformHub
      platformName="TikTok"
      brand="tiktok"
      links={[
        {
          href: "/tiktok/dm",
          title: "Direct (DM)",
          description: "Messaggi privati stile TikTok",
        },
        {
          href: "/tiktok/video",
          title: "Video e commenti",
          description: "Video con caption e thread commenti",
        },
      ]}
    />
  );
}
