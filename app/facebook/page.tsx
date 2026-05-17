"use client";

import { SocialEditorClient } from "@/components/editor/SocialEditorClient";
import { FacebookMock } from "@/components/mockups/FacebookMock";

export default function FacebookPage() {
  return (
    <SocialEditorClient
      title="Facebook"
      platform="facebook"
      preview={(state) => <FacebookMock state={state} />}
    />
  );
}
