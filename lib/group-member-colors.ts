import type { GroupMember } from "./types";

/** Colori nome partecipante stile WhatsApp gruppo */
export const GROUP_MEMBER_NAME_COLORS = [
  "#e5425b",
  "#e542a0",
  "#9b59b6",
  "#6c5ce7",
  "#0984e3",
  "#00b894",
  "#e17055",
  "#06cf9c",
  "#d63031",
  "#e67e22",
  "#3498db",
  "#8e44ad",
] as const;

function stableHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Colore stabile per id membro (stesso membro = stesso colore) */
export function getMemberNameColor(
  senderId: string,
  members: Pick<GroupMember, "id">[]
): string {
  const others = members.filter((m) => m.id !== "me");
  let index = others.findIndex((m) => m.id === senderId);
  if (index < 0) index = stableHash(senderId);
  return GROUP_MEMBER_NAME_COLORS[index % GROUP_MEMBER_NAME_COLORS.length];
}
