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
    <div className="space-y-1">
      <span className="block text-sm font-medium text-violet-300/80">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="sr-only"
        />
        <label htmlFor={inputId} className="file-upload-btn">
          <span className="file-upload-cursor" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3l14 9-6.5 1.5L11 21 5 3z" />
            </svg>
          </span>
          Scegli file
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-xs text-red-400 hover:text-red-300"
          >
            Rimuovi
          </button>
        )}
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-1 h-16 w-16 rounded-full border border-violet-500/20 object-cover"
        />
      )}
    </div>
  );
}
