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
  platformLabel?: string;
}

export function DMChatShell({
  state,
  themeId,
  headerBg,
  headerText = "text-white",
  bodyBg,
  platformLabel,
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

      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-3 pb-8">
        {state.messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} themeId={themeId} />
        ))}
      </div>
    </div>
  );
}
