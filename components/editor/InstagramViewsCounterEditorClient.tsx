"use client";

import { useState } from "react";
import { defaultInstagramViewsCounter } from "@/lib/defaults";
import { formatViewsCount } from "@/lib/format-views";
import type { ViewsCounterState } from "@/lib/types";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { InstagramViewsCounter } from "@/components/mockups/InstagramViewsCounter";
import { ViewsBackgroundEditor } from "./ViewsBackgroundEditor";

export function InstagramViewsCounterEditorClient() {
  const [state, setState] = useState<ViewsCounterState>(
    defaultInstagramViewsCounter
  );

  const previewLabel = state.label?.trim() || formatViewsCount(state.views);

  return (
    <EditorLayout
      title="Instagram · Counter visualizzazioni"
      platform="instagram-views"
      backHref="/instagram"
      onReset={() => setState(defaultInstagramViewsCounter())}
      bubbleOnlyPreview
      opaqueBubbleExport
      showBubbleExport
      bubblesPreview={<InstagramViewsCounter state={state} />}
      editor={
        <div className="editor-fields">
          <div>
            <label className="editor-label mb-2 block">Visualizzazioni</label>
            <input
              type="number"
              min={0}
              value={state.views}
              onChange={(e) =>
                setState({
                  ...state,
                  views: parseInt(e.target.value, 10) || 0,
                })
              }
              className="editor-input"
              placeholder="17900"
            />
            <p className="mt-1 text-xs text-zinc-500">
              Anteprima: {previewLabel}
            </p>
          </div>
          <div>
            <label className="editor-label mb-2 block">
              Testo personalizzato (opzionale)
            </label>
            <input
              value={state.label ?? ""}
              onChange={(e) =>
                setState({
                  ...state,
                  label: e.target.value || undefined,
                })
              }
              className="editor-input"
              placeholder={formatViewsCount(state.views)}
            />
          </div>
          <ViewsBackgroundEditor
            value={state.background}
            onChange={(background) => setState({ ...state, background })}
          />
        </div>
      }
    />
  );
}
