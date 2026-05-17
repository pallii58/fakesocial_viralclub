import type { BrandId } from "@/components/brand/NeonBrandLogo";
import { NeonBrandLogo } from "@/components/brand/NeonBrandLogo";
import { getPlatformTheme } from "@/lib/brand";
import { BackLink } from "./BackLink";
import { GradientCard } from "./GradientCard";
import { PageShell } from "./PageShell";

export interface HubLink {
  href: string;
  title: string;
  description: string;
}

interface PlatformHubProps {
  platformName: string;
  brand: BrandId;
  links: HubLink[];
}

export function PlatformHub({ platformName, brand, links }: PlatformHubProps) {
  const theme = getPlatformTheme(brand);

  return (
    <PageShell showHeader={false}>
      <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <BackLink href="/" />
        <div className="mt-6 flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-black/60"
            style={{
              borderColor: theme.border,
              boxShadow: `0 0 30px ${theme.glow}`,
            }}
          >
            <NeonBrandLogo brand={brand} size={44} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{platformName}</h1>
            <p className="text-sm text-zinc-400">Scegli il tipo di mock</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4">
          {links.map((link) => (
            <GradientCard
              key={link.href}
              href={link.href}
              title={link.title}
              description={link.description}
              brand={brand}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
