"use client";

import { chatBackgroundDefaults } from "@/lib/chat-background";
import type { DMChatState } from "@/lib/types";
import { DMChatShell } from "./dm/DMChatShell";

export function WhatsAppDM({ state }: { state: DMChatState }) {
  return (
    <DMChatShell
      state={state}
      themeId="whatsapp"
      headerBg="bg-[#008069]"
      headerText="text-white"
      backgroundDefaults={chatBackgroundDefaults.whatsapp}
    />
  );
}
