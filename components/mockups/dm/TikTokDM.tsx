"use client";

import type { DMChatState } from "@/lib/types";
import { DMChatShell } from "./DMChatShell";

export function TikTokDM({ state }: { state: DMChatState }) {
  return (
    <DMChatShell
      state={state}
      themeId="tiktok"
      headerBg="bg-black"
      headerText="text-white"
      bodyBg="bg-black"
      inputPlaceholder="Invia un messaggio..."
    />
  );
}
