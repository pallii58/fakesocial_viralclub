import Link from "next/link";

export interface HubLink {
  href: string;
  title: string;
  description: string;
  color?: string;
}

interface PlatformHubProps {
  platformName: string;
  color: string;
  links: HubLink[];
}

export function PlatformHub({ platformName, color, links }: PlatformHubProps) {
  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-12">
      <div className="mx-auto max-w-lg">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
          ← Home
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900">{platformName}</h1>
        <p className="mt-1 text-zinc-600">Scegli il tipo di mock</p>
        <div className="mt-8 grid gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              style={{ borderColor: undefined }}
            >
              <h2
                className="text-lg font-semibold"
                style={{ color: link.color ?? color }}
              >
                {link.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
