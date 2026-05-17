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
              {onExportBubble && (
                <button
                  type="button"
                  onClick={() => onExportBubble(msg)}
                  className="text-xs font-medium text-fuchsia-400 hover:text-fuchsia-300"
                >
                  PNG bolla
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(msg.id)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Elimina
              </button>
            </div>
          </div>
          <select
            value={String(msg.sender)}
            onChange={(e) => update(msg.id, { sender: e.target.value })}
            className="editor-input"
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
            <select
              value={msg.readStatus ?? "read"}
              onChange={(e) =>
                update(msg.id, {
                  readStatus: e.target.value as Message["readStatus"],
                })
              }
              className="editor-input"
            >
              <option value="sent">✓ 1 grigia (inviato)</option>
              <option value="delivered">✓✓ 2 grigie (consegnato)</option>
              <option value="read">✓✓ 2 celesti (letto)</option>
            </select>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...messages, newMessage("me")])}
        className="w-full rounded-xl border-2 border-dashed border-violet-500/25 py-2.5 text-sm font-medium text-violet-300/80 transition hover:border-violet-400/50 hover:bg-violet-950/30 hover:text-violet-200"
      >
        + Aggiungi messaggio
      </button>
    </div>
  );
}
