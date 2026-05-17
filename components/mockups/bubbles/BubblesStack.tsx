"use client";

import { forwardRef } from "react";
import type { ChatThemeId } from "@/lib/chat-themes";
import type { Message } from "@/lib/types";
import { ChatBubble } from "./ChatBubble";

interface BubblesStackProps {
  messages: Message[];
  themeId: ChatThemeId;
  getSenderName?: (sender: string) => string | undefined;
  getSenderNameColor?: (sender: string) => string | undefined;
  getSenderAvatar?: (sender: string) => string | undefined;
  className?: string;
}

export const BubblesStack = forwardRef<HTMLDivElement, BubblesStackProps>(
  function BubblesStack(
    {
      messages,
      themeId,
      getSenderName,
      getSenderNameColor,
      getSenderAvatar,
      className = "",
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        id="bubbles-export-root"
        className={`inline-block space-y-2 p-4 ${className}`}
        style={{ background: "transparent" }}
      >
        {messages.map((msg, i) => {
          const prev = messages[i - 1];
          const showSender =
            msg.sender !== "me" && (!prev || prev.sender !== msg.sender);
          const showName =
            getSenderName && showSender
              ? getSenderName(String(msg.sender))
              : undefined;
          const nameColor =
            getSenderNameColor && showSender
              ? getSenderNameColor(String(msg.sender))
              : undefined;
          const senderAvatar =
            getSenderAvatar && msg.sender !== "me"
              ? showSender
                ? {
                    name:
                      getSenderName?.(String(msg.sender)) ??
                      String(msg.sender),
                    src: getSenderAvatar(String(msg.sender)),
                  }
                : false
              : undefined;
          return (
            <ChatBubble
              key={msg.id}
              message={msg}
              themeId={themeId}
              showSenderName={showName}
              senderNameColor={nameColor}
              senderAvatar={senderAvatar}
            />
          );
        })}
      </div>
    );
  }
);
