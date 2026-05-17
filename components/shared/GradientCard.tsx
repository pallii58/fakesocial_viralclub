"use client";

import Link from "next/link";
import type { BrandId } from "@/components/brand/NeonBrandLogo";
import { NeonBrandLogo } from "@/components/brand/NeonBrandLogo";
import { getPlatformTheme } from "@/lib/brand";

interface GradientCardProps {
  href: string;
  title: string;
  description: string;
  brand?: BrandId;
}

export function GradientCard({
  href,
  title,
  description,
  brand,
}: GradientCardProps) {
  const theme = getPlatformTheme(brand);

  return (
    <Link
      href={href}
      className="platform-card group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-[#12121a]/90 to-[#0a0a10]/90 p-6 backdrop-blur-sm transition duration-300 hover:shadow-[0_0_40px_var(--card-glow)]"
      style={
        {
          "--card-glow": theme.glow,
          "--card-border": theme.border,
          "--card-border-hover": theme.borderHover,
          "--card-overlay": theme.overlay,
          "--card-accent": theme.primary,
          borderColor: "var(--card-border)",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to bottom right, var(--card-overlay), transparent)",
        }}
      />
      <div className="relative">
        {brand && (
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border bg-black/50"
            style={{
              borderColor: theme.border,
              boxShadow: `0 0 24px ${theme.glow}`,
            }}
          >
            <NeonBrandLogo brand={brand} size={30} className="block" />
          </div>
        )}
        <h2 className="text-lg font-semibold text-white transition-colors group-hover:text-[color:var(--card-accent)]">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-zinc-400 transition group-hover:text-zinc-300">
          {description}
        </p>
        <span
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium opacity-0 transition group-hover:opacity-100"
          style={{ color: theme.primary }}
        >
          Apri →
        </span>
      </div>
    </Link>
  );
}
