import { PlatformHub } from "@/components/shared/PlatformHub";

export default function TikTokHubPage() {
  return (
    <PlatformHub
      platformName="TikTok"
      brand="tiktok"
      links={[
        {
          href: "/tiktok/chat",
          title: "Direct",
          description: "Chat privata o gruppo, spunta verificata",
        },
        {
          href: "/tiktok/comment",
          title: "Commento singolo",
          description:
            "Un commento su sfondo trasparente, per sticker nei video",
        },
        {
          href: "/tiktok/notification",
          title: "Notifica",
          description: "Banner push stile TikTok per lock screen",
        },
      ]}
    />
  );
}
