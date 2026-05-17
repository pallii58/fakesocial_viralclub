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

/** Icone fedeli ai loghi ufficiali, stile neon (Instagram invariato). */
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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="0.45" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {brand === "instagram" && (
          <linearGradient id={`${id}-ig`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f58529" />
            <stop offset="35%" stopColor="#dd2a7b" />
            <stop offset="70%" stopColor="#8134af" />
            <stop offset="100%" stopColor="#515bd4" />
          </linearGradient>
        )}
      </defs>

      {/* Instagram — invariato (perfetto) */}
      {brand === "instagram" && (
        <g filter={`url(#${id}-glow)`} transform="scale(0.92) translate(1 1)">
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5.5"
            stroke={`url(#${id}-ig)`}
            strokeWidth="1.75"
            fill="none"
          />
          <circle
            cx="12"
            cy="12"
            r="4.5"
            stroke={`url(#${id}-ig)`}
            strokeWidth="1.75"
            fill="none"
          />
          <circle cx="17.2" cy="6.8" r="1.1" fill="#ff49c8" />
        </g>
      )}

      {/* WhatsApp — bolla + telefono (logo ufficiale) */}
      {brand === "whatsapp" && (
        <g filter={`url(#${id}-glow)`}>
          <path
            fill={colors.primary}
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
          />
        </g>
      )}

      {/* Facebook — f nel cerchio */}
      {brand === "facebook" && (
        <g filter={`url(#${id}-glow)`}>
          <path
            fill={colors.primary}
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </g>
      )}

      {/* TikTok — nota con effetto cyan/rosso */}
      {brand === "tiktok" && (
        <g filter={`url(#${id}-glow)`}>
          <path
            fill="#00f2ea"
            d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"
            transform="translate(-0.35 -0.2)"
            opacity="0.95"
          />
          <path
            fill="#ff004f"
            d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"
            transform="translate(0.35 0.2)"
            opacity="0.95"
          />
          <path
            fill="#ffffff"
            d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"
          />
        </g>
      )}

      {/* YouTube — play nel rettangolo arrotondato */}
      {brand === "youtube" && (
        <g filter={`url(#${id}-glow)`}>
          <path
            fill={colors.primary}
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          />
        </g>
      )}
    </svg>
  );
}
