"use client";

import type { PostContext } from "@/lib/types";
import { ImageUploadField } from "@/components/shared/ImageUploadField";

interface PostFieldsEditorProps {
  post: PostContext;
  onChange: (post: PostContext) => void;
  showImage?: boolean;
}

export function PostFieldsEditor({
  post,
  onChange,
  showImage = true,
}: PostFieldsEditorProps) {
  const set = (patch: Partial<PostContext>) => onChange({ ...post, ...patch });

  return (
    <div className="space-y-3 rounded-lg border border-zinc-200 p-3">
      <h3 className="text-sm font-semibold text-zinc-700">Post / Video</h3>
      <input
        value={post.author}
        onChange={(e) => set({ author: e.target.value })}
        className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
        placeholder="Nome autore / canale"
      />
      {showImage && (
        <ImageUploadField
          label="Immagine / Thumbnail"
          value={post.image}
          onChange={(image) => set({ image })}
        />
      )}
      <textarea
        value={post.caption}
        onChange={(e) => set({ caption: e.target.value })}
        rows={3}
        className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
        placeholder="Didascalia / titolo"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          value={post.likes}
          onChange={(e) => set({ likes: parseInt(e.target.value) || 0 })}
          className="rounded border border-zinc-300 px-2 py-1 text-sm"
          placeholder="Like / views"
        />
        <input
          value={post.timestamp ?? ""}
          onChange={(e) => set({ timestamp: e.target.value })}
          className="rounded border border-zinc-300 px-2 py-1 text-sm"
          placeholder="Tempo (es. 3 ore fa)"
        />
      </div>
      <ImageUploadField
        label="Avatar autore"
        value={post.avatar}
        onChange={(avatar) => set({ avatar })}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={post.verified ?? false}
          onChange={(e) => set({ verified: e.target.checked })}
        />
        Account verificato
      </label>
    </div>
  );
}
