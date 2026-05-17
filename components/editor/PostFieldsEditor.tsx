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
    <div className="editor-block">
      <span className="editor-label block">Post / Video</span>
      <input
        value={post.author}
        onChange={(e) => set({ author: e.target.value })}
        className="editor-input"
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
        className="editor-input"
        placeholder="Didascalia / titolo"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          value={post.likes}
          onChange={(e) => set({ likes: parseInt(e.target.value) || 0 })}
          className="editor-input"
          placeholder="Like / views"
        />
        <input
          value={post.timestamp ?? ""}
          onChange={(e) => set({ timestamp: e.target.value })}
          className="editor-input"
          placeholder="Tempo (es. 3 ore fa)"
        />
      </div>
      <ImageUploadField
        label="Immagine profilo autore"
        value={post.avatar}
        onChange={(avatar) => set({ avatar })}
      />
      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input
          type="checkbox"
          checked={post.verified ?? false}
          onChange={(e) => set({ verified: e.target.checked })}
          className="accent-violet-500"
        />
        Account verificato
      </label>
    </div>
  );
}
