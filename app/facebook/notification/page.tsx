import { NotificationEditorClient } from "@/components/editor/NotificationEditorClient";

export default function FacebookNotificationPage() {
  return (
    <NotificationEditorClient
      brand="facebook"
      title="Messenger — Notifica"
      backHref="/facebook"
    />
  );
}
