"use client";

import { useState } from "react";
import { defaultWhatsAppDM } from "@/lib/defaults";
import type { DMChatState } from "@/lib/types";
import type { ChatThemeId } from "@/lib/chat-themes";
import { chatBackgroundDefaults } from "@/lib/chat-background";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { ChatBackgroundEditor } from "./ChatBackgroundEditor";
import { MessageListEditor } from "./MessageListEditor";
import { BubblesStack } from "@/components/mockups/bubbles/BubblesStack";

interface DMEditorClientProps {
  title: string;
  platform: string;
  themeId: ChatThemeId;
  backHref: string;
  preview: (state: DMChatState) => React.ReactNode;
  defaultState?: () => DMChatState;
  showReadStatus?: boolean;
}

export function DMEditorClient({
  title,
  platform,
  themeId,
  backHref,
  preview,
  defaultState = defaultWhatsAppDM,
  showReadStatus = themeId === "whatsapp",
}: DMEditorClientProps) {
  const [state, setState] = useState<DMChatState>(defaultState);

  return (
    <EditorLayout
      title={title}
      platform={platform}
      backHref={backHref}
      onReset={() => setState(defaultState())}
      showBubbleExport
      bubblesPreview={
        <BubblesStack messages={state.messages} themeId={themeId} />
      }
      editor={
        <div className="editor-fields">
          <input
            value={state.contactName}
            onChange={(e) =>
              setState({ ...state, contactName: e.target.value })
            }
            className="editor-input"
            placeholder="Nome contatto"
          />
          <input
            value={state.contactStatus ?? ""}
            onChange={(e) =>
              setState({ ...state, contactStatus: e.target.value })
            }
            className="editor-input"
            placeholder="Stato (es. Attivo ora)"
          />
          <ImageUploadField
            label="Immagine profilo contatto"
            value={state.contactAvatar}
            onChange={(contactAvatar) => setState({ ...state, contactAvatar })}
          />
          <ChatBackgroundEditor
            value={state.chatBackground}
            onChange={(chatBackground) => setState({ ...state, chatBackground })}
            defaultColor={chatBackgroundDefaults[themeId].solidColor}
          />
          <MessageListEditor
            messages={state.messages}
            onChange={(messages) => setState({ ...state, messages })}
            showReadStatus={showReadStatus}
          />
        </div>
      }
      preview={preview(state)}
    />
  );
}
