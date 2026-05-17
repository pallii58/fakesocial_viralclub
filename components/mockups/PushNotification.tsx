"use client";

import Image from "next/image";
import { NeonBrandLogo } from "@/components/brand/NeonBrandLogo";
import type { BrandId } from "@/components/brand/NeonBrandLogo";
import { getNotificationConfig } from "@/lib/notification-config";
import type { PushNotificationState } from "@/lib/types";

function ContactAvatar({
  name,
  src,
  avatarBg,
  avatarText,
  squared = false,
}: {
  name: string;
  src?: string;
  avatarBg: string;
  avatarText: string;
  squared?: boolean;
}) {
  const shape = squared ? "rounded-[10px]" : "rounded-full";

  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={40}
        height={40}
        className={`h-10 w-10 shrink-0 object-cover ${shape}`}
      />
    );
  }

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center text-sm font-bold ${shape}`}
      style={{ background: avatarBg, color: avatarText }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

interface PushNotificationProps {
  brand: BrandId;
  state: PushNotificationState;
  /** Solo card notifica, senza sfondo telefono (export trasparente) */
  bare?: boolean;
}

export function PushNotification({
  brand,
  state,
  bare = false,
}: PushNotificationProps) {
  const config = getNotificationConfig(brand);
  const title = state.isGroup
    ? `${state.groupName ?? "Gruppo"} · ${state.contactName}`
    : state.contactName;

  const headerLabel = config.showAppIcon ? (
    <NeonBrandLogo brand={brand} size={20} className="shrink-0" />
  ) : (
    <span
      className="text-[11px] font-semibold uppercase tracking-wide"
      style={{ color: config.accent }}
    >
      {config.appLabel}
    </span>
  );

  const card = config.avatarBottomRight ? (
    <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.97] p-3 pr-[3.25rem] shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="mb-0.5 flex items-center justify-between gap-2">
        {headerLabel}
        <span className="shrink-0 text-xs text-zinc-500">{state.time}</span>
      </div>
      <p className="truncate text-[15px] font-semibold text-zinc-900">{title}</p>
      <p className="mt-0.5 line-clamp-3 text-sm leading-snug text-zinc-600">
        {state.message}
      </p>
      <div className="absolute bottom-3 right-3">
        <ContactAvatar
          name={state.contactName}
          src={state.contactAvatar}
          avatarBg={config.avatarBg}
          avatarText={config.avatarText}
          squared
        />
      </div>
    </div>
  ) : (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.97] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex gap-3">
        <ContactAvatar
          name={state.contactName}
          src={state.contactAvatar}
          avatarBg={config.avatarBg}
          avatarText={config.avatarText}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center justify-between gap-2">
            {headerLabel}
            <span className="shrink-0 text-xs text-zinc-500">{state.time}</span>
          </div>
          <p className="truncate text-[15px] font-semibold text-zinc-900">{title}</p>
          <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-zinc-600">
            {state.message}
          </p>
        </div>
      </div>
    </div>
  );

  if (bare) return card;

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-4 pt-14">
      {card}
    </div>
  );
}
