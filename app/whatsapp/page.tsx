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
          description: "Conversazione 1:1 con bolle e spunte lettura",
        },
        {
          href: "/whatsapp/group",
          title: "Gruppo",
          description: "Chat di gruppo — export bolle trasparenti",
        },
      ]}
    />
  );
}
