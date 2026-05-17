"use client";

import { type ReactNode, useRef, useState } from "react";
import { BackgroundPills } from "./BackgroundPills";
import { ExportToolbar } from "./ExportToolbar";
import { PhoneFrame } from "./PhoneFrame";
import { BackLink } from "./BackLink";
import { PageShell } from "./PageShell";
import { PreviewBackgroundProvider } from "./PreviewBackgroundContext";

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
  const [showBackground, setShowBackground] = useState(true);

  return (
    <PageShell showHeader={false}>
      <header className="relative border-b border-violet-500/10 bg-black/50 px-4 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <BackLink href={backHref}>Indietro</BackLink>
            <h1 className="mt-1 text-xl font-bold text-white">{title}</h1>
          </div>
          <ExportToolbar
            exportRef={exportRef}
            platform={platform}
            onReset={onReset}
            showBackground={showBackground}
          />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-4 sm:p-8 lg:grid-cols-2">
        <section className="editor-panel">
          <h2 className="editor-label mb-4">Editor</h2>
          {editor}
        </section>
        <section className="space-y-4">
          <PreviewBackgroundProvider showBackground={showBackground}>
            <div className="editor-panel">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="editor-label">Anteprima schermo</h2>
                <BackgroundPills
                  showBackground={showBackground}
                  onChange={setShowBackground}
                />
              </div>
              <div
                className={
                  showBackground
                    ? "flex justify-center"
                    : "flex justify-center rounded-xl border border-violet-500/10 bg-[repeating-conic-gradient(rgba(139,92,246,0.08)_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-4"
                }
              >
                <PhoneFrame ref={exportRef} showBackground={showBackground}>
                  {preview}
                </PhoneFrame>
              </div>
            </div>
            {showBubbleExport && bubblesPreview && (
              <div className="editor-panel">
                <h2 className="editor-label mb-4">Anteprima messaggi</h2>
                <div className="flex justify-center rounded-xl border border-violet-500/10 bg-[repeating-conic-gradient(rgba(139,92,246,0.08)_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-4">
                  <div>{bubblesPreview}</div>
                </div>
              </div>
            )}
          </PreviewBackgroundProvider>
        </section>
      </div>
    </PageShell>
  );
}
