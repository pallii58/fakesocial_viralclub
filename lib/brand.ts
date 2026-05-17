export const brand = {
  purple: "#8b5cf6",
  purpleLight: "#a78bfa",
  purpleDark: "#6d28d9",
  purpleGlow: "#c084fc",
  black: "#050508",
  blackSoft: "#0c0c12",
  blackCard: "#12121a",
} as const;

export const platformNeon: Record<
  string,
  { primary: string; secondary?: string; glow: string }
> = {
  whatsapp: { primary: "#39ff88", glow: "rgba(57,255,136,0.55)" },
  instagram: { primary: "#ff49c8", secondary: "#ffaa33", glow: "rgba(255,73,200,0.55)" },
  facebook: { primary: "#4d9fff", glow: "rgba(77,159,255,0.55)" },
  tiktok: { primary: "#00f7f3", secondary: "#ff2d55", glow: "rgba(0,247,243,0.5)" },
  youtube: { primary: "#ff4444", glow: "rgba(255,68,68,0.55)" },
};
