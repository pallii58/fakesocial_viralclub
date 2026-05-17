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
          description: "Chat privata o gruppo, spunta verificata",
        },
        {
          href: "/facebook/notification",
          title: "Notifica",
          description: "Banner push stile Messenger per lock screen",
        },
      ]}
    />
  );
}
