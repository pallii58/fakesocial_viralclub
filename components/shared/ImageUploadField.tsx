"use client";

import { useId } from "react";

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
}

export function ImageUploadField({
  label,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputId = useId();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <span className="editor-label block normal-case">{label}</span>
      <div className="flex flex-col gap-3">
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="sr-only"
        />
        <label htmlFor={inputId} className="editor-dashed-btn block">
          Scegli file
        </label>
      </div>
      {value && (
        <div className="mt-2 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-16 w-16 shrink-0 rounded-full border border-violet-500/20 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-xs text-red-400 hover:text-red-300"
          >
            Rimuovi
          </button>
        </div>
      )}
    </div>
  );
}
