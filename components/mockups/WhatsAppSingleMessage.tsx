"use client";

import type { ChatBackground } from "@/lib/types";
import {
  chatBackgroundDefaults,
  resolveChatBackground,
} from "@/lib/chat-background";
import type { Message } from "@/lib/types";
import { ChatBubble } from "./bubbles/ChatBubble";

export function WhatsAppSingleMessage({
  message,
  chatBackground,
}: {
  message: Message;
  chatBackground?: ChatBackground;
}) {
  const bodyStyle = resolveChatBackground(
    chatBackground,
    chatBackgroundDefaults.whatsapp
  );

  return (
    <div
      className="flex min-h-full flex-col justify-end p-4"
      style={bodyStyle}
    >
      <ChatBubble message={message} themeId="whatsapp" />
    </div>
  );
}
