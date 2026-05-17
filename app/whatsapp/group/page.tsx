"use client";

import { useState } from "react";
import { defaultWhatsAppGroup } from "@/lib/defaults";
import type { WhatsAppGroupState } from "@/lib/types";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { ChatBackgroundEditor } from "@/components/editor/ChatBackgroundEditor";
import { GroupMembersEditor } from "@/components/editor/GroupMembersEditor";
import { MessageListEditor } from "@/components/editor/MessageListEditor";
import { chatBackgroundDefaults } from "@/lib/chat-background";
import { WhatsAppGroup } from "@/components/mockups/WhatsAppGroup";
import { BubblesStack } from "@/components/mockups/bubbles/BubblesStack";

export default function WhatsAppGroupPage() {
  const [state, setState] = useState<WhatsAppGroupState>(defaultWhatsAppGroup);

  const memberName = (sender: string) => {
    if (sender === "me") return "Tu";
    return state.members.find((m) => m.id === sender)?.name ?? sender;
  };

  const senders = [
    { id: "me", label: "Tu" },
    ...state.members
      .filter((m) => m.id !== "me")
      .map((m) => ({ id: m.id, label: m.name })),
  ];

  return (
    <EditorLayout
      title="WhatsApp · Gruppo"
      platform="whatsapp-group"
      backHref="/whatsapp"
      onReset={() => setState(defaultWhatsAppGroup())}
      showBubbleExport
      bubblesPreview={
        <BubblesStack
          messages={state.messages}
          themeId="whatsapp"
          getSenderName={memberName}
        />
      }
      editor={
        <div className="editor-fields">
          <input
            value={state.groupName}
            onChange={(e) => setState({ ...state, groupName: e.target.value })}
            className="editor-input"
            placeholder="Nome gruppo"
          />
          <GroupMembersEditor
            members={state.members}
            onChange={(members) => setState({ ...state, members })}
          />
          <ChatBackgroundEditor
            value={state.chatBackground}
            onChange={(chatBackground) => setState({ ...state, chatBackground })}
            defaultColor={chatBackgroundDefaults.whatsapp.solidColor}
          />
          <MessageListEditor
            messages={state.messages}
            onChange={(messages) => setState({ ...state, messages })}
            senders={senders}
            showReadStatus
          />
        </div>
      }
      preview={<WhatsAppGroup state={state} />}
    />
  );
}
