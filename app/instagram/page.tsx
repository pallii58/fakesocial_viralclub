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
          href: "/instagram/post",
          title: "Post e commenti",
          description: "Post con immagine e thread commenti",
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
