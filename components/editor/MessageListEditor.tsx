"use client";

import { newMessage } from "@/lib/defaults";
import type { Message, MessageSender } from "@/lib/types";
import { MoveButtons } from "@/components/shared/MoveButtons";

interface MessageListEditorProps {
  messages: Message[];
  onChange: (messages: Message[]) => void;
  senders?: { id: MessageSender; label: string }[];
  showReadStatus?: boolean;
  onExportBubble?: (message: Message) => void;
}

export function MessageListEditor({
  messages,
  onChange,
  senders,
  showReadStatus,
  onExportBubble,
}: MessageListEditorProps) {
  const update = (id: string, patch: Partial<Message>) => {
    onChange(messages.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };

  const remove = (id: string) => {
    onChange(messages.filter((m) => m.id !== id));
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = index + dir;
    if (next < 0 || next >= messages.length) return;
    const copy = [...messages];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    onChange(copy);
  };

  const senderOptions = senders ?? [
    { id: "other" as MessageSender, label: "Contatto" },
    { id: "me" as MessageSender, label: "Tu" },
  ];

  return (
    <div className="space-y-4">
      {messages.map((msg, i) => (
        <div
          key={msg.id}
          className="space-y-2 rounded-lg border border-zinc-200 p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">
              Messaggio {i + 1}
            </span>
            <div className="flex items-center gap-2">
              <MoveButtons
                onUp={() => move(i, -1)}
                onDown={() => move(i, 1)}
                disableUp={i === 0}
                disableDown={i === messages.length - 1}
              />
              {onExportBubble && (
                <button
                  type="button"
                  onClick={() => onExportBubble(msg)}
                  className="text-xs text-violet-600 hover:underline"
                >
                  PNG bolla
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(msg.id)}
                className="text-xs text-red-600 hover:underline"
              >
                Elimina
              </button>
            </div>
          </div>
          <select
            value={String(msg.sender)}
            onChange={(e) => update(msg.id, { sender: e.target.value })}
            className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
          >
            {senderOptions.map((s) => (
              <option key={String(s.id)} value={String(s.id)}>
                {s.label}
              </option>
            ))}
          </select>
          <textarea
            value={msg.text}
            onChange={(e) => update(msg.id, { text: e.target.value })}
            rows={2}
            className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
            placeholder="Testo messaggio"
          />
          <input
            value={msg.timestamp}
            onChange={(e) => update(msg.id, { timestamp: e.target.value })}
            className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
            placeholder="Orario (es. 10:30)"
          />
          {showReadStatus && msg.sender === "me" && (
            <select
              value={msg.readStatus ?? "read"}
              onChange={(e) =>
                update(msg.id, {
                  readStatus: e.target.value as Message["readStatus"],
                })
              }
              className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
            >
              <option value="sent">Inviato</option>
              <option value="delivered">Consegnato</option>
              <option value="read">Letto</option>
            </select>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...messages, newMessage("me")])}
        className="w-full rounded-lg border-2 border-dashed border-zinc-300 py-2 text-sm font-medium text-zinc-600 hover:border-emerald-500 hover:text-emerald-700"
      >
        + Aggiungi messaggio
      </button>
    </div>
  );
}
