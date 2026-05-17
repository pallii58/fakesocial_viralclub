"use client";

import type { SocialEditorState } from "@/lib/types";
import { CommentThread } from "./CommentThread";
import { MockAvatar } from "./MockAvatar";

export function YouTubeMock({ state }: { state: SocialEditorState }) {
  const { post, comments, viewMode } = state;

  return (
    <div
      className="flex h-full flex-col bg-[#0f0f0f] text-white"
    >
      <div className="flex items-center gap-2 px-3 pb-2 pt-12">
        <span className="text-red-600 text-lg font-bold">▶</span>
        <span className="text-sm font-medium">YouTube</span>
      </div>

      {viewMode === "full" && (
        <>
          <div className="aspect-video w-full bg-zinc-800">
            {post.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-500 text-sm">
                Thumbnail video
              </div>
            )}
          </div>
          <div className="px-3 py-2 space-y-1">
            <h2 className="text-[15px] font-semibold leading-snug line-clamp-2">
              {post.caption}
            </h2>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <MockAvatar name={post.author} src={post.avatar} size={28} />
              <span>{post.author}</span>
              {post.verified && <span className="text-zinc-400">✓</span>}
            </div>
            <p className="text-xs text-zinc-400">
              {post.likes.toLocaleString("it-IT")} visualizzazioni
              {post.timestamp ? ` · ${post.timestamp}` : ""}
            </p>
          </div>
        </>
      )}

      <div className="flex-1 overflow-y-auto border-t border-zinc-800">
        <p className="px-3 py-2 text-sm font-semibold">
          {comments.length} commenti
        </p>
        <div className="bg-[#0f0f0f]">
          <CommentThread comments={comments} />
        </div>
      </div>
    </div>
  );
}
