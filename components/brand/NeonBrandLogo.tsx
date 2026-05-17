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

export function NeonBrandLogo({
  brand,
  size = 48,
  className = "",
}: NeonBrandLogoProps) {
  const colors = platformNeon[brand];
  const id = `neon-${brand}`;

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
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {brand === "instagram" && (
          <linearGradient id={`${id}-grad`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffaa33" />
            <stop offset="50%" stopColor="#ff49c8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        )}
        {brand === "tiktok" && (
          <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f7f3" />
            <stop offset="100%" stopColor="#ff2d55" />
          </linearGradient>
        )}
      </defs>

      {brand === "whatsapp" && (
        <g filter={`url(#${id}-glow)`}>
          <path
            d="M24 4C13.5 4 5 12.1 5 22.2c0 3.6 1 7 2.7 10L5 40l8.2-2.1c2.9 1.6 6.2 2.5 10.8 2.5 10.5 0 19-8.1 19-18.2S34.5 4 24 4z"
            stroke={colors.primary}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M18 20c.5-1 1.2-1 1.8-.2l1.2 1.6c.5.7 1.3.8 2 .3l2.4-1.8c.8-.6 1.6-.4 2.1.4l1.4 2.4c.5.9.2 1.8-.7 2.3-2.2 1.2-4.8 2.5-6.8 4.2-1 .8-2.2.5-2.8-.5l-1.4-2.4c-.5-.8-.3-1.6.5-2.1l2.2-1.5"
            stroke={colors.primary}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}

      {brand === "instagram" && (
        <g filter={`url(#${id}-glow)`}>
          <rect
            x="8"
            y="8"
            width="32"
            height="32"
            rx="9"
            stroke={`url(#${id}-grad)`}
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r="7.5"
            stroke={`url(#${id}-grad)`}
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="33" cy="15" r="2.5" fill={colors.primary} />
        </g>
      )}

      {brand === "facebook" && (
        <g filter={`url(#${id}-glow)`}>
          <path
            d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z"
            stroke={colors.primary}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M27 14h-4c-2.2 0-4 1.8-4 4v3h-3v4h3v10h4V25h4l1-4h-5v-3c0-.6.4-1 1-1h4V14z"
            fill={colors.primary}
          />
        </g>
      )}

      {brand === "tiktok" && (
        <g filter={`url(#${id}-glow)`}>
          <path
            d="M30 8v6.5c1.8-.2 3.5.3 5 1.5V20c-1.8-1.3-4-1.8-6.2-1.5v11.8c0 4.8-3.9 8.7-8.7 8.7S11.4 35.1 11.4 30.3s3.9-8.7 8.7-8.7c.6 0 1.2.1 1.7.2v5.2a3.5 3.5 0 00-1.7-.4 3.7 3.7 0 100 7.4 3.7 3.7 0 003.7-3.7V8H30z"
            fill={`url(#${id}-grad)`}
          />
        </g>
      )}

      {brand === "youtube" && (
        <g filter={`url(#${id}-glow)`}>
          <rect
            x="6"
            y="12"
            width="36"
            height="24"
            rx="6"
            stroke={colors.primary}
            strokeWidth="2"
            fill="none"
          />
          <path d="M21 18v12l12-6-12-6z" fill={colors.primary} />
        </g>
      )}
    </svg>
  );
}
