import { PlatformHub } from "@/components/shared/PlatformHub";

export default function YouTubeHubPage() {
  return (
    <PlatformHub
      platformName="YouTube"
      color="#FF0000"
      links={[
        {
          href: "/youtube/dm",
          title: "Messaggi / Inbox",
          description: "Chat creator stile YouTube Studio",
          color: "#3ea6ff",
        },
        {
          href: "/youtube/video",
          title: "Video e commenti",
          description: "Thumbnail, titolo e thread commenti",
          color: "#FF0000",
        },
      ]}
    />
  );
}
