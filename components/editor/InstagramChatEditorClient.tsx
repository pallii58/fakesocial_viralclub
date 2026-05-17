"use client";

import { useState } from "react";
import {
  defaultInstagramChat,
  switchInstagramChatType,
} from "@/lib/defaults";
import type { InstagramChatState } from "@/lib/types";
import { chatBackgroundDefaults } from "@/lib/chat-background";
import { getMemberNameColor } from "@/lib/group-member-colors";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { ChatBackgroundEditor } from "./ChatBackgroundEditor";
import { ChatTypeToggle } from "./ChatTypeToggle";
import { GroupMembersEditor } from "./GroupMembersEditor";
import { MessageListEditor } from "./MessageListEditor";
import { BubblesStack } from "@/components/mockups/bubbles/BubblesStack";
import { InstagramDM } from "@/components/mockups/dm/InstagramDM";
import { InstagramGroup } from "@/components/mockups/dm/InstagramGroup";

function memberName(state: InstagramChatState, sender: string) {
  if (sender === "me") return "Tu";
  return state.members.find((m) => m.id === sender)?.name ?? sender;
}

function toDMState(state: InstagramChatState) {
  return {
    contactName: state.contactName,
    contactAvatar: state.contactAvatar,
    contactStatus: state.contactStatus,
    messages: state.messages,
    chatBackground: state.chatBackground,
  };
}

function toGroupState(state: InstagramChatState) {
  return {
    groupName: state.groupName,
    groupAvatar: state.groupAvatar,
    members: state.members,
    messages: state.messages,
    chatBackground: state.chatBackground,
  };
}

export function InstagramChatEditorClient() {
  const [state, setState] = useState<InstagramChatState>(defaultInstagramChat);

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
      title="Instagram · Direct"
      platform="instagram-chat"
      backHref="/instagram"
      onReset={() => setState(defaultInstagramChat(state.chatType))}
      showBubbleExport
      bubblesPreview={
        <BubblesStack
          messages={state.messages}
          themeId="instagram"
          getSenderName={isGroup ? (s) => memberName(state, s) : undefined}
          getSenderNameColor={
            isGroup
              ? (s) => getMemberNameColor(s, state.members)
              : undefined
          }
          getSenderAvatar={
            isGroup
              ? (s) => state.members.find((m) => m.id === s)?.avatar
              : undefined
          }
        />
      }
      editor={
        <div className="editor-fields">
          <ChatTypeToggle
            value={state.chatType}
            onChange={(chatType) =>
              setState((prev) => switchInstagramChatType(prev, chatType))
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
                placeholder="Stato (es. Attivo ora)"
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
            defaultColor={chatBackgroundDefaults.instagram.solidColor}
          />

          <MessageListEditor
            messages={state.messages}
            onChange={(messages) => setState({ ...state, messages })}
            senders={senders}
          />
        </div>
      }
      preview={
        isGroup ? (
          <InstagramGroup state={toGroupState(state)} />
        ) : (
          <InstagramDM state={toDMState(state)} />
        )
      }
    />
  );
}
