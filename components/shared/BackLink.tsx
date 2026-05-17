import Link from "next/link";

interface BackLinkProps {
  href: string;
  children?: React.ReactNode;
}

export function BackLink({ href, children = "← Home" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm font-medium text-violet-400/80 transition hover:text-violet-300"
    >
      {children}
    </Link>
  );
}
