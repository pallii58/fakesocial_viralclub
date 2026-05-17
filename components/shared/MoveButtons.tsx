interface MoveButtonsProps {
  onUp: () => void;
  onDown: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
}

export function MoveButtons({
  onUp,
  onDown,
  disableUp,
  disableDown,
}: MoveButtonsProps) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={onUp}
        disabled={disableUp}
        className="rounded border border-violet-500/25 bg-violet-950/30 px-2 py-0.5 text-xs text-violet-300 disabled:opacity-30"
        aria-label="Sposta su"
      >
        ↑
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={disableDown}
        className="rounded border border-violet-500/25 bg-violet-950/30 px-2 py-0.5 text-xs text-violet-300 disabled:opacity-30"
        aria-label="Sposta giù"
      >
        ↓
      </button>
    </div>
  );
}
