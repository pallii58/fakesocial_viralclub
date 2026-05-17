"use client";

import type { ChatBackground, ChatBackgroundMode } from "@/lib/types";
import { ColorPicker } from "@/components/shared/ColorPicker";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { Select } from "@/components/shared/Select";
import { defaultChatBackground } from "@/lib/chat-background";

interface ChatBackgroundEditorProps {
  value?: ChatBackground;
  onChange: (value: ChatBackground) => void;
  defaultColor: string;
}

export function ChatBackgroundEditor({
  value,
  onChange,
  defaultColor,
}: ChatBackgroundEditorProps) {
  const bg = value ?? defaultChatBackground();
  const mode = bg.mode;

  const setMode = (next: ChatBackgroundMode) => {
    if (next === "default") {
      onChange({ mode: "default" });
      return;
    }
    if (next === "solid") {
      onChange({ mode: "solid", color: bg.color ?? defaultColor });
      return;
    }
    onChange({ mode: "image", image: bg.image });
  };

  return (
    <div className="editor-block">
      <span className="editor-label block">Sfondo chat</span>
      <div className="editor-block-fields">
        <Select
          value={mode}
          onChange={(v) => setMode(v as ChatBackgroundMode)}
          options={[
            { value: "default", label: "Predefinito" },
            { value: "solid", label: "Tinta unita" },
            { value: "image", label: "Immagine" },
          ]}
        />
        {mode === "solid" && (
          <ColorPicker
          value={bg.color ?? defaultColor}
          onChange={(color) => onChange({ mode: "solid", color })}
          ariaLabel="Colore sfondo chat"
          presets={[
            defaultColor,
            "#ffffff",
            "#d9fdd3",
            "#008069",
            "#211b12",
            "#1a1a2e",
            "#0f0f0f",
          ]}
          />
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
