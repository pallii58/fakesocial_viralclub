"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  hexToHsv,
  hsvToCssHue,
  hsvToHex,
  normalizeHex,
  type Hsv,
} from "@/lib/color-utils";

export interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  ariaLabel?: string;
  presets?: string[];
  disabled?: boolean;
  className?: string;
}

const DEFAULT_PRESETS = [
  "#efeae2",
  "#ffffff",
  "#d9fdd3",
  "#008069",
  "#211b12",
  "#1a1a2e",
  "#0f0f0f",
  "#fef3c7",
  "#fecdd3",
  "#bfdbfe",
];

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function uniquePresets(colors: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const c of colors) {
    const hex = normalizeHex(c) ?? c;
    if (seen.has(hex)) continue;
    seen.add(hex);
    out.push(hex);
  }
  return out;
}

export function ColorPicker({
  value,
  onChange,
  ariaLabel = "Seleziona colore",
  presets = DEFAULT_PRESETS,
  disabled = false,
  className = "",
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const satRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const safeHex = normalizeHex(value) ?? normalizeHex("#efeae2")!;
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(safeHex));
  const [hexDraft, setHexDraft] = useState(safeHex);
  const [hexFocused, setHexFocused] = useState(false);
  const hsvRef = useRef(hsv);
  hsvRef.current = hsv;

  const presetList = uniquePresets(presets);

  const applyHsv = useCallback(
    (next: Hsv) => {
      hsvRef.current = next;
      setHsv(next);
      const hex = hsvToHex(next);
      onChange(hex);
      if (!hexFocused) setHexDraft(hex);
    },
    [onChange, hexFocused]
  );

  useEffect(() => {
    const next = normalizeHex(value);
    if (!next) return;
    const nextHsv = hexToHsv(next);
    if (hsvToHex(hsvRef.current) !== next) {
      hsvRef.current = nextHsv;
      setHsv(nextHsv);
    }
    if (!hexFocused) setHexDraft(next);
  }, [value, hexFocused]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const pickFromSaturation = useCallback(
    (clientX: number, clientY: number) => {
      const el = satRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const s = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      const v = clamp(100 - ((clientY - rect.top) / rect.height) * 100, 0, 100);
      applyHsv({ ...hsvRef.current, s, v });
    },
    [applyHsv]
  );

  const onSatPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    satRef.current?.setPointerCapture(e.pointerId);
    pickFromSaturation(e.clientX, e.clientY);
  };

  const onSatPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    pickFromSaturation(e.clientX, e.clientY);
  };

  const onHueChange = (hue: number) => {
    applyHsv({ ...hsvRef.current, h: hue });
  };

  const onHexInputChange = (raw: string) => {
    setHexDraft(raw);
    const n = normalizeHex(raw);
    if (n) applyHsv(hexToHsv(n));
  };

  const onHexBlur = () => {
    setHexFocused(false);
    const n = normalizeHex(hexDraft);
    if (n) {
      setHexDraft(n);
      if (n !== safeHex) applyHsv(hexToHsv(n));
    } else {
      setHexDraft(safeHex);
    }
  };

  const satX = `${hsv.s}%`;
  const satY = `${100 - hsv.v}%`;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={panelId}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        className="color-picker-trigger"
      >
        <span
          className="color-picker-swatch"
          style={{ backgroundColor: safeHex }}
          aria-hidden
        />
        <span className="font-mono text-xs uppercase text-zinc-300">
          {safeHex}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`ml-auto shrink-0 text-violet-400/80 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={ariaLabel}
          className="color-picker-panel"
        >
          <div
            ref={satRef}
            className="color-picker-saturation"
            style={{ backgroundColor: hsvToCssHue(hsv.h) }}
            onPointerDown={onSatPointerDown}
            onPointerMove={onSatPointerMove}
          >
            <div className="color-picker-saturation-white" />
            <div className="color-picker-saturation-black" />
            <div
              className="color-picker-cursor"
              style={{ left: satX, top: satY }}
              aria-hidden
            />
          </div>

          <div className="color-picker-hue-wrap">
            <input
              type="range"
              min={0}
              max={360}
              value={Math.round(hsv.h)}
              onChange={(e) => onHueChange(Number(e.target.value))}
              className="color-picker-hue"
              aria-label="Tonalità"
            />
          </div>

          <div className="flex items-center gap-2">
            <span
              className="h-9 w-9 shrink-0 rounded-lg border border-violet-500/25"
              style={{ backgroundColor: safeHex }}
              aria-hidden
            />
            <input
              type="text"
              value={hexDraft}
              onChange={(e) => onHexInputChange(e.target.value)}
              onFocus={() => setHexFocused(true)}
              onBlur={onHexBlur}
              className="editor-input flex-1 font-mono text-xs uppercase"
              placeholder="#rrggbb"
              spellCheck={false}
            />
          </div>

          {presetList.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {presetList.map((hex) => {
                const selected = hex === safeHex;
                return (
                  <button
                    key={hex}
                    type="button"
                    title={hex}
                    aria-label={`Colore ${hex}`}
                    aria-pressed={selected}
                    onClick={() => applyHsv(hexToHsv(hex))}
                    className={`color-picker-preset ${selected ? "color-picker-preset-selected" : ""}`}
                    style={{ backgroundColor: hex }}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
