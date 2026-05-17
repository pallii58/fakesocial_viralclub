import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";

interface BackLinkProps {
  href: string;
  children?: React.ReactNode;
}

export function BackLink({ href, children = "Home" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-violet-400/80 transition hover:text-violet-300"
    >
      <ArrowIcon
        direction="left"
        className="transition-transform group-hover:-translate-x-0.5"
      />
      <span>{children}</span>
    </Link>
  );
}
