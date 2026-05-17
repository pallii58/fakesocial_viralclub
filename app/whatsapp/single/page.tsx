"use client";

import { useState } from "react";
import { ChatBackgroundEditor } from "@/components/editor/ChatBackgroundEditor";
import { ChatBubble } from "@/components/mockups/bubbles/ChatBubble";
import { WhatsAppSingleMessage } from "@/components/mockups/WhatsAppSingleMessage";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { Select } from "@/components/shared/Select";
import { chatBackgroundDefaults } from "@/lib/chat-background";
import { defaultWhatsAppSingleMessage } from "@/lib/defaults";
import { exportSingleBubble } from "@/lib/export-bubble";
import type { ChatBackground, Message, ReadStatus } from "@/lib/types";

export default function WhatsAppSingleMessagePage() {
  const [message, setMessage] = useState<Message>(defaultWhatsAppSingleMessage);
  const [chatBackground, setChatBackground] = useState<ChatBackground>();

  const update = (patch: Partial<Message>) => {
    setMessage((prev) => ({ ...prev, ...patch }));
  };

  return (
    <EditorLayout
      title="WhatsApp · Singolo messaggio"
      platform="whatsapp-single"
      backHref="/whatsapp"
      onReset={() => {
        setMessage(defaultWhatsAppSingleMessage());
        setChatBackground(undefined);
      }}
      showBubbleExport
      bubblesPreview={<ChatBubble message={message} themeId="whatsapp" />}
      editor={
        <div className="editor-fields">
          <div>
            <label className="editor-label mb-2 block">Mittente</label>
            <Select
              value={String(message.sender)}
              onChange={(sender) => {
                update({
                  sender: sender as Message["sender"],
                  readStatus:
                    sender === "me" ? message.readStatus ?? "read" : undefined,
                });
              }}
              options={[
                { value: "other", label: "Contatto" },
                { value: "me", label: "Tu" },
              ]}
            />
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
          <ChatBackgroundEditor
            value={chatBackground}
            onChange={setChatBackground}
            defaultColor={chatBackgroundDefaults.whatsapp.solidColor}
          />
          {message.sender === "me" && (
            <div>
              <label className="editor-label mb-2 block">Spunte lettura</label>
              <Select
                value={message.readStatus ?? "read"}
                onChange={(readStatus) =>
                  update({ readStatus: readStatus as ReadStatus })
                }
                options={[
                  { value: "sent", label: "Inviato" },
                  { value: "delivered", label: "Ricevuto" },
                  { value: "read", label: "Letto" },
                ]}
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => exportSingleBubble(message, "whatsapp", "whatsapp-single")}
            className="btn-secondary w-full"
          >
            Esporta PNG messaggio trasparente
          </button>
        </div>
      }
      preview={
        <WhatsAppSingleMessage
          message={message}
          chatBackground={chatBackground}
        />
      }
    />
  );
}
