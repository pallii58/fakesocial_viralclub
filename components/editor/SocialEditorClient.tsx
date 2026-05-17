"use client";

import { useState } from "react";
import { defaultSocialState } from "@/lib/defaults";
import type { SocialEditorState } from "@/lib/types";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { CommentListEditor } from "./CommentListEditor";
import { PostFieldsEditor } from "./PostFieldsEditor";
import { ViewModeToggle } from "./ViewModeToggle";
interface SocialEditorClientProps {
  title: string;
  platform: string;
  backHref?: string;
  defaultPost?: Partial<SocialEditorState["post"]>;
  showPostImage?: boolean;
  preview: (state: SocialEditorState) => React.ReactNode;
}

export function SocialEditorClient({
  title,
  platform,
  backHref = "/",
  defaultPost,
  showPostImage = true,
  preview,
}: SocialEditorClientProps) {
  const [state, setState] = useState<SocialEditorState>(() =>
    defaultSocialState(defaultPost)
  );

  const reset = () => setState(defaultSocialState(defaultPost));

  return (
    <EditorLayout
      title={title}
      platform={platform}
      backHref={backHref}
      onReset={reset}
      editor={
        <div className="space-y-4">
          <ViewModeToggle
            value={state.viewMode}
            onChange={(viewMode) => setState({ ...state, viewMode })}
          />
          {state.viewMode === "full" && (
            <PostFieldsEditor
              post={state.post}
              onChange={(post) => setState({ ...state, post })}
              showImage={showPostImage}
            />
          )}
          <CommentListEditor
            comments={state.comments}
            onChange={(comments) => setState({ ...state, comments })}
          />
        </div>
      }
      preview={preview(state)}
    />
  );
}
