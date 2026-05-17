"use client";

import { createRoot } from "react-dom/client";
import { ChatBubble } from "@/components/mockups/bubbles/ChatBubble";
import type { ChatThemeId } from "@/lib/chat-themes";
import type { Message } from "@/lib/types";
import { exportTransparentPng } from "./export-image";

export async function exportSingleBubble(
  message: Message,
  themeId: ChatThemeId,
  platform: string,
  showSenderName?: string
) {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.background = "transparent";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(
    <ChatBubble
      message={message}
      themeId={themeId}
      showSenderName={showSenderName}
      centered
    />
  );

  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  const bubbleEl = container.firstElementChild as HTMLElement | null;
  if (bubbleEl) {
    await exportTransparentPng(bubbleEl, platform, `-messaggio-${message.id.slice(-6)}`);
  }

  root.unmount();
  document.body.removeChild(container);
}
