"use client";

import { forwardRef } from "react";
import type { ChatThemeId } from "@/lib/chat-themes";
import type { Message } from "@/lib/types";
import { ChatBubble } from "./ChatBubble";

interface BubblesStackProps {
  messages: Message[];
  themeId: ChatThemeId;
  getSenderName?: (sender: string) => string | undefined;
  className?: string;
}

export const BubblesStack = forwardRef<HTMLDivElement, BubblesStackProps>(
  function BubblesStack(
    { messages, themeId, getSenderName, className = "" },
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
          const showName =
            getSenderName &&
            msg.sender !== "me" &&
            (!prev || prev.sender !== msg.sender)
              ? getSenderName(String(msg.sender))
              : undefined;
          return (
            <ChatBubble
              key={msg.id}
              message={msg}
              themeId={themeId}
              showSenderName={showName}
            />
          );
        })}
      </div>
    );
  }
);
