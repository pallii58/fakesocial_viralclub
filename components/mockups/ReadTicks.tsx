import type { ReadStatus } from "@/lib/types";

export function ReadTicks({ status }: { status?: ReadStatus }) {
  if (!status || status === "sent") {
    return <span className="text-[11px] text-zinc-400">✓</span>;
  }
  if (status === "delivered") {
    return <span className="text-[11px] text-zinc-400">✓✓</span>;
  }
  return <span className="text-[11px] text-[#53bdeb]">✓✓</span>;
}
