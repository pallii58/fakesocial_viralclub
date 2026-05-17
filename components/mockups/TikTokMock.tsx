"use client";

import type { SocialEditorState } from "@/lib/types";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { CommentThread } from "./CommentThread";
import { MockAvatar } from "./MockAvatar";

export function TikTokMock({ state }: { state: SocialEditorState }) {
  const { post, comments, viewMode } = state;

  return (
    <div
      className="flex h-full flex-col bg-black text-white"
    >
      {viewMode === "full" && (
        <div className="relative flex-1 min-h-[420px] bg-zinc-900">
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt=""
              className="h-full w-full object-cover opacity-90"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-500 text-sm">
              Video placeholder
            </div>
          )}
          <div className="absolute bottom-20 left-3 right-14">
            <p className="flex items-center gap-1 text-sm font-semibold">
              <span>@{post.author}</span>
              {post.verified && <VerifiedBadge size={13} />}
            </p>
            <p className="mt-1 text-sm leading-snug">{post.caption}</p>
            <p className="mt-1 text-xs text-zinc-300">
              ♫ Suono originale — {post.author}
            </p>
          </div>
          <div className="absolute bottom-20 right-2 flex flex-col items-center gap-4 text-xs">
            <MockAvatar name={post.author} src={post.avatar} size={44} />
            <span>❤️<br />{formatCount(post.likes)}</span>
            <span>💬<br />{comments.length}</span>
            <span>↗<br />Condividi</span>
          </div>
        </div>
      )}

      <div
        className={`bg-white text-black ${viewMode === "full" ? "max-h-[340px]" : "flex-1"} overflow-y-auto rounded-t-2xl`}
      >
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-zinc-300" />
        <p className="px-4 py-2 text-sm font-semibold text-zinc-800">
          {comments.length} commenti
        </p>
        <CommentThread comments={comments} />
        <div className="h-8" />
      </div>
    </div>
  );
}

function formatCount(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}
