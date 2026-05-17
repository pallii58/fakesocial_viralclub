"use client";

import { genId, newComment } from "@/lib/defaults";
import type { Comment } from "@/lib/types";
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
    <div className="space-y-2 rounded-lg border border-zinc-200 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500">{label}</span>
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
            className="text-xs text-red-600 hover:underline"
          >
            Elimina
          </button>
        </div>
      </div>
      <input
        value={comment.author}
        onChange={(e) => onUpdate({ ...comment, author: e.target.value })}
        className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
        placeholder="Username"
      />
      <ImageUploadField
        label="Avatar"
        value={comment.avatar}
        onChange={(avatar) => onUpdate({ ...comment, avatar })}
      />
      <textarea
        value={comment.text}
        onChange={(e) => onUpdate({ ...comment, text: e.target.value })}
        rows={2}
        className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
        placeholder="Testo commento"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          value={comment.likes}
          onChange={(e) =>
            onUpdate({ ...comment, likes: parseInt(e.target.value) || 0 })
          }
          className="rounded border border-zinc-300 px-2 py-1 text-sm"
          placeholder="Like"
        />
        <input
          value={comment.timestamp}
          onChange={(e) => onUpdate({ ...comment, timestamp: e.target.value })}
          className="rounded border border-zinc-300 px-2 py-1 text-sm"
          placeholder="Tempo (es. 2h)"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={comment.verified ?? false}
          onChange={(e) => onUpdate({ ...comment, verified: e.target.checked })}
        />
        Badge verificato
      </label>
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
            <div key={reply.id} className="ml-4 border-l-2 border-zinc-200 pl-3">
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
            className="ml-4 text-xs text-blue-600 hover:underline"
          >
            + Aggiungi risposta
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...comments, newComment()])}
        className="w-full rounded-lg border-2 border-dashed border-zinc-300 py-2 text-sm font-medium text-zinc-600 hover:border-emerald-500 hover:text-emerald-700"
      >
        + Aggiungi commento
      </button>
    </div>
  );
}
