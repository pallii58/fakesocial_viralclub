import type { BrandId } from "@/components/brand/NeonBrandLogo";
import type { PushNotificationState } from "./types";

export interface NotificationPlatformConfig {
  appLabel: string;
  accent: string;
  avatarBg: string;
  avatarText: string;
  showGroup: boolean;
  /** Logo app in basso a destra sull'avatar */
  avatarAppBadge: boolean;
  defaultState: () => PushNotificationState;
}

export const notificationConfig: Record<BrandId, NotificationPlatformConfig> = {
  whatsapp: {
    appLabel: "WhatsApp",
    accent: "#25D366",
    avatarBg: "#25D366",
    avatarText: "#ffffff",
    showGroup: true,
    avatarAppBadge: true,
    defaultState: () => ({
      contactName: "Marco Bianchi",
      message: "Perfetto, ci sentiamo domani alle 15:00",
      time: "ora",
      isGroup: false,
    }),
  },
  instagram: {
    appLabel: "Instagram",
    accent: "#E1306C",
    avatarBg: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af)",
    avatarText: "#ffffff",
    showGroup: false,
    avatarAppBadge: true,
    defaultState: () => ({
      contactName: "influencer_demo",
      contactVerified: true,
      message: "Ti ha inviato un messaggio: Ciao! Ti va una collab? ✨",
      time: "2 min fa",
    }),
  },
  facebook: {
    appLabel: "Messenger",
    accent: "#0084FF",
    avatarBg: "#0084FF",
    avatarText: "#ffffff",
    showGroup: true,
    avatarAppBadge: true,
    defaultState: () => ({
      contactName: "Marco Bianchi",
      contactVerified: true,
      message: "Ehi, hai visto il post di oggi?",
      time: "ora",
      isGroup: false,
    }),
  },
  tiktok: {
    appLabel: "TikTok",
    accent: "#00f2ea",
    avatarBg: "#010101",
    avatarText: "#ffffff",
    showGroup: false,
    avatarAppBadge: true,
    defaultState: () => ({
      contactName: "creator_viral",
      contactVerified: true,
      message: "bro questo trend è perfetto per il brand 🔥",
      time: "adesso",
    }),
  },
  youtube: {
    appLabel: "YouTube",
    accent: "#FF0000",
    avatarBg: "#FF0000",
    avatarText: "#ffffff",
    showGroup: false,
    avatarAppBadge: true,
    defaultState: () => ({
      contactName: "Partner Brand",
      contactVerified: true,
      message: "Nuovo messaggio: Possiamo parlare della sponsorizzazione?",
      time: "1 min fa",
    }),
  },
};

export function getNotificationConfig(brand: BrandId): NotificationPlatformConfig {
  return notificationConfig[brand];
}
