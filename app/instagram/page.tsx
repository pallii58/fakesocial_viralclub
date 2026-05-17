"use client";

import { SocialEditorClient } from "@/components/editor/SocialEditorClient";
import { InstagramMock } from "@/components/mockups/InstagramMock";

export default function InstagramPage() {
  return (
    <SocialEditorClient
      title="Instagram"
      platform="instagram"
      preview={(state) => <InstagramMock state={state} />}
    />
  );
}
