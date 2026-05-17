"use client";

import { useState } from "react";
import {
  defaultWhatsAppDM,
} from "@/lib/defaults";
import type { WhatsAppDMState } from "@/lib/types";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { MessageListEditor } from "@/components/editor/MessageListEditor";
import { WhatsAppDM } from "@/components/mockups/WhatsAppDM";

export default function WhatsAppDMPage() {
  const [state, setState] = useState<WhatsAppDMState>(defaultWhatsAppDM);

  return (
    <EditorLayout
      title="WhatsApp — Chat DM"
      platform="whatsapp-dm"
      backHref="/whatsapp"
      onReset={() => setState(defaultWhatsAppDM())}
      editor={
        <div className="space-y-4">
          <input
            value={state.contactName}
            onChange={(e) =>
              setState({ ...state, contactName: e.target.value })
            }
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            placeholder="Nome contatto"
          />
          <input
            value={state.contactStatus ?? ""}
            onChange={(e) =>
              setState({ ...state, contactStatus: e.target.value })
            }
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            placeholder="Stato (es. online)"
          />
          <ImageUploadField
            label="Avatar contatto"
            value={state.contactAvatar}
            onChange={(contactAvatar) => setState({ ...state, contactAvatar })}
          />
          <MessageListEditor
            messages={state.messages}
            onChange={(messages) => setState({ ...state, messages })}
            showReadStatus
          />
        </div>
      }
      preview={<WhatsAppDM state={state} />}
    />
  );
}
