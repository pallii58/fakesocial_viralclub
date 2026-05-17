"use client";

import Image from "next/image";
import type { WhatsAppNotificationState } from "@/lib/types";

function ContactAvatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold text-white">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export function WhatsAppNotification({
  state,
}: {
  state: WhatsAppNotificationState;
}) {
  const title = state.isGroup
    ? `${state.groupName ?? "Gruppo"} · ${state.contactName}`
    : state.contactName;

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-4 pt-14">
      <div className="rounded-2xl border border-white/10 bg-white/[0.97] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex gap-3">
          <ContactAvatar name={state.contactName} src={state.contactAvatar} />
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#25D366]">
                WhatsApp
              </span>
              <span className="shrink-0 text-xs text-zinc-500">{state.time}</span>
            </div>
            <p className="truncate text-[15px] font-semibold text-zinc-900">{title}</p>
            <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-zinc-600">
              {state.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
