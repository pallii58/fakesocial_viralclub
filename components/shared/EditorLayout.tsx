"use client";

import { type ReactNode, useRef, useState } from "react";
import { BackgroundPills } from "./BackgroundPills";
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
  preview?: ReactNode;
  showBubbleExport?: boolean;
  bubblesPreview?: ReactNode;
  /** Anteprima ed export solo bolle su sfondo trasparente (es. singolo messaggio) */
  bubbleOnlyPreview?: boolean;
}

const checkerboardClass =
  "flex justify-center rounded-xl border border-violet-500/10 bg-[repeating-conic-gradient(rgba(139,92,246,0.08)_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-4";

export function EditorLayout({
  title,
  platform,
  backHref = "/",
  onReset,
  editor,
  preview,
  showBubbleExport = false,
  bubblesPreview,
  bubbleOnlyPreview = false,
}: EditorLayoutProps) {
  const hasBubblesView = Boolean(
    bubbleOnlyPreview || (showBubbleExport && bubblesPreview)
  );
  const [showBackground, setShowBackground] = useState(!bubbleOnlyPreview);
  const exportRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  const usePhoneView =
    !bubbleOnlyPreview && preview != null && (!hasBubblesView || showBackground);
  const activeExportRef = usePhoneView ? exportRef : bubblesRef;

  return (
    <PageShell showHeader={false}>
      <header className="relative border-b border-violet-500/10 bg-black/50 px-4 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <BackLink href={backHref}>Indietro</BackLink>
            <h1 className="mt-1 text-xl font-bold text-white">{title}</h1>
          </div>
          <ExportToolbar
            exportRef={activeExportRef}
            platform={platform}
            onReset={onReset}
            transparentExport={hasBubblesView}
            exportSuffix={
              bubbleOnlyPreview || (hasBubblesView && !showBackground)
                ? "-messaggi"
                : ""
            }
          />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-4 sm:p-8 lg:grid-cols-2">
        <section className="editor-panel">
          <h2 className="editor-label mb-4">Editor</h2>
          {editor}
        </section>
        <section className="space-y-4">
          <div className="editor-panel">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="editor-label">Anteprima</h2>
              {hasBubblesView && !bubbleOnlyPreview && (
                <BackgroundPills
                  showBackground={showBackground}
                  onChange={setShowBackground}
                />
              )}
            </div>

            {usePhoneView ? (
              <div className="flex justify-center">
                <PhoneFrame ref={exportRef}>{preview}</PhoneFrame>
              </div>
            ) : (
              <div className={checkerboardClass}>
                <div ref={bubblesRef}>{bubblesPreview}</div>
              </div>
            )}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
