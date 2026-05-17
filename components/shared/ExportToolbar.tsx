"use client";

import { exportMock } from "@/lib/export-image";

interface ExportToolbarProps {
  exportRef: React.RefObject<HTMLDivElement | null>;
  platform: string;
  onReset: () => void;
}

export function ExportToolbar({
  exportRef,
  platform,
  onReset,
}: ExportToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => exportMock(exportRef.current, platform, "png")}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Scarica PNG
      </button>
      <button
        type="button"
        onClick={() => exportMock(exportRef.current, platform, "jpeg")}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Scarica JPG
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
      >
        Reset
      </button>
    </div>
  );
}
