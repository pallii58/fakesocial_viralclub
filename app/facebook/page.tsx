import { PlatformHub } from "@/components/shared/PlatformHub";

export default function FacebookHubPage() {
  return (
    <PlatformHub
      platformName="Facebook"
      color="#1877F2"
      links={[
        {
          href: "/facebook/messenger",
          title: "Messenger",
          description: "Chat privata stile Facebook Messenger",
          color: "#0084ff",
        },
        {
          href: "/facebook/post",
          title: "Post e commenti",
          description: "Post con testo/immagine e commenti",
          color: "#1877F2",
        },
      ]}
    />
  );
}
