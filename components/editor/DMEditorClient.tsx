"use client";

import { useState } from "react";
import { defaultWhatsAppDM } from "@/lib/defaults";
import type { DMChatState } from "@/lib/types";
import type { ChatThemeId } from "@/lib/chat-themes";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { MessageListEditor } from "./MessageListEditor";
import { BubblesStack } from "@/components/mockups/bubbles/BubblesStack";
import { exportSingleBubble } from "@/lib/export-bubble";

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

  const handleExportBubble = (message: (typeof state.messages)[0]) => {
    exportSingleBubble(message, themeId, platform);
  };

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
            placeholder="Stato (es. Attivo ora)"
          />
          <ImageUploadField
            label="Avatar contatto"
            value={state.contactAvatar}
            onChange={(contactAvatar) => setState({ ...state, contactAvatar })}
          />
          <MessageListEditor
            messages={state.messages}
            onChange={(messages) => setState({ ...state, messages })}
            showReadStatus={showReadStatus}
            onExportBubble={handleExportBubble}
          />
        </div>
      }
      preview={preview(state)}
    />
  );
}
