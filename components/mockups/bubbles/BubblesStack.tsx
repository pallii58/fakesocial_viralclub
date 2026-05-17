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
  getTrailingSenderAvatar?: (sender: string) => string | undefined;
  getSenderVerified?: (sender: string) => boolean;
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
      getTrailingSenderAvatar,
      getSenderVerified,
      className = "",
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        id="bubbles-export-root"
        className={`mx-auto block w-full min-w-[360px] max-w-[400px] space-y-2.5 p-6 ${className}`}
        style={{ background: "transparent" }}
      >
        {messages.map((msg, i) => {
          const prev = messages[i - 1];
          const showAvatar = !prev || prev.sender !== msg.sender;
          const isMe = msg.sender === "me";
          const showName =
            getSenderName && !isMe && showAvatar
              ? getSenderName(String(msg.sender))
              : undefined;
          const nameColor =
            getSenderNameColor && !isMe && showAvatar
              ? getSenderNameColor(String(msg.sender))
              : undefined;
          const senderAvatar =
            getSenderAvatar && !isMe
              ? showAvatar
                ? {
                    name:
                      getSenderName?.(String(msg.sender)) ??
                      String(msg.sender),
                    src: getSenderAvatar(String(msg.sender)),
                  }
                : false
              : undefined;
          const trailingAvatar =
            getTrailingSenderAvatar && isMe
              ? showAvatar
                ? {
                    name: getSenderName?.("me") ?? "Tu",
                    src: getTrailingSenderAvatar("me"),
                  }
                : false
              : undefined;
          const senderNameVerified =
            getSenderVerified && !isMe && showAvatar
              ? getSenderVerified(String(msg.sender))
              : false;
          return (
            <ChatBubble
              key={msg.id}
              message={msg}
              themeId={themeId}
              showSenderName={showName}
              senderNameVerified={senderNameVerified}
              senderNameColor={nameColor}
              senderAvatar={senderAvatar}
              trailingAvatar={trailingAvatar}
            />
          );
        })}
      </div>
    );
  }
);
