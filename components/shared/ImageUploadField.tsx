"use client";

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
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-violet-300/80">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="text-sm text-zinc-400 file:mr-2 file:rounded-lg file:border-0 file:bg-violet-600/30 file:px-3 file:py-1 file:text-xs file:text-violet-200"
        />
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
