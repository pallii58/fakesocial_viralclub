"use client";

import { useState } from "react";
import {
  defaultTikTokChat,
  switchTikTokChatType,
} from "@/lib/defaults";
import type { TikTokChatState } from "@/lib/types";
import { chatBackgroundDefaults } from "@/lib/chat-background";
import { tiktokGroupSenderNameColor } from "@/lib/chat-themes";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { Checkbox } from "@/components/shared/Checkbox";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { ChatBackgroundEditor } from "./ChatBackgroundEditor";
import { ChatTypeToggle } from "./ChatTypeToggle";
import { GroupMembersEditor } from "./GroupMembersEditor";
import { MessageListEditor } from "./MessageListEditor";
import { BubblesStack } from "@/components/mockups/bubbles/BubblesStack";
import { TikTokDM } from "@/components/mockups/dm/TikTokDM";
import { TikTokGroup } from "@/components/mockups/dm/TikTokGroup";

function memberName(state: TikTokChatState, sender: string) {
  if (sender === "me") return "Tu";
  return state.members.find((m) => m.id === sender)?.name ?? sender;
}

function toDMState(state: TikTokChatState) {
  return {
    contactName: state.contactName,
    contactAvatar: state.contactAvatar,
    contactStatus: state.contactStatus,
    contactVerified: state.contactVerified,
    messages: state.messages,
    chatBackground: state.chatBackground,
  };
}

function toGroupState(state: TikTokChatState) {
  return {
    groupName: state.groupName,
    groupAvatar: state.groupAvatar,
    groupVerified: state.groupVerified,
    members: state.members,
    messages: state.messages,
    chatBackground: state.chatBackground,
  };
}

function memberVerified(state: TikTokChatState, sender: string) {
  return state.members.find((m) => m.id === sender)?.verified ?? false;
}

function myAvatarValue(state: TikTokChatState) {
  return state.myAvatar ?? state.members.find((m) => m.id === "me")?.avatar;
}

function applyMyAvatar(
  state: TikTokChatState,
  myAvatar?: string
): TikTokChatState {
  return {
    ...state,
    myAvatar,
    members: state.members.map((m) =>
      m.id === "me" ? { ...m, avatar: myAvatar } : m
    ),
  };
}

export function TikTokChatEditorClient() {
  const [state, setState] = useState<TikTokChatState>(defaultTikTokChat);

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
      title="TikTok · Direct"
      platform="tiktok-chat"
      backHref="/tiktok"
      onReset={() => setState(defaultTikTokChat(state.chatType))}
      showBubbleExport
      bubblesPreview={
        <BubblesStack
          messages={state.messages}
          themeId="tiktok"
          getSenderName={isGroup ? (s) => memberName(state, s) : undefined}
          getSenderNameColor={
            isGroup ? () => tiktokGroupSenderNameColor : undefined
          }
          getSenderAvatar={
            isGroup
              ? (s) => state.members.find((m) => m.id === s)?.avatar
              : undefined
          }
          getTrailingSenderAvatar={
            isGroup
              ? (s) =>
                  s === "me"
                    ? myAvatarValue(state)
                    : undefined
              : undefined
          }
          getSenderVerified={
            isGroup ? (s) => memberVerified(state, s) : undefined
          }
        />
      }
      editor={
        <div className="editor-fields">
          <ChatTypeToggle
            value={state.chatType}
            onChange={(chatType) =>
              setState((prev) => switchTikTokChatType(prev, chatType))
            }
          />

          <ImageUploadField
            label="La tua immagine profilo"
            value={myAvatarValue(state)}
            onChange={(myAvatar) =>
              setState((prev) => applyMyAvatar(prev, myAvatar))
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
              <Checkbox
                label="Spunta blu sul nome gruppo"
                checked={state.groupVerified ?? false}
                onChange={(groupVerified) =>
                  setState({ ...state, groupVerified })
                }
              />
              <GroupMembersEditor
                members={state.members}
                excludeIds={["me"]}
                showVerified
                onChange={(members) => {
                  const me = members.find((m) => m.id === "me");
                  setState({
                    ...state,
                    members,
                    myAvatar: me?.avatar ?? state.myAvatar,
                  });
                }}
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
              <Checkbox
                label="Spunta blu (verificato)"
                checked={state.contactVerified ?? false}
                onChange={(contactVerified) =>
                  setState({ ...state, contactVerified })
                }
              />
            </>
          )}

          <ChatBackgroundEditor
            value={state.chatBackground}
            onChange={(chatBackground) => setState({ ...state, chatBackground })}
            defaultColor={chatBackgroundDefaults.tiktok.solidColor}
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
          <TikTokGroup state={toGroupState(state)} />
        ) : (
          <TikTokDM state={toDMState(state)} />
        )
      }
    />
  );
}
