import type { CSSProperties } from "react";
import type { ChatBackground, ChatBackgroundMode } from "./types";
import type { ChatThemeId } from "./chat-themes";

export interface ChatBackgroundDefaults {
  solidColor: string;
  pattern?: string;
}

export const chatBackgroundDefaults: Record<ChatThemeId, ChatBackgroundDefaults> =
  {
    whatsapp: { solidColor: "#efeae2" },
    instagram: { solidColor: "#ffffff" },
    messenger: { solidColor: "#ffffff" },
    tiktok: { solidColor: "#000000" },
    youtube: { solidColor: "#0f0f0f" },
  };

export function defaultChatBackground(): ChatBackground {
  return { mode: "default" };
}

export function resolveChatBackground(
  bg: ChatBackground | undefined,
  defaults: ChatBackgroundDefaults
): CSSProperties {
  const mode: ChatBackgroundMode = bg?.mode ?? "default";

  if (mode === "solid") {
    return {
      backgroundColor: bg?.color ?? defaults.solidColor,
    };
  }

  if (mode === "image" && bg?.image) {
    const escaped = bg.image.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return {
      backgroundColor: defaults.solidColor,
      backgroundImage: `url("${escaped}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }

  const style: CSSProperties = {
    backgroundColor: defaults.solidColor,
  };
  if (defaults.pattern) {
    style.backgroundImage = defaults.pattern;
  }
  return style;
}
