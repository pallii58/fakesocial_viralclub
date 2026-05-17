import type { BrandId } from "@/components/brand/NeonBrandLogo";

export interface PlatformCard {
  id: BrandId;
  name: string;
  description: string;
  href: string;
}

export const platforms: PlatformCard[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "DM, gruppi e export bolle",
    href: "/whatsapp",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Direct, post e commenti",
    href: "/instagram",
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Messenger, post e commenti",
    href: "/facebook",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "DM, video e commenti",
    href: "/tiktok",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Inbox, video e commenti",
    href: "/youtube",
  },
];
