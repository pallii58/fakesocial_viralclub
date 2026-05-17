"use client";

import type { DMChatState } from "@/lib/types";
import { DMChatShell } from "./DMChatShell";

export function FacebookMessenger({ state }: { state: DMChatState }) {
  return (
    <DMChatShell
      state={state}
      themeId="messenger"
      headerBg="bg-white border-b border-zinc-200"
      headerText="text-zinc-900"
      bodyBg="bg-white"
      platformLabel="Messenger"
      inputPlaceholder="Aa"
    />
  );
}
