"use client";

import type { ViewMode } from "@/lib/types";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex rounded-lg border border-zinc-200 p-1">
      <button
        type="button"
        onClick={() => onChange("full")}
        className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
          value === "full"
            ? "bg-zinc-900 text-white"
            : "text-zinc-600 hover:bg-zinc-50"
        }`}
      >
        Post + commenti
      </button>
      <button
        type="button"
        onClick={() => onChange("comments-only")}
        className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
          value === "comments-only"
            ? "bg-zinc-900 text-white"
            : "text-zinc-600 hover:bg-zinc-50"
        }`}
      >
        Solo commenti
      </button>
    </div>
  );
}
