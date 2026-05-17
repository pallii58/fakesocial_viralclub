"use client";

import type { Comment } from "@/lib/types";
import { InstagramCommentRow } from "./InstagramCommentRow";

function CommentRow({ comment, compact }: { comment: Comment; compact?: boolean }) {
  return (
    <div className={compact ? "py-2" : "py-2.5"}>
      <InstagramCommentRow comment={comment} compact={compact} />
      {(comment.replies ?? []).map((r) => (
        <div key={r.id} className="mt-2 ml-6 border-l border-zinc-200 pl-2">
          <CommentRow comment={r} compact />
        </div>
      ))}
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
