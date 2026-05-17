"use client";

import { genId, newComment } from "@/lib/defaults";
import type { Comment } from "@/lib/types";
import { Checkbox } from "@/components/shared/Checkbox";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { MoveButtons } from "@/components/shared/MoveButtons";

interface CommentListEditorProps {
  comments: Comment[];
  onChange: (comments: Comment[]) => void;
}

function CommentItemEditor({
  comment,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  disableUp,
  disableDown,
  label,
}: {
  comment: Comment;
  onUpdate: (c: Comment) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  disableUp: boolean;
  disableDown: boolean;
  label: string;
}) {
  return (
    <div className="space-y-2 rounded-lg border border-violet-500/15 bg-black/30 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-violet-400/70">{label}</span>
        <div className="flex items-center gap-2">
          <MoveButtons
            onUp={onMoveUp}
            onDown={onMoveDown}
            disableUp={disableUp}
            disableDown={disableDown}
          />
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-red-400 hover:text-red-300"
          >
            Elimina
          </button>
        </div>
      </div>
      <input
        value={comment.author}
        onChange={(e) => onUpdate({ ...comment, author: e.target.value })}
        className="editor-input"
        placeholder="Username"
      />
      <ImageUploadField
        label="Immagine profilo"
        value={comment.avatar}
        onChange={(avatar) => onUpdate({ ...comment, avatar })}
      />
      <textarea
        value={comment.text}
        onChange={(e) => onUpdate({ ...comment, text: e.target.value })}
        rows={2}
        className="editor-input"
        placeholder="Testo commento"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          value={comment.likes}
          onChange={(e) =>
            onUpdate({ ...comment, likes: parseInt(e.target.value) || 0 })
          }
          className="editor-input"
          placeholder="Like"
        />
        <input
          value={comment.timestamp}
          onChange={(e) => onUpdate({ ...comment, timestamp: e.target.value })}
          className="editor-input"
          placeholder="Tempo (es. 2h)"
        />
      </div>
      <Checkbox
        label="Badge verificato"
        checked={comment.verified ?? false}
        onChange={(verified) => onUpdate({ ...comment, verified })}
      />
    </div>
  );
}

export function CommentListEditor({
  comments,
  onChange,
}: CommentListEditorProps) {
  const updateAt = (index: number, c: Comment) => {
    const copy = [...comments];
    copy[index] = c;
    onChange(copy);
  };

  const removeAt = (index: number) => {
    onChange(comments.filter((_, i) => i !== index));
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = index + dir;
    if (next < 0 || next >= comments.length) return;
    const copy = [...comments];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    onChange(copy);
  };

  const addReply = (index: number) => {
    const copy = [...comments];
    const c = copy[index];
    const replies = c.replies ?? [];
    copy[index] = {
      ...c,
      replies: [...replies, { ...newComment("risposta"), id: genId() }],
    };
    onChange(copy);
  };

  return (
    <div className="space-y-4">
      {comments.map((comment, i) => (
        <div key={comment.id} className="space-y-3">
          <CommentItemEditor
            comment={comment}
            label={`Commento ${i + 1}`}
            onUpdate={(c) => updateAt(i, c)}
            onRemove={() => removeAt(i)}
            onMoveUp={() => move(i, -1)}
            onMoveDown={() => move(i, 1)}
            disableUp={i === 0}
            disableDown={i === comments.length - 1}
          />
          {(comment.replies ?? []).map((reply, ri) => (
            <div key={reply.id} className="ml-4 border-l-2 border-violet-500/20 pl-3">
              <CommentItemEditor
                comment={reply}
                label={`Risposta ${ri + 1}`}
                onUpdate={(r) => {
                  const replies = [...(comment.replies ?? [])];
                  replies[ri] = r;
                  updateAt(i, { ...comment, replies });
                }}
                onRemove={() => {
                  const replies = (comment.replies ?? []).filter(
                    (_, j) => j !== ri
                  );
                  updateAt(i, { ...comment, replies });
                }}
                onMoveUp={() => {}}
                onMoveDown={() => {}}
                disableUp
                disableDown
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addReply(i)}
            className="ml-4 text-xs text-violet-400 hover:text-violet-300"
          >
            + Aggiungi risposta
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...comments, newComment()])}
        className="w-full rounded-lg border-2 border-dashed border-violet-500/25 py-2.5 text-sm font-medium text-violet-300/80 hover:border-violet-400/50 hover:bg-violet-950/30"
      >
        + Aggiungi commento
      </button>
    </div>
  );
}
