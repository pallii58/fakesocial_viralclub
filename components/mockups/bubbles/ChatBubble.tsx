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
  /** Centra la bolla (es. singolo messaggio in export trasparente) */
  centered?: boolean;
  className?: string;
}

export function ChatBubble({
  message,
  themeId,
  showSenderName,
  senderNameColor,
  senderAvatar,
  centered = false,
  className = "",
}: ChatBubbleProps) {
  const theme = chatThemes[themeId];
  const isMe = isMeSender(message.sender);
  const rowAlign = centered
    ? "justify-center"
    : isMe
      ? "justify-end"
      : "justify-start";

  return (
    <div className={`flex w-full gap-1 ${rowAlign} ${className}`}>
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
        className={`max-w-[min(92%,22rem)] px-3.5 py-2 ${isMe ? theme.meBubble : theme.otherBubble}`}
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
