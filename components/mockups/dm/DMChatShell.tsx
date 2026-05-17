"use client";

import type { DMChatState } from "@/lib/types";
import { MockAvatar } from "../MockAvatar";
import type { ChatThemeId } from "@/lib/chat-themes";
import { ChatBubble } from "../bubbles/ChatBubble";

export interface DMChatShellProps {
  state: DMChatState;
  themeId: ChatThemeId;
  headerBg: string;
  headerText?: string;
  bodyBg: string;
  accentColor?: string;
  platformLabel?: string;
  inputPlaceholder?: string;
}

export function DMChatShell({
  state,
  themeId,
  headerBg,
  headerText = "text-white",
  bodyBg,
  accentColor,
  platformLabel,
  inputPlaceholder = "Messaggio...",
}: DMChatShellProps) {
  return (
    <div className={`flex h-full flex-col ${bodyBg}`}>
      <div
        className={`flex items-center gap-3 px-3 pb-3 pt-12 ${headerBg} ${headerText}`}
      >
        <span className="text-lg opacity-90">‹</span>
        <MockAvatar
          name={state.contactName}
          src={state.contactAvatar}
          size={36}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-semibold">
            {state.contactName}
          </p>
          {state.contactStatus && (
            <p className="truncate text-[12px] opacity-75">
              {state.contactStatus}
            </p>
          )}
        </div>
        {platformLabel && (
          <span className="text-[10px] opacity-60">{platformLabel}</span>
        )}
        <span className="text-lg opacity-80">⋯</span>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {state.messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} themeId={themeId} />
        ))}
      </div>

      <div
        className={`flex items-center gap-2 border-t border-zinc-200/20 px-3 py-2 pb-8 ${
          themeId === "tiktok" || themeId === "youtube"
            ? "bg-[#121212]"
            : "bg-white"
        }`}
      >
        <span className="text-xl opacity-50">📷</span>
        <div
          className={`flex-1 rounded-full px-4 py-2 text-sm ${
            themeId === "tiktok" || themeId === "youtube"
              ? "bg-[#2f2f2f] text-zinc-400"
              : "bg-zinc-100 text-zinc-400"
          }`}
          style={accentColor ? { borderColor: accentColor } : undefined}
        >
          {inputPlaceholder}
        </div>
        <span className="text-xl opacity-50">➤</span>
      </div>
    </div>
  );
}
