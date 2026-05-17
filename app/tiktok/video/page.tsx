"use client";

import { SocialEditorClient } from "@/components/editor/SocialEditorClient";
import { TikTokMock } from "@/components/mockups/TikTokMock";

export default function TikTokVideoPage() {
  return (
    <SocialEditorClient
      title="TikTok · Video e commenti"
      platform="tiktok-video"
      backHref="/tiktok"
      defaultPost={{
        author: "creator_demo",
        caption: "POV: il momento perfetto per il tuo brand 🎬 #fyp #viral",
        likes: 125400,
      }}
      preview={(state) => <TikTokMock state={state} />}
    />
  );
}
