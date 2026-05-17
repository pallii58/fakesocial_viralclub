"use client";

import type { Comment } from "@/lib/types";
import { MockAvatar } from "./MockAvatar";

function VerifiedBadge() {
  return (
    <span className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0095f6] text-[8px] text-white">✓</span>
  );
}

function CommentRow({ comment, compact }: { comment: Comment; compact?: boolean }) {
  return (
    <div className={compact ? "py-2" : "py-2.5"}>
      <div className="flex gap-2">
        <MockAvatar name={comment.author} src={comment.avatar} size={compact ? 28 : 32} />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] leading-snug">
            <span className="font-semibold">{comment.author}</span>
            {comment.verified && <VerifiedBadge />}
            <span className="text-zinc-800"> {comment.text}</span>
          </p>
          <div className="mt-0.5 flex gap-3 text-[11px] text-zinc-500">
            <span>{comment.timestamp}</span>
            {comment.likes > 0 && <span>{comment.likes} Mi piace</span>}
            <span>Rispondi</span>
          </div>
          {(comment.replies ?? []).map((r) => (
            <div key={r.id} className="mt-2 ml-6 border-l border-zinc-200 pl-2">
              <CommentRow comment={r} compact />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CommentThread({ comments }: { comments: Comment[] }) {
  return (
    <div className="divide-y divide-zinc-100 px-3">
      {comments.map((c) => (
        <CommentRow key={c.id} comment={c} />
      ))}
    </div>
  );
}
