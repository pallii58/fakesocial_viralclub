import Link from "next/link";
import { AppLogo } from "./AppLogo";

interface PageShellProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function PageShell({ children, showHeader = true }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050508]">
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-violet-600/15 blur-[140px]" />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      {showHeader && (
        <header className="relative border-b border-white/5 bg-black/40 px-4 py-5 backdrop-blur-xl sm:px-12">
          <div className="mx-auto flex max-w-5xl items-center">
            <Link href="/" className="inline-flex items-end gap-3">
              <AppLogo size="md" priority />
              <span className="bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-4xl font-bold leading-none tracking-tight text-transparent sm:text-5xl">
                Fake Social
              </span>
            </Link>
          </div>
        </header>
      )}

      <div className="relative">{children}</div>
    </div>
  );
}
