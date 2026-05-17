"use client";

import { DMEditorClient } from "@/components/editor/DMEditorClient";
import { FacebookMessenger } from "@/components/mockups/dm/FacebookMessenger";
import { defaultMessengerDM } from "@/lib/defaults";

export default function FacebookMessengerPage() {
  return (
    <DMEditorClient
      title="Facebook — Messenger"
      platform="facebook-messenger"
      themeId="messenger"
      backHref="/facebook"
      defaultState={defaultMessengerDM}
      preview={(state) => <FacebookMessenger state={state} />}
    />
  );
}
