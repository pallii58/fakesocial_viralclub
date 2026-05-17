"use client";

import { useState } from "react";
import { WhatsAppNotification } from "@/components/mockups/WhatsAppNotification";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { defaultWhatsAppNotification } from "@/lib/defaults";
import type { WhatsAppNotificationState } from "@/lib/types";

export default function WhatsAppNotificationPage() {
  const [state, setState] = useState<WhatsAppNotificationState>(
    defaultWhatsAppNotification
  );

  return (
    <EditorLayout
      title="WhatsApp — Notifica"
      platform="whatsapp-notification"
      backHref="/whatsapp"
      onReset={() => setState(defaultWhatsAppNotification())}
      editor={
        <div className="space-y-4">
          <input
            value={state.contactName}
            onChange={(e) => setState({ ...state, contactName: e.target.value })}
            className="editor-input"
            placeholder="Nome contatto"
          />
          <ImageUploadField
            label="Immagine profilo"
            value={state.contactAvatar}
            onChange={(contactAvatar) => setState({ ...state, contactAvatar })}
          />
          <textarea
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
            className="editor-input min-h-[80px]"
            placeholder="Testo notifica"
          />
          <input
            value={state.time}
            onChange={(e) => setState({ ...state, time: e.target.value })}
            className="editor-input"
            placeholder="Orario (es. ora, 2 min fa)"
          />
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={state.isGroup ?? false}
              onChange={(e) =>
                setState({ ...state, isGroup: e.target.checked })
              }
              className="rounded border-violet-500/30"
            />
            Notifica di gruppo
          </label>
          {state.isGroup && (
            <input
              value={state.groupName ?? ""}
              onChange={(e) => setState({ ...state, groupName: e.target.value })}
              className="editor-input"
              placeholder="Nome gruppo"
            />
          )}
        </div>
      }
      preview={<WhatsAppNotification state={state} />}
    />
  );
}
