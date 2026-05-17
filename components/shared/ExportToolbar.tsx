"use client";

import { exportMock } from "@/lib/export-image";

interface ExportToolbarProps {
  exportRef: React.RefObject<HTMLDivElement | null>;
  platform: string;
}

export function ExportToolbar({ exportRef, platform }: ExportToolbarProps) {
  return (
    <button
      type="button"
      onClick={() => exportMock(exportRef.current, platform, "png")}
      className="btn-primary"
    >
      Scarica
    </button>
  );
}
