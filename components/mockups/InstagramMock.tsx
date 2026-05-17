"use client";

import type { SocialEditorState } from "@/lib/types";
import { CommentThread } from "./CommentThread";
import { usePreviewBackground } from "@/components/shared/PreviewBackgroundContext";
import { MockAvatar } from "./MockAvatar";

export function InstagramMock({ state }: { state: SocialEditorState }) {
  const { post, comments, viewMode } = state;
  const { showBackground } = usePreviewBackground();

  return (
    <div
      className={`flex h-full flex-col ${showBackground ? "bg-white" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between border-b border-zinc-200 px-3 pb-2 pt-12">
        <span className="text-xl">‹</span>
        <span className="text-sm font-semibold">Post</span>
        <span className="text-lg">⋯</span>
      </div>

      {viewMode === "full" && (
        <>
          <div className="flex items-center gap-2 px-3 py-2">
            <MockAvatar name={post.author} src={post.avatar} size={32} />
            <span className="text-sm font-semibold">
              {post.author}
              {post.verified && (
                <span className="ml-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0095f6] text-[8px] text-white">
                  ✓
                </span>
              )}
            </span>
          </div>
          <div className="aspect-square w-full bg-zinc-200">
            {post.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-400 text-sm">
                Immagine post
              </div>
            )}
          </div>
          <div className="px-3 py-2 space-y-1">
            <p className="text-sm font-semibold">
              {post.likes.toLocaleString("it-IT")} Mi piace
            </p>
            <p className="text-sm">
              <span className="font-semibold">{post.author}</span> {post.caption}
            </p>
            {post.timestamp && (
              <p className="text-[11px] text-zinc-400 uppercase">
                {post.timestamp}
              </p>
            )}
          </div>
        </>
      )}

      <div className="border-t border-zinc-200 flex-1 overflow-y-auto">
        {viewMode === "comments-only" && (
          <p className="px-3 py-2 text-sm font-semibold border-b border-zinc-100">
            Commenti
          </p>
        )}
        <CommentThread comments={comments} />
      </div>

      <div className="border-t border-zinc-200 px-3 py-2 pb-8 text-sm text-zinc-400">
        Aggiungi un commento...
      </div>
    </div>
  );
}
