"use client";

import { DMEditorClient } from "@/components/editor/DMEditorClient";
import { WhatsAppDM } from "@/components/mockups/WhatsAppDM";
import { defaultWhatsAppDM } from "@/lib/defaults";

export default function WhatsAppDMPage() {
  return (
    <DMEditorClient
      title="WhatsApp · Chat DM"
      platform="whatsapp-dm"
      themeId="whatsapp"
      backHref="/whatsapp"
      defaultState={defaultWhatsAppDM}
      preview={(state) => <WhatsAppDM state={state} />}
    />
  );
}
