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
    <div className="editor-fields">
      <span className="editor-label block">Membri gruppo</span>
      {members.map((member) => (
        <div key={member.id} className="editor-block">
          <div className="editor-block-fields">
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
                onClick={() =>
                  onChange(members.filter((m) => m.id !== member.id))
                }
                className="text-xs text-red-400 hover:text-red-300"
              >
                Rimuovi membro
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...members, { id: genId(), name: "Nuovo membro" }])
        }
        className="editor-dashed-btn"
      >
        + Aggiungi membro
      </button>
    </div>
  );
}
