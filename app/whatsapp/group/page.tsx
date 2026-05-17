"use client";

import { useState } from "react";
import { defaultWhatsAppGroup } from "@/lib/defaults";
import type { WhatsAppGroupState } from "@/lib/types";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { GroupMembersEditor } from "@/components/editor/GroupMembersEditor";
import { MessageListEditor } from "@/components/editor/MessageListEditor";
import { WhatsAppGroup } from "@/components/mockups/WhatsAppGroup";

export default function WhatsAppGroupPage() {
  const [state, setState] = useState<WhatsAppGroupState>(defaultWhatsAppGroup);

  const senders = [
    { id: "me", label: "Tu" },
    ...state.members
      .filter((m) => m.id !== "me")
      .map((m) => ({ id: m.id, label: m.name })),
  ];

  return (
    <EditorLayout
      title="WhatsApp — Gruppo"
      platform="whatsapp-group"
      backHref="/whatsapp"
      onReset={() => setState(defaultWhatsAppGroup())}
      editor={
        <div className="space-y-4">
          <input
            value={state.groupName}
            onChange={(e) => setState({ ...state, groupName: e.target.value })}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            placeholder="Nome gruppo"
          />
          <GroupMembersEditor
            members={state.members}
            onChange={(members) => setState({ ...state, members })}
          />
          <MessageListEditor
            messages={state.messages}
            onChange={(messages) => setState({ ...state, messages })}
            senders={senders}
            showReadStatus
          />
        </div>
      }
      preview={<WhatsAppGroup state={state} />}
    />
  );
}
