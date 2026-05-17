import { platformNeon } from "@/lib/brand";

export type BrandId =
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "youtube";

interface NeonBrandLogoProps {
  brand: BrandId;
  size?: number;
  className?: string;
}

const strokeProps = {
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export function NeonBrandLogo({
  brand,
  size = 48,
  className = "",
}: NeonBrandLogoProps) {
  const colors = platformNeon[brand];
  const id = `neon-${brand}`;
  const sw = 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`${id}-ig`} x1="8" y1="40" x2="40" y2="8">
          <stop offset="0%" stopColor="#ffaa33" />
          <stop offset="45%" stopColor="#ff49c8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id={`${id}-tt`} x1="14" y1="10" x2="36" y2="38">
          <stop offset="0%" stopColor="#00f7f3" />
          <stop offset="100%" stopColor="#ff2d55" />
        </linearGradient>
      </defs>

      <g filter={`url(#${id}-glow)`}>
        {brand === "whatsapp" && (
          <>
            <path
              d="M24 6c-9.4 0-17 7.1-17 15.9 0 2.8.7 5.5 2 7.9L7 40l10.4-2.7c2.2 1.2 4.7 1.8 6.6 1.8 9.4 0 17-7.1 17-15.9S33.4 6 24 6z"
              stroke={colors.primary}
              strokeWidth={sw}
              {...strokeProps}
            />
            <path
              d="M17.5 19.5c.4-.9 1.1-.9 1.7-.1l1.4 1.9c.4.6 1.1.7 1.7.3l2.8-2c.7-.5 1.4-.3 1.9.5l1.5 2.5c.5.9.2 1.8-.8 2.4-2.4 1.3-5.2 2.6-7.2 4.3-1 .7-2.2.4-2.8-.6l-1.5-2.5c-.5-.8-.3-1.6.5-2.1l2.5-1.7"
              stroke={colors.primary}
              strokeWidth={1.6}
              {...strokeProps}
            />
          </>
        )}

        {brand === "instagram" && (
          <>
            <rect
              x="9"
              y="9"
              width="30"
              height="30"
              rx="8"
              stroke={`url(#${id}-ig)`}
              strokeWidth={sw + 0.25}
              {...strokeProps}
            />
            <circle
              cx="24"
              cy="24"
              r="6.5"
              stroke={`url(#${id}-ig)`}
              strokeWidth={sw + 0.25}
              {...strokeProps}
            />
            <circle
              cx="32.5"
              cy="15.5"
              r="2"
              stroke={`url(#${id}-ig)`}
              strokeWidth={1.75}
              {...strokeProps}
            />
          </>
        )}

        {brand === "facebook" && (
          <>
            <circle
              cx="24"
              cy="24"
              r="18"
              stroke={colors.primary}
              strokeWidth={sw}
              {...strokeProps}
            />
            <path
              d="M27.5 15h-4.5c-2.5 0-4.5 2-4.5 4.5v3h-3.5v4.5h3.5V33h5v-10.5h4.5l.8-4.5h-5.3v-3c0-.8.7-1.5 1.5-1.5h3.5V15z"
              stroke={colors.primary}
              strokeWidth={sw}
              {...strokeProps}
            />
          </>
        )}

        {brand === "tiktok" && (
          <>
            <path
              d="M29 11v6.8c1.6-.15 3.2.35 4.5 1.4"
              stroke="#00f7f3"
              strokeWidth={sw}
              {...strokeProps}
            />
            <path
              d="M29 11h5v13.5c0 4.5-3.7 8.2-8.2 8.2s-8.2-3.7-8.2-8.2 3.7-8.2 8.2-8.2c.55 0 1.1.05 1.6.15v5"
              stroke={`url(#${id}-tt)`}
              strokeWidth={sw}
              {...strokeProps}
            />
          </>
        )}

        {brand === "youtube" && (
          <>
            <rect
              x="5"
              y="13"
              width="38"
              height="22"
              rx="7"
              stroke={colors.primary}
              strokeWidth={sw}
              {...strokeProps}
            />
            <path
              d="M20 18.5v11l11-5.5-11-5.5z"
              stroke={colors.primary}
              strokeWidth={sw}
              {...strokeProps}
            />
          </>
        )}
      </g>
    </svg>
  );
}
