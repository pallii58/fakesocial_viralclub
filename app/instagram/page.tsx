import { PlatformHub } from "@/components/shared/PlatformHub";

export default function InstagramHubPage() {
  return (
    <PlatformHub
      platformName="Instagram"
      brand="instagram"
      links={[
        {
          href: "/instagram/dm",
          title: "Direct (DM)",
          description: "Chat privata stile Instagram Direct",
        },
        {
          href: "/instagram/post",
          title: "Post e commenti",
          description: "Post con immagine e thread commenti",
        },
      ]}
    />
  );
}
