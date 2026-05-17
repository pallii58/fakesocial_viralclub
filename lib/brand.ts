export const brand = {
  purple: "#8b5cf6",
  purpleLight: "#a78bfa",
  purpleDark: "#6d28d9",
  purpleGlow: "#c084fc",
  black: "#050508",
  blackSoft: "#0c0c12",
  blackCard: "#12121a",
} as const;

import type { BrandId } from "@/components/brand/NeonBrandLogo";

export interface PlatformTheme {
  primary: string;
  secondary?: string;
  glow: string;
  border: string;
  borderHover: string;
  overlay: string;
}

export const platformNeon: Record<BrandId, PlatformTheme> = {
  whatsapp: {
    primary: "#39ff88",
    glow: "rgba(57,255,136,0.55)",
    border: "rgba(57,255,136,0.28)",
    borderHover: "rgba(57,255,136,0.65)",
    overlay: "rgba(57,255,136,0.1)",
  },
  instagram: {
    primary: "#ff49c8",
    secondary: "#ffaa33",
    glow: "rgba(255,73,200,0.55)",
    border: "rgba(255,73,200,0.28)",
    borderHover: "rgba(255,73,200,0.65)",
    overlay: "rgba(255,73,200,0.1)",
  },
  facebook: {
    primary: "#4d9fff",
    glow: "rgba(77,159,255,0.55)",
    border: "rgba(77,159,255,0.28)",
    borderHover: "rgba(77,159,255,0.65)",
    overlay: "rgba(77,159,255,0.1)",
  },
  tiktok: {
    primary: "#00f7f3",
    secondary: "#ff2d55",
    glow: "rgba(0,247,243,0.5)",
    border: "rgba(0,247,243,0.28)",
    borderHover: "rgba(0,247,243,0.65)",
    overlay: "rgba(0,247,243,0.1)",
  },
  youtube: {
    primary: "#ff4444",
    glow: "rgba(255,68,68,0.55)",
    border: "rgba(255,68,68,0.28)",
    borderHover: "rgba(255,68,68,0.65)",
    overlay: "rgba(255,68,68,0.1)",
  },
};

const defaultTheme: PlatformTheme = {
  primary: "#a78bfa",
  glow: "rgba(139,92,246,0.4)",
  border: "rgba(139,92,246,0.2)",
  borderHover: "rgba(167,139,250,0.55)",
  overlay: "rgba(139,92,246,0.08)",
};

export function getPlatformTheme(brand?: BrandId): PlatformTheme {
  return brand ? platformNeon[brand] : defaultTheme;
}
