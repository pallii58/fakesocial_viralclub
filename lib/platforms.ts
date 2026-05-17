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
    description: "Chat DM e gruppi",
    href: "/whatsapp",
    color: "#25D366",
    icon: "💬",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Post e commenti",
    href: "/instagram",
    color: "#E1306C",
    icon: "📷",
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Post e commenti",
    href: "/facebook",
    color: "#1877F2",
    icon: "👍",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "Video e commenti",
    href: "/tiktok",
    color: "#000000",
    icon: "🎵",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Video e commenti",
    href: "/youtube",
    color: "#FF0000",
    icon: "▶️",
  },
];
