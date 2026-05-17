"use client";

import { exportMock, exportTransparentPng } from "@/lib/export-image";

interface ExportToolbarProps {
  exportRef: React.RefObject<HTMLDivElement | null>;
  platform: string;
  onReset: () => void;
  bubblesRef?: React.RefObject<HTMLDivElement | null>;
  showBubbleExport?: boolean;
}

export function ExportToolbar({
  exportRef,
  platform,
  onReset,
  bubblesRef,
  showBubbleExport = false,
}: ExportToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => exportMock(exportRef.current, platform, "png")} className="btn-primary">
        Scarica PNG
      </button>
      <button type="button" onClick={() => exportMock(exportRef.current, platform, "jpeg")} className="btn-secondary">
        Scarica JPG
      </button>
      {showBubbleExport && bubblesRef && (
        <button
          type="button"
          onClick={() => exportTransparentPng(bubblesRef.current, platform, "-messaggi")}
          className="btn-accent"
        >
          PNG messaggi (trasparente)
        </button>
      )}
      <button type="button" onClick={onReset} className="btn-ghost">
        Reset
      </button>
    </div>
  );
}
