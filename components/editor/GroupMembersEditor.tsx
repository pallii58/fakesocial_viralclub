"use client";

import { genId } from "@/lib/defaults";
import type { GroupMember } from "@/lib/types";
import { ImageUploadField } from "@/components/shared/ImageUploadField";

interface GroupMembersEditorProps {
  members: GroupMember[];
  onChange: (members: GroupMember[]) => void;
}

export function GroupMembersEditor({
  members,
  onChange,
}: GroupMembersEditorProps) {
  const update = (id: string, patch: Partial<GroupMember>) => {
    onChange(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-violet-300/80">Membri gruppo</h3>
      {members.map((member) => (
        <div
          key={member.id}
          className="space-y-2 rounded-lg border border-violet-500/15 bg-black/30 p-3"
        >
          <input
            value={member.name}
            onChange={(e) => update(member.id, { name: e.target.value })}
            className="editor-input"
            placeholder="Nome membro"
          />
          <ImageUploadField
            label="Immagine profilo"
            value={member.avatar}
            onChange={(avatar) => update(member.id, { avatar })}
          />
          {member.id !== "me" && (
            <button
              type="button"
              onClick={() => onChange(members.filter((m) => m.id !== member.id))}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Rimuovi membro
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...members, { id: genId(), name: "Nuovo membro" }])
        }
        className="text-sm text-violet-400 hover:text-violet-300"
      >
        + Aggiungi membro
      </button>
    </div>
  );
}
