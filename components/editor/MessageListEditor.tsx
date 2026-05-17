"use client";

import { newMessage } from "@/lib/defaults";
import type { Message, MessageSender } from "@/lib/types";
import { MoveButtons } from "@/components/shared/MoveButtons";
import { Select } from "@/components/shared/Select";

interface MessageListEditorProps {
  messages: Message[];
  onChange: (messages: Message[]) => void;
  senders?: { id: MessageSender; label: string }[];
  showReadStatus?: boolean;
}

export function MessageListEditor({
  messages,
  onChange,
  senders,
  showReadStatus,
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
          className="space-y-2 rounded-xl border border-violet-500/15 bg-black/30 p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-violet-400/70">
              Messaggio {i + 1}
            </span>
            <div className="flex items-center gap-2">
              <MoveButtons
                onUp={() => move(i, -1)}
                onDown={() => move(i, 1)}
                disableUp={i === 0}
                disableDown={i === messages.length - 1}
              />
              <button
                type="button"
                onClick={() => remove(msg.id)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Elimina
              </button>
            </div>
          </div>
          <Select
            value={String(msg.sender)}
            onChange={(sender) => update(msg.id, { sender })}
            options={senderOptions.map((s) => ({
              value: String(s.id),
              label: s.label,
            }))}
          />
          <textarea
            value={msg.text}
            onChange={(e) => update(msg.id, { text: e.target.value })}
            rows={2}
            className="editor-input"
            placeholder="Testo messaggio"
          />
          <input
            value={msg.timestamp}
            onChange={(e) => update(msg.id, { timestamp: e.target.value })}
            className="editor-input"
            placeholder="Orario (es. 10:30)"
          />
          {showReadStatus && msg.sender === "me" && (
            <Select
              value={msg.readStatus ?? "read"}
              onChange={(readStatus) =>
                update(msg.id, {
                  readStatus: readStatus as Message["readStatus"],
                })
              }
              options={[
                { value: "sent", label: "✓ 1 grigia (inviato)" },
                { value: "delivered", label: "✓✓ 2 grigie (consegnato)" },
                { value: "read", label: "✓✓ 2 celesti (letto)" },
              ]}
            />
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...messages, newMessage("me")])}
        className="editor-dashed-btn"
      >
        + Aggiungi messaggio
      </button>
    </div>
  );
}
