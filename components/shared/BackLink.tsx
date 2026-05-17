import Link from "next/link";

interface BackLinkProps {
  href: string;
  children?: React.ReactNode;
}

function BackArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform group-hover:-translate-x-0.5"
      aria-hidden
    >
      <path
        d="M10 3L5 8L10 13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BackLink({ href, children = "Home" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-violet-400/80 transition hover:text-violet-300"
    >
      <BackArrowIcon />
      <span>{children}</span>
    </Link>
  );
}
