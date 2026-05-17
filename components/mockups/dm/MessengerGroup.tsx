"use client";

import {
  chatBackgroundDefaults,
  resolveChatBackground,
} from "@/lib/chat-background";
import { messengerGroupSenderNameColor } from "@/lib/chat-themes";
import type { MessengerGroupState } from "@/lib/types";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { MockAvatar } from "../MockAvatar";
import { ChatBubble } from "../bubbles/ChatBubble";

export function MessengerGroup({ state }: { state: MessengerGroupState }) {
  const memberName = (sender: string) => {
    if (sender === "me") return "Tu";
    return state.members.find((m) => m.id === sender)?.name ?? sender;
  };

  const memberAvatar = (sender: string) => {
    if (sender === "me") return undefined;
    return state.members.find((m) => m.id === sender)?.avatar;
  };

  const memberVerified = (sender: string) =>
    state.members.find((m) => m.id === sender)?.verified ?? false;

  const bodyStyle = resolveChatBackground(
    state.chatBackground,
    chatBackgroundDefaults.messenger
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
          <p className="flex min-w-0 items-center gap-1 truncate text-[16px] font-semibold">
            <span className="truncate">{state.groupName}</span>
            {state.groupVerified && <VerifiedBadge />}
          </p>
          <p className="text-[12px] text-zinc-500">
            {state.members.length} partecipanti
          </p>
        </div>
        <span className="text-lg text-zinc-600">ⓘ</span>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-3 pb-8">
        {state.messages.map((msg, i) => {
          const prev = state.messages[i - 1];
          const showAvatar = !prev || prev.sender !== msg.sender;
          const isMe = msg.sender === "me";
          const senderId = String(msg.sender);

          return (
            <ChatBubble
              key={msg.id}
              message={msg}
              themeId="messenger"
              showSenderName={
                !isMe && showAvatar ? memberName(senderId) : undefined
              }
              senderNameVerified={
                !isMe && showAvatar ? memberVerified(senderId) : false
              }
              senderNameColor={
                !isMe && showAvatar ? messengerGroupSenderNameColor : undefined
              }
              senderAvatar={
                !isMe
                  ? showAvatar
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
