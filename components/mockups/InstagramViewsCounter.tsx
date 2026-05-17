"use client";

import { formatViewsCount } from "@/lib/format-views";
import type { ViewsCounterState } from "@/lib/types";
import { resolveViewsCounterBackground } from "@/lib/views-counter-background";
import { ViewsEyeIcon } from "./ViewsEyeIcon";

export function InstagramViewsCounter({ state }: { state: ViewsCounterState }) {
  const label =
    state.label?.trim() || formatViewsCount(state.views);
  const backgroundStyle = resolveViewsCounterBackground(state.background);

  return (
    <div
      id="views-export-root"
      className="inline-flex min-w-[220px] items-center justify-center gap-2.5 rounded-md px-6 py-3.5"
      style={backgroundStyle}
    >
      <ViewsEyeIcon size={26} />
      <span className="text-[22px] font-bold leading-none tracking-tight text-white">
        {label}
      </span>
    </div>
  );
}
