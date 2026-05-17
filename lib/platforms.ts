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
    description: "DM, gruppi, messaggio singolo e notifiche",
    href: "/whatsapp",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Direct, post, commenti e notifiche",
    href: "/instagram",
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Messenger, post, commenti e notifiche",
    href: "/facebook",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "DM, video, commenti e notifiche",
    href: "/tiktok",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Inbox, video, commenti e notifiche",
    href: "/youtube",
  },
];
