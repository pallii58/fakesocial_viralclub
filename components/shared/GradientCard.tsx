"use client";

import Link from "next/link";
import type { BrandId } from "@/components/brand/NeonBrandLogo";
import { NeonBrandLogo } from "@/components/brand/NeonBrandLogo";
import { platformNeon } from "@/lib/brand";

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
  const glow = brand ? platformNeon[brand]?.glow : "rgba(139,92,246,0.4)";

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#12121a]/90 to-[#0a0a10]/90 p-6 backdrop-blur-sm transition duration-300 hover:border-violet-400/50 hover:shadow-[0_0_40px_var(--card-glow)]"
      style={{ "--card-glow": glow } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="relative">
        {brand && (
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/5 bg-black/50"
            style={{ boxShadow: `0 0 24px ${glow}` }}
          >
            <NeonBrandLogo brand={brand} size={40} />
          </div>
        )}
        <h2 className="text-lg font-semibold text-white transition group-hover:text-violet-200">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-zinc-400 transition group-hover:text-zinc-300">
          {description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-violet-400 opacity-0 transition group-hover:opacity-100">
          Apri →
        </span>
      </div>
    </Link>
  );
}
