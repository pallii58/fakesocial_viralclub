"use client";

import type { DMChatState } from "@/lib/types";
import { DMChatShell } from "./dm/DMChatShell";

export function WhatsAppDM({ state }: { state: DMChatState }) {
  return (
    <DMChatShell
      state={state}
      themeId="whatsapp"
      headerBg="bg-[#008069]"
      headerText="text-white"
      bodyBg="bg-[#efeae2]"
      inputPlaceholder="Messaggio"
    />
  );
}
