"use client";

import { DMEditorClient } from "@/components/editor/DMEditorClient";
import { TikTokDM } from "@/components/mockups/dm/TikTokDM";
import { defaultTikTokDM } from "@/lib/defaults";

export default function TikTokDMPage() {
  return (
    <DMEditorClient
      title="TikTok — Direct"
      platform="tiktok-dm"
      themeId="tiktok"
      backHref="/tiktok"
      defaultState={defaultTikTokDM}
      preview={(state) => <TikTokDM state={state} />}
    />
  );
}
