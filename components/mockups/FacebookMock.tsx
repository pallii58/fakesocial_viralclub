"use client";

import type { SocialEditorState } from "@/lib/types";
import { CommentThread } from "./CommentThread";
import { MockAvatar } from "./MockAvatar";

export function FacebookMock({ state }: { state: SocialEditorState }) {
  const { post, comments, viewMode } = state;

  return (
    <div className="flex h-full flex-col bg-[#f0f2f5]">
      <div className="border-b border-zinc-200 bg-white px-3 pb-2 pt-12">
        <p className="text-center text-sm font-semibold text-[#1877F2]">facebook</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {viewMode === "full" && (
          <div className="m-2 overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-2 p-3">
              <MockAvatar name={post.author} src={post.avatar} size={40} />
              <div>
                <p className="text-sm font-semibold">{post.author}</p>
                {post.timestamp && <p className="text-xs text-zinc-500">{post.timestamp}</p>}
              </div>
            </div>
            <p className="px-3 pb-2 text-[15px]">{post.caption}</p>
            {post.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.image} alt="" className="max-h-48 w-full object-cover" />
            )}
            <div className="flex justify-around border-t border-zinc-100 px-3 py-2 text-xs text-zinc-500">
              <span>👍 Mi piace</span><span>💬 Commenta</span><span>↗ Condividi</span>
            </div>
            <div className="border-t border-zinc-100 px-3 py-1.5 text-xs text-zinc-500">
              👍 {post.likes.toLocaleString("it-IT")}
            </div>
          </div>
        )}
        <div className={`${viewMode === "full" ? "m-2" : ""} rounded-lg bg-white shadow-sm`}>
          {viewMode === "comments-only" && (
            <p className="border-b border-zinc-100 px-3 py-2 text-sm font-semibold">Commenti</p>
          )}
          <CommentThread comments={comments} />
        </div>
      </div>
    </div>
  );
}
