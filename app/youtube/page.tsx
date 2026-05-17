import { PlatformHub } from "@/components/shared/PlatformHub";

export default function YouTubeHubPage() {
  return (
    <PlatformHub
      platformName="YouTube"
      brand="youtube"
      links={[
        {
          href: "/youtube/chat",
          title: "Messaggi / Inbox",
          description: "Chat privata o gruppo, spunta verificata",
        },
        {
          href: "/youtube/notification",
          title: "Notifica",
          description: "Banner push stile YouTube per lock screen",
        },
      ]}
    />
  );
}
