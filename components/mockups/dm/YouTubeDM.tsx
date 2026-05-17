"use client";

import type { DMChatState } from "@/lib/types";
import { DMChatShell } from "./DMChatShell";

export function YouTubeDM({ state }: { state: DMChatState }) {
  return (
    <DMChatShell
      state={state}
      themeId="youtube"
      headerBg="bg-[#0f0f0f]"
      headerText="text-white"
      bodyBg="bg-[#0f0f0f]"
      platformLabel="Posta"
      inputPlaceholder="Scrivi un messaggio..."
    />
  );
}
