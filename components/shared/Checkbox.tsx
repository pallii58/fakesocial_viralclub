"use client";

import { useId } from "react";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({
  label,
  checked,
  onChange,
  id,
  disabled = false,
  className = "",
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={`editor-checkbox ${disabled ? "editor-checkbox-disabled" : ""} ${className}`.trim()}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="editor-checkbox-input"
      />
      <span className="editor-checkbox-box" aria-hidden>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`editor-checkbox-icon ${checked ? "opacity-100" : "opacity-0"}`}
        >
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="editor-checkbox-label">{label}</span>
    </label>
  );
}
