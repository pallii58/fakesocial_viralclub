"use client";

import { genId } from "@/lib/defaults";
import type { GroupMember } from "@/lib/types";
import { Checkbox } from "@/components/shared/Checkbox";
import { ImageUploadField } from "@/components/shared/ImageUploadField";

interface GroupMembersEditorProps {
  members: GroupMember[];
  onChange: (members: GroupMember[]) => void;
  /** Etichetta upload per il membro con id «me» */
  selfAvatarLabel?: string;
  /** Membri da non mostrare (es. «Tu» gestito altrove) */
  excludeIds?: string[];
  /** Checkbox spunta blu per membro (Instagram) */
  showVerified?: boolean;
}

export function GroupMembersEditor({
  members,
  onChange,
  selfAvatarLabel = "La tua immagine profilo",
  excludeIds = [],
  showVerified = false,
}: GroupMembersEditorProps) {
  const update = (id: string, patch: Partial<GroupMember>) => {
    onChange(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };

  return (
    <div className="editor-fields">
      <span className="editor-label block">Membri gruppo</span>
      {members
        .filter((member) => !excludeIds.includes(member.id))
        .map((member) => (
        <div key={member.id} className="editor-block">
          <div className="editor-block-fields">
            <input
              value={member.name}
              onChange={(e) => update(member.id, { name: e.target.value })}
              className="editor-input"
              placeholder={member.id === "me" ? "Tu" : "Nome membro"}
              readOnly={member.id === "me"}
            />
            <ImageUploadField
              label={
                member.id === "me" ? selfAvatarLabel : "Immagine profilo"
              }
              value={member.avatar}
              onChange={(avatar) => update(member.id, { avatar })}
            />
            {showVerified && member.id !== "me" && (
              <Checkbox
                label="Spunta blu (verificato)"
                checked={member.verified ?? false}
                onChange={(verified) => update(member.id, { verified })}
              />
            )}
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
