import { PlatformHub } from "@/components/shared/PlatformHub";

export default function TikTokHubPage() {
  return (
    <PlatformHub
      platformName="TikTok"
      color="#000000"
      links={[
        {
          href: "/tiktok/dm",
          title: "Direct (DM)",
          description: "Messaggi privati stile TikTok",
          color: "#fe2c55",
        },
        {
          href: "/tiktok/video",
          title: "Video e commenti",
          description: "Video con caption e thread commenti",
          color: "#000000",
        },
      ]}
    />
  );
}
