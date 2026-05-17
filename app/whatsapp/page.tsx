import { PlatformHub } from "@/components/shared/PlatformHub";

export default function WhatsAppPage() {
  return (
    <PlatformHub
      platformName="WhatsApp"
      brand="whatsapp"
      links={[
        {
          href: "/whatsapp/dm",
          title: "Chat DM",
          description: "Conversazione 1:1 con messaggi e spunte lettura",
        },
        {
          href: "/whatsapp/group",
          title: "Gruppo",
          description: "Chat di gruppo",
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
