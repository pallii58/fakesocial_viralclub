"use client";

import { SocialEditorClient } from "@/components/editor/SocialEditorClient";
import { FacebookMock } from "@/components/mockups/FacebookMock";

export default function FacebookPostPage() {
  return (
    <SocialEditorClient
      title="Facebook · Post e commenti"
      platform="facebook-post"
      backHref="/facebook"
      preview={(state) => <FacebookMock state={state} />}
    />
  );
}
