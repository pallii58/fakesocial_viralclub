"use client";

import type { Comment } from "@/lib/types";
import { InstagramCommentRow } from "./InstagramCommentRow";

/** Commento singolo TikTok per sticker / overlay video */
export function TikTokSingleComment({ comment }: { comment: Comment }) {
  return (
    <div
      id="bubbles-export-root"
      className="w-fit max-w-[min(100%,22rem)] rounded-2xl bg-white px-3 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
    >
      <InstagramCommentRow comment={comment} />
    </div>
  );
}
