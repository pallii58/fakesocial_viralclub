"use client";

import type { WhatsAppDMState } from "@/lib/types";
import { MockAvatar } from "./MockAvatar";
import { ReadTicks } from "./ReadTicks";

export function WhatsAppDM({ state }: { state: WhatsAppDMState }) {
  return (
    <div className="flex h-full flex-col bg-[#efeae2]">
      <div className="flex items-center gap-3 bg-[#008069] px-3 pb-3 pt-12 text-white">
        <span className="text-lg">‹</span>
        <MockAvatar
          name={state.contactName}
          src={state.contactAvatar}
          size={36}
        />
        <div className="flex-1 min-w-0">
          <p className="truncate text-[16px] font-medium">{state.contactName}</p>
          {state.contactStatus && (
            <p className="text-[12px] opacity-80">{state.contactStatus}</p>
          )}
        </div>
        <span className="text-lg opacity-80">⋮</span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {state.messages.map((msg) => {
          const isMe = msg.sender === "me";
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-2 py-1 shadow-sm ${
                  isMe
                    ? "bg-[#d9fdd3] rounded-tr-none"
                    : "bg-white rounded-tl-none"
                }`}
              >
                <p className="whitespace-pre-wrap text-[14.5px] text-zinc-900 leading-snug">
                  {msg.text}
                </p>
                <div className="flex items-center justify-end gap-1 -mb-0.5">
                  <span className="text-[11px] text-zinc-500">{msg.timestamp}</span>
                  {isMe && <ReadTicks status={msg.readStatus} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-zinc-300 bg-[#f0f0f0] px-2 py-2 pb-8">
        <span className="text-xl text-zinc-500">+</span>
        <div className="flex-1 rounded-full bg-white px-4 py-2 text-sm text-zinc-400">
          Messaggio
        </div>
        <span className="text-xl">🎤</span>
      </div>
    </div>
  );
}
