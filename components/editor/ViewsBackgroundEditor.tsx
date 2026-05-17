"use client";

import type { ViewsBackgroundMode, ViewsCounterBackground } from "@/lib/types";
import {
  defaultViewsCounterBackground,
  viewsCounterBackgroundDefaults,
} from "@/lib/views-counter-background";
import { ColorPicker } from "@/components/shared/ColorPicker";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { Select } from "@/components/shared/Select";

interface ViewsBackgroundEditorProps {
  value?: ViewsCounterBackground;
  onChange: (value: ViewsCounterBackground) => void;
}

export function ViewsBackgroundEditor({
  value,
  onChange,
}: ViewsBackgroundEditorProps) {
  const bg = value ?? defaultViewsCounterBackground();
  const mode = bg.mode;
  const { gradientFrom, gradientTo, solidColor } =
    viewsCounterBackgroundDefaults;

  const setMode = (next: ViewsBackgroundMode) => {
    if (next === "default") {
      onChange({ mode: "default" });
      return;
    }
    if (next === "solid") {
      onChange({ mode: "solid", color: bg.color ?? solidColor });
      return;
    }
    if (next === "gradient") {
      onChange({
        mode: "gradient",
        gradientFrom: bg.gradientFrom ?? gradientFrom,
        gradientTo: bg.gradientTo ?? gradientTo,
      });
      return;
    }
    onChange({ mode: "image", image: bg.image });
  };

  return (
    <div className="editor-block">
      <span className="editor-label block">Sfondo</span>
      <div className="editor-block-fields">
        <Select
          value={mode}
          onChange={(v) => setMode(v as ViewsBackgroundMode)}
          options={[
            { value: "default", label: "Predefinito" },
            { value: "gradient", label: "Gradiente personalizzato" },
            { value: "solid", label: "Tinta unita" },
            { value: "image", label: "Immagine" },
          ]}
        />
        {mode === "solid" && (
          <ColorPicker
            value={bg.color ?? solidColor}
            onChange={(color) => onChange({ mode: "solid", color })}
            ariaLabel="Colore sfondo"
            presets={[
              solidColor,
              "#000000",
              "#1a1a1a",
              "#6b6b6b",
              "#9a9a9a",
              "#ffffff",
              "#0095f6",
            ]}
          />
        )}
        {mode === "gradient" && (
          <>
            <ColorPicker
              value={bg.gradientFrom ?? gradientFrom}
              onChange={(gradientFrom) =>
                onChange({
                  mode: "gradient",
                  gradientFrom,
                  gradientTo: bg.gradientTo ?? gradientTo,
                })
              }
              ariaLabel="Colore gradiente alto"
              presets={[gradientFrom, "#9a9a9a", "#6b7280", "#374151"]}
            />
            <ColorPicker
              value={bg.gradientTo ?? gradientTo}
              onChange={(gradientTo) =>
                onChange({
                  mode: "gradient",
                  gradientFrom: bg.gradientFrom ?? gradientFrom,
                  gradientTo,
                })
              }
              ariaLabel="Colore gradiente basso"
              presets={[gradientTo, "#4a4a4a", "#1f2937", "#000000"]}
            />
          </>
        )}
        {mode === "image" && (
          <ImageUploadField
            label="Carica immagine"
            value={bg.image}
            onChange={(image) => onChange({ mode: "image", image })}
          />
        )}
      </div>
    </div>
  );
}
