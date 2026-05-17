"use client";

import { useState } from "react";
import {
  defaultWhatsAppChat,
  switchWhatsAppChatType,
} from "@/lib/defaults";
import type { WhatsAppChatState } from "@/lib/types";
import { chatBackgroundDefaults } from "@/lib/chat-background";
import { getMemberNameColor } from "@/lib/group-member-colors";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { ChatBackgroundEditor } from "./ChatBackgroundEditor";
import { ChatTypeToggle } from "./ChatTypeToggle";
import { GroupMembersEditor } from "./GroupMembersEditor";
import { MessageListEditor } from "./MessageListEditor";
import { BubblesStack } from "@/components/mockups/bubbles/BubblesStack";
import { WhatsAppDM } from "@/components/mockups/WhatsAppDM";
import { WhatsAppGroup } from "@/components/mockups/WhatsAppGroup";

function memberName(state: WhatsAppChatState, sender: string) {
  if (sender === "me") return "Tu";
  return state.members.find((m) => m.id === sender)?.name ?? sender;
}

function toDMState(state: WhatsAppChatState) {
  return {
    contactName: state.contactName,
    contactAvatar: state.contactAvatar,
    contactStatus: state.contactStatus,
    messages: state.messages,
    chatBackground: state.chatBackground,
  };
}

function toGroupState(state: WhatsAppChatState) {
  return {
    groupName: state.groupName,
    groupAvatar: state.groupAvatar,
    members: state.members,
    messages: state.messages,
    chatBackground: state.chatBackground,
  };
}

export function WhatsAppChatEditorClient() {
  const [state, setState] = useState<WhatsAppChatState>(defaultWhatsAppChat);

  const isGroup = state.chatType === "group";

  const senders = isGroup
    ? [
        { id: "me", label: "Tu" },
        ...state.members
          .filter((m) => m.id !== "me")
          .map((m) => ({ id: m.id, label: m.name })),
      ]
    : undefined;

  return (
    <EditorLayout
      title="WhatsApp · Chat"
      platform="whatsapp-chat"
      backHref="/whatsapp"
      onReset={() => setState(defaultWhatsAppChat(state.chatType))}
      showBubbleExport
      bubblesPreview={
        <BubblesStack
          messages={state.messages}
          themeId="whatsapp"
          getSenderName={isGroup ? (s) => memberName(state, s) : undefined}
          getSenderNameColor={
            isGroup
              ? (s) => getMemberNameColor(s, state.members)
              : undefined
          }
        />
      }
      editor={
        <div className="editor-fields">
          <ChatTypeToggle
            value={state.chatType}
            onChange={(chatType) =>
              setState((prev) => switchWhatsAppChatType(prev, chatType))
            }
          />

          {isGroup ? (
            <>
              <input
                value={state.groupName}
                onChange={(e) =>
                  setState({ ...state, groupName: e.target.value })
                }
                className="editor-input"
                placeholder="Nome gruppo"
              />
              <ImageUploadField
                label="Immagine gruppo"
                value={state.groupAvatar}
                onChange={(groupAvatar) =>
                  setState({ ...state, groupAvatar })
                }
              />
              <GroupMembersEditor
                members={state.members}
                onChange={(members) => setState({ ...state, members })}
              />
            </>
          ) : (
            <>
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
                placeholder="Stato (es. online)"
              />
              <ImageUploadField
                label="Immagine profilo contatto"
                value={state.contactAvatar}
                onChange={(contactAvatar) =>
                  setState({ ...state, contactAvatar })
                }
              />
            </>
          )}

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
      preview={
        isGroup ? (
          <WhatsAppGroup state={toGroupState(state)} />
        ) : (
          <WhatsAppDM state={toDMState(state)} />
        )
      }
    />
  );
}
