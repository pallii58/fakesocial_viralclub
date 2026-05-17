"use client";

import { SocialEditorClient } from "@/components/editor/SocialEditorClient";
import { InstagramMock } from "@/components/mockups/InstagramMock";

export default function InstagramPostPage() {
  return (
    <SocialEditorClient
      title="Instagram — Post e commenti"
      platform="instagram-post"
      backHref="/instagram"
      preview={(state) => <InstagramMock state={state} />}
    />
  );
}
