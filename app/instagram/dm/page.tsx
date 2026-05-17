"use client";

import { DMEditorClient } from "@/components/editor/DMEditorClient";
import { InstagramDM } from "@/components/mockups/dm/InstagramDM";
import { defaultInstagramDM } from "@/lib/defaults";

export default function InstagramDMPage() {
  return (
    <DMEditorClient
      title="Instagram · Direct"
      platform="instagram-dm"
      themeId="instagram"
      backHref="/instagram"
      defaultState={defaultInstagramDM}
      preview={(state) => <InstagramDM state={state} />}
    />
  );
}
