"use client";

interface BackgroundPillsProps {
  showBackground: boolean;
  onChange: (showBackground: boolean) => void;
}

export function BackgroundPills({
  showBackground,
  onChange,
}: BackgroundPillsProps) {
  return (
    <div className="flex rounded-xl border border-violet-500/20 bg-black/40 p-1">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
          showBackground
            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        Sfondo
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
          !showBackground
            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        Senza sfondo
      </button>
    </div>
  );
}
