interface ArrowIconProps {
  direction?: "left" | "right";
  size?: number;
  className?: string;
}

export function ArrowIcon({
  direction = "left",
  size = 16,
  className = "",
}: ArrowIconProps) {
  const path =
    direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
