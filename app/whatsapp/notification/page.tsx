import { NotificationEditorClient } from "@/components/editor/NotificationEditorClient";

export default function WhatsAppNotificationPage() {
  return (
    <NotificationEditorClient
      brand="whatsapp"
      title="WhatsApp · Notifica"
      backHref="/whatsapp"
    />
  );
}
