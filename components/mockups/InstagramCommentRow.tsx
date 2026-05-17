"use client";

import type { Comment } from "@/lib/types";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { MockAvatar } from "./MockAvatar";

interface InstagramCommentRowProps {
  comment: Comment;
  compact?: boolean;
  className?: string;
}

/** Riga commento stile Instagram (post o sticker singolo) */
export function InstagramCommentRow({
  comment,
  compact = false,
  className = "",
}: InstagramCommentRowProps) {
  const showMetaRow = comment.showCommentMeta !== false;

  return (
    <div
      className={`flex gap-2 ${showMetaRow ? "items-start" : "items-center"} ${className}`.trim()}
    >
      <MockAvatar
        name={comment.author}
        src={comment.avatar}
        size={compact ? 28 : 32}
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-0.5 leading-tight text-zinc-900">
          <span
            className={`font-semibold ${compact ? "text-[14px]" : "text-[15px]"}`}
          >
            {comment.author}
          </span>
          {comment.verified && (
            <VerifiedBadge size={compact ? 13 : 14} className="ml-0.5" />
          )}
        </p>
        <p className="mt-0.5 text-[13px] leading-snug text-zinc-900">
          {comment.text}
        </p>
        {showMetaRow && (
          <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0 text-[11px] text-zinc-500">
            <span>{comment.timestamp}</span>
            {comment.likes > 0 && (
              <span>{comment.likes.toLocaleString("it-IT")} Mi piace</span>
            )}
            <span>Rispondi</span>
          </div>
        )}
      </div>
    </div>
  );
}
