"use client";

import { useState } from "react";
import { ChatBubble } from "@/components/mockups/bubbles/ChatBubble";
import { WhatsAppSingleMessage } from "@/components/mockups/WhatsAppSingleMessage";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { defaultWhatsAppSingleMessage } from "@/lib/defaults";
import { exportSingleBubble } from "@/lib/export-bubble";
import type { Message, ReadStatus } from "@/lib/types";

export default function WhatsAppSingleMessagePage() {
  const [message, setMessage] = useState<Message>(defaultWhatsAppSingleMessage);

  const update = (patch: Partial<Message>) => {
    setMessage((prev) => ({ ...prev, ...patch }));
  };

  return (
    <EditorLayout
      title="WhatsApp — Singolo messaggio"
      platform="whatsapp-single"
      backHref="/whatsapp"
      onReset={() => setMessage(defaultWhatsAppSingleMessage())}
      showBubbleExport
      bubblesPreview={<ChatBubble message={message} themeId="whatsapp" />}
      editor={
        <div className="space-y-4">
          <div>
            <label className="editor-label mb-2 block">Mittente</label>
            <select
              value={String(message.sender)}
              onChange={(e) => {
                const sender = e.target.value as Message["sender"];
                update({
                  sender,
                  readStatus: sender === "me" ? message.readStatus ?? "read" : undefined,
                });
              }}
              className="editor-input"
            >
              <option value="other">Contatto</option>
              <option value="me">Tu</option>
            </select>
          </div>
          <div>
            <label className="editor-label mb-2 block">Testo</label>
            <textarea
              value={message.text}
              onChange={(e) => update({ text: e.target.value })}
              className="editor-input min-h-[100px]"
              placeholder="Scrivi il messaggio..."
            />
          </div>
          <div>
            <label className="editor-label mb-2 block">Orario</label>
            <input
              value={message.timestamp}
              onChange={(e) => update({ timestamp: e.target.value })}
              className="editor-input"
              placeholder="10:42"
            />
          </div>
          {message.sender === "me" && (
            <div>
              <label className="editor-label mb-2 block">Spunte lettura</label>
              <select
                value={message.readStatus ?? "read"}
                onChange={(e) =>
                  update({ readStatus: e.target.value as ReadStatus })
                }
                className="editor-input"
              >
                <option value="sent">Inviato</option>
                <option value="delivered">Consegnato</option>
                <option value="read">Letto</option>
              </select>
            </div>
          )}
          <button
            type="button"
            onClick={() => exportSingleBubble(message, "whatsapp", "whatsapp-single")}
            className="btn-secondary w-full"
          >
            Esporta PNG bolla trasparente
          </button>
        </div>
      }
      preview={<WhatsAppSingleMessage message={message} />}
    />
  );
}
