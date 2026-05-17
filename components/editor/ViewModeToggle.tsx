"use client";

import type { ViewMode } from "@/lib/types";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex rounded-xl border border-violet-500/20 bg-black/40 p-1">
      <button
        type="button"
        onClick={() => onChange("full")}
        className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
          value === "full"
            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        Post + commenti
      </button>
      <button
        type="button"
        onClick={() => onChange("comments-only")}
        className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
          value === "comments-only"
            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        Solo commenti
      </button>
    </div>
  );
}
