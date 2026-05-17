"use client";

import { useState } from "react";
import {
  defaultYouTubeChat,
  switchYouTubeChatType,
} from "@/lib/defaults";
import type { YouTubeChatState } from "@/lib/types";
import { chatBackgroundDefaults } from "@/lib/chat-background";
import { youtubeGroupSenderNameColor } from "@/lib/chat-themes";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { Checkbox } from "@/components/shared/Checkbox";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { ChatBackgroundEditor } from "./ChatBackgroundEditor";
import { ChatTypeToggle } from "./ChatTypeToggle";
import { GroupMembersEditor } from "./GroupMembersEditor";
import { MessageListEditor } from "./MessageListEditor";
import { BubblesStack } from "@/components/mockups/bubbles/BubblesStack";
import { YouTubeDM } from "@/components/mockups/dm/YouTubeDM";
import { YouTubeGroup } from "@/components/mockups/dm/YouTubeGroup";

function memberName(state: YouTubeChatState, sender: string) {
  if (sender === "me") return "Tu";
  return state.members.find((m) => m.id === sender)?.name ?? sender;
}

function toDMState(state: YouTubeChatState) {
  return {
    contactName: state.contactName,
    contactAvatar: state.contactAvatar,
    contactStatus: state.contactStatus,
    contactVerified: state.contactVerified,
    messages: state.messages,
    chatBackground: state.chatBackground,
  };
}

function toGroupState(state: YouTubeChatState) {
  return {
    groupName: state.groupName,
    groupAvatar: state.groupAvatar,
    groupVerified: state.groupVerified,
    members: state.members,
    messages: state.messages,
    chatBackground: state.chatBackground,
  };
}

function memberVerified(state: YouTubeChatState, sender: string) {
  return state.members.find((m) => m.id === sender)?.verified ?? false;
}

export function YouTubeChatEditorClient() {
  const [state, setState] = useState<YouTubeChatState>(defaultYouTubeChat);

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
      title="YouTube · YouTube"
      platform="facebook-youtube"
      backHref="/facebook"
      onReset={() => setState(defaultYouTubeChat(state.chatType))}
      showBubbleExport
      bubblesPreview={
        <BubblesStack
          messages={state.messages}
          themeId="youtube"
          getSenderName={isGroup ? (s) => memberName(state, s) : undefined}
          getSenderNameColor={
            isGroup ? () => youtubeGroupSenderNameColor : undefined
          }
          getSenderAvatar={
            isGroup
              ? (s) => state.members.find((m) => m.id === s)?.avatar
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
              setState((prev) => switchYouTubeChatType(prev, chatType))
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
                showVerified
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
            defaultColor={chatBackgroundDefaults.youtube.solidColor}
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
          <YouTubeGroup state={toGroupState(state)} />
        ) : (
          <YouTubeDM state={toDMState(state)} />
        )
      }
    />
  );
}
