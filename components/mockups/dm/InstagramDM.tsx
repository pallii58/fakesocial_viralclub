"use client";

import type { DMChatState } from "@/lib/types";
import { DMChatShell } from "./DMChatShell";

export function InstagramDM({ state }: { state: DMChatState }) {
  return (
    <DMChatShell
      state={state}
      themeId="instagram"
      headerBg="bg-white border-b border-zinc-200"
      headerText="text-zinc-900"
      bodyBg="bg-white"
    />
  );
}
