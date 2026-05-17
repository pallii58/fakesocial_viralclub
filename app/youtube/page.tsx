"use client";

import { SocialEditorClient } from "@/components/editor/SocialEditorClient";
import { YouTubeMock } from "@/components/mockups/YouTubeMock";

export default function YouTubePage() {
  return (
    <SocialEditorClient
      title="YouTube"
      platform="youtube"
      defaultPost={{
        author: "Canale Demo",
        caption: "Il video che cambierà tutto — Tutorial completo 2026",
        likes: 892340,
        timestamp: "2 giorni fa",
        verified: true,
      }}
      preview={(state) => <YouTubeMock state={state} />}
    />
  );
}
