"use client";

import { useState } from "react";
import { Checkbox } from "@/components/shared/Checkbox";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { InstagramSingleComment } from "@/components/mockups/InstagramSingleComment";
import { defaultInstagramSingleComment } from "@/lib/defaults";
import type { Comment } from "@/lib/types";

export default function InstagramSingleCommentPage() {
  const [comment, setComment] = useState<Comment>(defaultInstagramSingleComment);

  const update = (patch: Partial<Comment>) => {
    setComment((prev) => ({ ...prev, ...patch }));
  };

  return (
    <EditorLayout
      title="Instagram · Commento singolo"
      platform="instagram-comment"
      backHref="/instagram"
      onReset={() => setComment(defaultInstagramSingleComment())}
      bubbleOnlyPreview
      showBubbleExport
      bubblesPreview={<InstagramSingleComment comment={comment} />}
      editor={
        <div className="editor-fields">
          <input
            value={comment.author}
            onChange={(e) => update({ author: e.target.value })}
            className="editor-input"
            placeholder="Username"
          />
          <ImageUploadField
            label="Immagine profilo"
            value={comment.avatar}
            onChange={(avatar) => update({ avatar })}
          />
          <textarea
            value={comment.text}
            onChange={(e) => update({ text: e.target.value })}
            rows={3}
            className="editor-input min-h-[80px]"
            placeholder="Testo commento"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={comment.likes}
              onChange={(e) =>
                update({ likes: parseInt(e.target.value, 10) || 0 })
              }
              className="editor-input"
              placeholder="Mi piace"
            />
            <input
              value={comment.timestamp}
              onChange={(e) => update({ timestamp: e.target.value })}
              className="editor-input"
              placeholder="Tempo (es. 2h)"
            />
          </div>
          <Checkbox
            label="Mostra tempo, Mi piace e Rispondi"
            checked={comment.showCommentMeta !== false}
            onChange={(showCommentMeta) => update({ showCommentMeta })}
          />
          <Checkbox
            label="Spunta blu (verificato)"
            checked={comment.verified ?? false}
            onChange={(verified) => update({ verified })}
          />
        </div>
      }
    />
  );
}
