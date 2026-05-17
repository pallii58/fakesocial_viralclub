import { PlatformHub } from "@/components/shared/PlatformHub";

export default function InstagramHubPage() {
  return (
    <PlatformHub
      platformName="Instagram"
      color="#E1306C"
      links={[
        {
          href: "/instagram/dm",
          title: "Direct (DM)",
          description: "Chat privata stile Instagram Direct",
          color: "#E1306C",
        },
        {
          href: "/instagram/post",
          title: "Post e commenti",
          description: "Post con immagine e thread commenti",
          color: "#E1306C",
        },
      ]}
    />
  );
}
