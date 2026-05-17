import type { Message } from "./types";

export type ChatThemeId =
  | "whatsapp"
  | "instagram"
  | "messenger"
  | "tiktok"
  | "youtube";

export interface ChatTheme {
  id: ChatThemeId;
  meBubble: string;
  otherBubble: string;
  meText: string;
  otherText: string;
  timeMe: string;
  timeOther: string;
  showReadTicks: boolean;
  meTail: string;
  otherTail: string;
}

export const chatThemes: Record<ChatThemeId, ChatTheme> = {
  whatsapp: {
    id: "whatsapp",
    meBubble: "bg-[#d9fdd3] rounded-lg rounded-tr-none shadow-sm",
    otherBubble: "bg-white rounded-lg rounded-tl-none shadow-sm",
    meText: "text-zinc-900",
    otherText: "text-zinc-900",
    timeMe: "text-zinc-500",
    timeOther: "text-zinc-500",
    showReadTicks: true,
    meTail: "",
    otherTail: "",
  },
  instagram: {
    id: "instagram",
    meBubble: "bg-[#b8e4f5] rounded-[22px] rounded-br-md",
    otherBubble: "bg-[#efefef] rounded-[22px] rounded-bl-md",
    meText: "text-zinc-900",
    otherText: "text-zinc-900",
    timeMe: "text-zinc-500",
    timeOther: "text-zinc-500",
    showReadTicks: false,
    meTail: "",
    otherTail: "",
  },
  messenger: {
    id: "messenger",
    meBubble: "bg-[#0084ff] rounded-[18px] rounded-br-sm shadow-sm",
    otherBubble: "bg-[#e4e6eb] rounded-[18px] rounded-bl-sm",
    meText: "text-white",
    otherText: "text-zinc-900",
    timeMe: "text-white/70",
    timeOther: "text-zinc-500",
    showReadTicks: false,
    meTail: "",
    otherTail: "",
  },
  tiktok: {
    id: "tiktok",
    meBubble: "bg-[#fe2c55] rounded-2xl rounded-br-sm",
    otherBubble: "bg-[#2f2f2f] rounded-2xl rounded-bl-sm",
    meText: "text-white",
    otherText: "text-white",
    timeMe: "text-white/60",
    timeOther: "text-zinc-400",
    showReadTicks: false,
    meTail: "",
    otherTail: "",
  },
  youtube: {
    id: "youtube",
    meBubble: "bg-[#3ea6ff] rounded-xl rounded-br-sm",
    otherBubble: "bg-[#272727] rounded-xl rounded-bl-sm",
    meText: "text-white",
    otherText: "text-white",
    timeMe: "text-white/70",
    timeOther: "text-zinc-400",
    showReadTicks: false,
    meTail: "",
    otherTail: "",
  },
};

export function isMeSender(sender: Message["sender"]) {
  return sender === "me";
}
