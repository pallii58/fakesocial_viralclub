import type { CSSProperties } from "react";
import type { ViewsCounterBackground, ViewsBackgroundMode } from "./types";

export const viewsCounterBackgroundDefaults = {
  gradientFrom: "#9a9a9a",
  gradientTo: "#4a4a4a",
  solidColor: "#6b6b6b",
};

export function defaultViewsCounterBackground(): ViewsCounterBackground {
  return { mode: "default" };
}

export function resolveViewsCounterBackground(
  bg: ViewsCounterBackground | undefined
): CSSProperties {
  const mode: ViewsBackgroundMode = bg?.mode ?? "default";

  if (mode === "solid") {
    return {
      backgroundColor: bg?.color ?? viewsCounterBackgroundDefaults.solidColor,
    };
  }

  if (mode === "gradient") {
    const from =
      bg?.gradientFrom ?? viewsCounterBackgroundDefaults.gradientFrom;
    const to = bg?.gradientTo ?? viewsCounterBackgroundDefaults.gradientTo;
    return {
      backgroundImage: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
    };
  }

  if (mode === "image" && bg?.image) {
    const escaped = bg.image.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return {
      backgroundColor: viewsCounterBackgroundDefaults.solidColor,
      backgroundImage: `url("${escaped}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }

  const { gradientFrom, gradientTo } = viewsCounterBackgroundDefaults;
  return {
    backgroundImage: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
  };
}
