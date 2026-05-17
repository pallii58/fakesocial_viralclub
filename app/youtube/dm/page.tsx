"use client";

import { DMEditorClient } from "@/components/editor/DMEditorClient";
import { YouTubeDM } from "@/components/mockups/dm/YouTubeDM";
import { defaultYouTubeDM } from "@/lib/defaults";

export default function YouTubeDMPage() {
  return (
    <DMEditorClient
      title="YouTube · Messaggi"
      platform="youtube-dm"
      themeId="youtube"
      backHref="/youtube"
      defaultState={defaultYouTubeDM}
      preview={(state) => <YouTubeDM state={state} />}
    />
  );
}
