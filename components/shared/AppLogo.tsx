import Image from "next/image";
import { VIRALCLUB_LOGO, VIRALCLUB_LOGO_ASPECT } from "@/lib/brand";

interface AppLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

const heights = {
  sm: 22,
  md: 32,
  lg: 48,
} as const;

export function AppLogo({
  className = "",
  size = "md",
  priority = false,
}: AppLogoProps) {
  const height = heights[size];
  const width = Math.round(height * VIRALCLUB_LOGO_ASPECT);

  return (
    <Image
      src={VIRALCLUB_LOGO}
      alt="ViralClub"
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-auto object-contain object-left ${className}`}
      style={{ maxHeight: height, width: "auto", maxWidth: width }}
    />
  );
}
