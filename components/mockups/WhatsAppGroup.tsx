"use client";

import {
  chatBackgroundDefaults,
  resolveChatBackground,
} from "@/lib/chat-background";
import { getMemberNameColor } from "@/lib/group-member-colors";
import type { WhatsAppGroupState } from "@/lib/types";
import { MockAvatar } from "./MockAvatar";
import { ReadTicks } from "./ReadTicks";

export function WhatsAppGroup({ state }: { state: WhatsAppGroupState }) {
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
    chatBackgroundDefaults.whatsapp
  );

  return (
    <div className="flex h-full flex-col" style={bodyStyle}>
      <div className="flex items-center gap-3 bg-[#008069] px-3 pb-3 pt-12 text-white">
        <span className="text-lg">‹</span>
        <MockAvatar
          name={state.groupName}
          src={state.groupAvatar}
          size={36}
          className="bg-white/20 text-white"
        />
        <div className="flex-1 min-w-0">
          <p className="truncate text-[16px] font-medium">{state.groupName}</p>
          <p className="text-[12px] opacity-80">
            {state.members.length} partecipanti
          </p>
        </div>
        <span className="text-lg opacity-80">⋮</span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 pb-8 space-y-2">
        {state.messages.map((msg, i) => {
          const isMe = msg.sender === "me";
          const prev = state.messages[i - 1];
          const showName = !prev || prev.sender !== msg.sender;
          const name = memberName(String(msg.sender));

          return (
            <div
              key={msg.id}
              className={`flex gap-1 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <div className="w-8 shrink-0 self-end">
                  {showName ? (
                    <MockAvatar
                      name={name}
                      src={memberAvatar(String(msg.sender))}
                      size={28}
                    />
                  ) : (
                    <div className="w-7" />
                  )}
                </div>
              )}
              <div
                className={`max-w-[72%] rounded-lg px-2 py-1 shadow-sm ${
                  isMe
                    ? "bg-[#d9fdd3] rounded-tr-none"
                    : "bg-white rounded-tl-none"
                }`}
              >
                {!isMe && showName && (
                  <p
                    className="mb-0.5 text-[12px] font-semibold"
                    style={{
                      color: getMemberNameColor(String(msg.sender), state.members),
                    }}
                  >
                    {name}
                  </p>
                )}
                <p className="whitespace-pre-wrap text-[14.5px] text-zinc-900 leading-snug">
                  {msg.text}
                </p>
                <div className="flex items-center justify-end gap-1">
                  <span className="text-[11px] text-zinc-500">{msg.timestamp}</span>
                  {isMe && <ReadTicks status={msg.readStatus} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
