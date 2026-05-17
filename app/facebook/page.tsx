import { PlatformHub } from "@/components/shared/PlatformHub";

export default function FacebookHubPage() {
  return (
    <PlatformHub
      platformName="Facebook"
      brand="facebook"
      links={[
        {
          href: "/facebook/messenger",
          title: "Messenger",
          description: "Chat privata stile Facebook Messenger",
        },
        {
          href: "/facebook/post",
          title: "Post e commenti",
          description: "Post con testo/immagine e commenti",
        },
      ]}
    />
  );
}
