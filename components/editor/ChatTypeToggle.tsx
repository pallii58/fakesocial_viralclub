"use client";

import type { WhatsAppChatType } from "@/lib/types";

interface ChatTypeToggleProps {
  value: WhatsAppChatType;
  onChange: (type: WhatsAppChatType) => void;
}

export function ChatTypeToggle({ value, onChange }: ChatTypeToggleProps) {
  return (
    <div className="flex rounded-xl border border-violet-500/20 bg-black/40 p-1">
      <button
        type="button"
        onClick={() => onChange("dm")}
        className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
          value === "dm"
            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        Privata
      </button>
      <button
        type="button"
        onClick={() => onChange("group")}
        className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
          value === "group"
            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        Gruppo
      </button>
    </div>
  );
}
