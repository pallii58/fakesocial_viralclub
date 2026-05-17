"use client";

import type { Message } from "@/lib/types";
import { usePreviewBackground } from "@/components/shared/PreviewBackgroundContext";
import { ChatBubble } from "./bubbles/ChatBubble";

const WA_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cdc4' fill-opacity='0.35'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

export function WhatsAppSingleMessage({ message }: { message: Message }) {
  const { showBackground } = usePreviewBackground();

  return (
    <div
      className={`flex min-h-full flex-col justify-end p-4 ${
        showBackground ? "bg-[#efeae2]" : "bg-transparent"
      }`}
      style={showBackground ? { backgroundImage: WA_PATTERN } : undefined}
    >
      <ChatBubble message={message} themeId="whatsapp" />
    </div>
  );
}
