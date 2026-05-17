import { PlatformHub } from "@/components/shared/PlatformHub";

export default function InstagramHubPage() {
  return (
    <PlatformHub
      platformName="Instagram"
      brand="instagram"
      links={[
        {
          href: "/instagram/chat",
          title: "Direct",
          description: "Chat privata o gruppo stile Instagram Direct",
        },
        {
          href: "/instagram/comment",
          title: "Commento singolo",
          description:
            "Un commento su sfondo trasparente, per sticker nei video",
        },
        {
          href: "/instagram/views",
          title: "Counter visualizzazioni",
          description: "Contatore visualizzazioni per Reel e video",
        },
        {
          href: "/instagram/notification",
          title: "Notifica",
          description: "Banner push stile Instagram per lock screen",
        },
      ]}
    />
  );
}
