"use client";

import type { ChatThemeId } from "@/lib/chat-themes";
import { chatThemes, isMeSender } from "@/lib/chat-themes";
import type { Message } from "@/lib/types";
import { MockAvatar } from "../MockAvatar";
import { ReadTicks } from "../ReadTicks";

/** undefined = nessuna colonna avatar; false = spacer; object = avatar visibile */
export type SenderAvatarSlot =
  | undefined
  | false
  | { name: string; src?: string };

interface ChatBubbleProps {
  message: Message;
  themeId: ChatThemeId;
  showSenderName?: string;
  senderNameColor?: string;
  senderAvatar?: SenderAvatarSlot;
  className?: string;
}

export function ChatBubble({
  message,
  themeId,
  showSenderName,
  senderNameColor,
  senderAvatar,
  className = "",
}: ChatBubbleProps) {
  const theme = chatThemes[themeId];
  const isMe = isMeSender(message.sender);

  return (
    <div
      className={`flex w-full gap-1 ${isMe ? "justify-end" : "justify-start"} ${className}`}
    >
      {!isMe && senderAvatar !== undefined && (
        <div className="w-7 shrink-0 self-end">
          {senderAvatar ? (
            <MockAvatar
              name={senderAvatar.name}
              src={senderAvatar.src}
              size={28}
            />
          ) : (
            <div className="w-7" />
          )}
        </div>
      )}
      <div
        className={`max-w-[85%] px-3 py-2 ${isMe ? theme.meBubble : theme.otherBubble}`}
      >
        {!isMe && showSenderName && (
          <p
            className="mb-0.5 text-[11px] font-semibold"
            style={senderNameColor ? { color: senderNameColor } : undefined}
          >
            {showSenderName}
          </p>
        )}
        <p
          className={`whitespace-pre-wrap text-[14.5px] leading-snug ${
            isMe ? theme.meText : theme.otherText
          }`}
        >
          {message.text}
        </p>
        <div className="mt-0.5 flex items-center justify-end gap-1">
          <span
            className={`text-[11px] ${isMe ? theme.timeMe : theme.timeOther}`}
          >
            {message.timestamp}
          </span>
          {isMe && theme.showReadTicks && (
            <ReadTicks status={message.readStatus} />
          )}
        </div>
      </div>
    </div>
  );
}
