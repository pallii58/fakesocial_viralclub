"use client";

import type { DMChatState } from "@/lib/types";
import {
  type ChatBackgroundDefaults,
  resolveChatBackground,
} from "@/lib/chat-background";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { MockAvatar } from "../MockAvatar";
import type { ChatThemeId } from "@/lib/chat-themes";
import { ChatBubble } from "../bubbles/ChatBubble";

export interface DMChatShellProps {
  state: DMChatState;
  themeId: ChatThemeId;
  headerBg: string;
  headerText?: string;
  backgroundDefaults: ChatBackgroundDefaults;
  /** Spunta blu sul nome contatto (Instagram) */
  contactVerified?: boolean;
}

export function DMChatShell({
  state,
  themeId,
  headerBg,
  headerText = "text-white",
  backgroundDefaults,
  contactVerified = false,
}: DMChatShellProps) {
  const bodyStyle = resolveChatBackground(
    state.chatBackground,
    backgroundDefaults
  );

  return (
    <div className="flex h-full flex-col" style={bodyStyle}>
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
          <p className="flex min-w-0 items-center gap-1 truncate text-[16px] font-semibold">
            <span className="truncate">{state.contactName}</span>
            {contactVerified && <VerifiedBadge />}
          </p>
          {state.contactStatus && (
            <p className="truncate text-[12px] opacity-75">
              {state.contactStatus}
            </p>
          )}
        </div>
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
