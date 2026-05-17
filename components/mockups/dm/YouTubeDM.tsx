"use client";

import { chatBackgroundDefaults } from "@/lib/chat-background";
import type { DMChatState } from "@/lib/types";
import { DMChatShell } from "./DMChatShell";

export function YouTubeDM({ state }: { state: DMChatState }) {
  return (
    <DMChatShell
      state={state}
      themeId="youtube"
      headerBg="bg-[#0f0f0f]"
      headerText="text-white"
      backgroundDefaults={chatBackgroundDefaults.youtube}
      platformLabel="Posta"
    />
  );
}
