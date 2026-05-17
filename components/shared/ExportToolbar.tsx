"use client";

import { exportMock } from "@/lib/export-image";

interface ExportToolbarProps {
  exportRef: React.RefObject<HTMLDivElement | null>;
  platform: string;
  onReset: () => void;
  transparentExport?: boolean;
  exportSuffix?: string;
}

export function ExportToolbar({
  exportRef,
  platform,
  onReset,
  transparentExport = false,
  exportSuffix = "",
}: ExportToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() =>
          exportMock(exportRef.current, platform, "png", exportSuffix, {
            transparent: transparentExport,
          })
        }
        className="btn-primary"
      >
        Scarica
      </button>
      <button type="button" onClick={onReset} className="btn-ghost">
        Reset
      </button>
    </div>
  );
}
