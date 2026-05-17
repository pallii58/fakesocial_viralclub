import { PlatformHub } from "@/components/shared/PlatformHub";

export default function YouTubeHubPage() {
  return (
    <PlatformHub
      platformName="YouTube"
      brand="youtube"
      links={[
        {
          href: "/youtube/dm",
          title: "Messaggi / Inbox",
          description: "Chat creator stile YouTube Studio",
        },
        {
          href: "/youtube/video",
          title: "Video e commenti",
          description: "Thumbnail, titolo e thread commenti",
        },
      ]}
    />
  );
}
