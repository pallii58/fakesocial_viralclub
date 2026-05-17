"use client";

import {
  chatBackgroundDefaults,
  resolveChatBackground,
} from "@/lib/chat-background";
import { getMemberNameColor } from "@/lib/group-member-colors";
import type { InstagramGroupState } from "@/lib/types";
import { MockAvatar } from "../MockAvatar";
import { ChatBubble } from "../bubbles/ChatBubble";

export function InstagramGroup({ state }: { state: InstagramGroupState }) {
  const memberName = (sender: string) => {
    if (sender === "me") return "Tu";
    return state.members.find((m) => m.id === sender)?.name ?? sender;
  };

  const memberAvatar = (sender: string) => {
    if (sender === "me") return undefined;
    return state.members.find((m) => m.id === sender)?.avatar;
  };

  const bodyStyle = resolveChatBackground(
    state.chatBackground,
    chatBackgroundDefaults.instagram
  );

  return (
    <div className="flex h-full flex-col" style={bodyStyle}>
      <div className="flex items-center gap-3 border-b border-zinc-200 bg-white px-3 pb-3 pt-12 text-zinc-900">
        <span className="text-lg">‹</span>
        <MockAvatar
          name={state.groupName}
          src={state.groupAvatar}
          size={36}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-semibold">{state.groupName}</p>
          <p className="text-[12px] text-zinc-500">
            {state.members.length} partecipanti
          </p>
        </div>
        <span className="text-lg text-zinc-600">⋯</span>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-3 pb-8">
        {state.messages.map((msg, i) => {
          const prev = state.messages[i - 1];
          const showSender =
            msg.sender !== "me" && (!prev || prev.sender !== msg.sender);
          const senderId = String(msg.sender);

          return (
            <ChatBubble
              key={msg.id}
              message={msg}
              themeId="instagram"
              showSenderName={
                showSender ? memberName(senderId) : undefined
              }
              senderNameColor={
                showSender ? getMemberNameColor(senderId, state.members) : undefined
              }
              senderAvatar={
                msg.sender !== "me"
                  ? showSender
                    ? {
                        name: memberName(senderId),
                        src: memberAvatar(senderId),
                      }
                    : false
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}
