"use client";

import { chatBackgroundDefaults } from "@/lib/chat-background";
import type { DMChatState } from "@/lib/types";
import { DMChatShell } from "./DMChatShell";

export function TikTokDM({ state }: { state: DMChatState }) {
  return (
    <DMChatShell
      state={state}
      themeId="tiktok"
      headerBg="bg-black"
      headerText="text-white"
      backgroundDefaults={chatBackgroundDefaults.tiktok}
      contactVerified={state.contactVerified}
    />
  );
}
