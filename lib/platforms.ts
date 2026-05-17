export interface PlatformCard {
  id: string;
  name: string;
  description: string;
  href: string;
  color: string;
  icon: string;
}

export const platforms: PlatformCard[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "DM, gruppi e export bolle",
    href: "/whatsapp",
    color: "#25D366",
    icon: "💬",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Direct, post e commenti",
    href: "/instagram",
    color: "#E1306C",
    icon: "📷",
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Messenger, post e commenti",
    href: "/facebook",
    color: "#1877F2",
    icon: "👍",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "DM, video e commenti",
    href: "/tiktok",
    color: "#000000",
    icon: "🎵",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Inbox, video e commenti",
    href: "/youtube",
    color: "#FF0000",
    icon: "▶️",
  },
];
