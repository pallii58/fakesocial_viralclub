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
      <h3 className="text-sm font-semibold text-zinc-700">Membri gruppo</h3>
      {members.map((member) => (
        <div
          key={member.id}
          className="space-y-2 rounded-lg border border-zinc-200 p-3"
        >
          <input
            value={member.name}
            onChange={(e) => update(member.id, { name: e.target.value })}
            className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
            placeholder="Nome membro"
          />
          <ImageUploadField
            label="Avatar"
            value={member.avatar}
            onChange={(avatar) => update(member.id, { avatar })}
          />
          {member.id !== "me" && (
            <button
              type="button"
              onClick={() => onChange(members.filter((m) => m.id !== member.id))}
              className="text-xs text-red-600 hover:underline"
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
        className="text-sm text-blue-600 hover:underline"
      >
        + Aggiungi membro
      </button>
    </div>
  );
}
