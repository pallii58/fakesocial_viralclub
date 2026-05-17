"use client";

import { type ReactNode, useRef } from "react";
import { ExportToolbar } from "./ExportToolbar";
import { PhoneFrame } from "./PhoneFrame";
import { BackLink } from "./BackLink";
import { PageShell } from "./PageShell";

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

  return (
    <PageShell showHeader={false}>
      <header className="relative border-b border-violet-500/10 bg-black/50 px-4 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <BackLink href={backHref}>Indietro</BackLink>
            <h1 className="mt-1 text-xl font-bold text-white">{title}</h1>
            <p className="text-xs text-zinc-500">Usa solo per demo autorizzate</p>
          </div>
          <ExportToolbar exportRef={exportRef} platform={platform} />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-4 sm:p-8 lg:grid-cols-2">
        <section className="editor-panel">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="editor-label">Editor</h2>
            <button type="button" onClick={onReset} className="btn-ghost px-3 py-1.5 text-xs">
              Reset
            </button>
          </div>
          {editor}
        </section>
        <section className="space-y-4">
          <div className="editor-panel">
            <h2 className="editor-label mb-4">Anteprima schermo</h2>
            <PhoneFrame ref={exportRef}>{preview}</PhoneFrame>
          </div>
          {showBubbleExport && bubblesPreview && (
            <div className="editor-panel">
              <h2 className="editor-label mb-4">
                Anteprima messaggi
              </h2>
              <div className="flex justify-center rounded-xl border border-violet-500/10 bg-[repeating-conic-gradient(rgba(139,92,246,0.08)_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-4">
                <div>{bubblesPreview}</div>
              </div>
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}
