"use client";

import Link from "next/link";
import { type ReactNode, useRef } from "react";
import { ExportToolbar } from "./ExportToolbar";
import { PhoneFrame } from "./PhoneFrame";

interface EditorLayoutProps {
  title: string;
  platform: string;
  backHref?: string;
  onReset: () => void;
  editor: ReactNode;
  preview: ReactNode;
  showBubbleExport?: boolean;
  bubblesPreview?: ReactNode;
}

export function EditorLayout({
  title,
  platform,
  backHref = "/",
  onReset,
  editor,
  preview,
  showBubbleExport = false,
  bubblesPreview,
}: EditorLayoutProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href={backHref}
              className="text-sm text-zinc-500 hover:text-zinc-800"
            >
              ← Indietro
            </Link>
            <h1 className="text-xl font-bold text-zinc-900">{title}</h1>
            <p className="text-xs text-zinc-500">
              Usa solo per demo autorizzate
            </p>
          </div>
          <ExportToolbar
            exportRef={exportRef}
            platform={platform}
            onReset={onReset}
            bubblesRef={bubblesRef}
            showBubbleExport={showBubbleExport}
          />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-4 sm:p-8 lg:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Editor
          </h2>
          {editor}
        </section>
        <section className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm sm:p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Anteprima schermo
            </h2>
            <PhoneFrame ref={exportRef}>{preview}</PhoneFrame>
          </div>
          {showBubbleExport && bubblesPreview && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm sm:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                Anteprima bolle (export trasparente)
              </h2>
              <div className="flex justify-center rounded-lg bg-[repeating-conic-gradient(#e4e4e7_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-4">
                <div ref={bubblesRef}>{bubblesPreview}</div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
