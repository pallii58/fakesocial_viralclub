import { PlatformHub } from "@/components/shared/PlatformHub";

export default function WhatsAppPage() {
  return (
    <PlatformHub
      platformName="WhatsApp"
      brand="whatsapp"
      links={[
        {
          href: "/whatsapp/chat",
          title: "Chat",
          description: "Privata o gruppo, messaggi e spunte lettura",
        },
        {
          href: "/whatsapp/single",
          title: "Singolo messaggio",
          description: "Un messaggio su sfondo chat",
        },
        {
          href: "/whatsapp/notification",
          title: "Notifica",
          description: "Banner push stile WhatsApp per lock screen",
        },
      ]}
    />
  );
}
