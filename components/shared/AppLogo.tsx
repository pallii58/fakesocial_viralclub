interface AppLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-4xl",
};

export function AppLogo({ className = "", size = "md" }: AppLogoProps) {
  return (
    <span
      className={`font-bold tracking-tight bg-gradient-to-r from-violet-300 via-purple-400 to-violet-600 bg-clip-text text-transparent ${sizes[size]} ${className}`}
    >
      Fake Social
    </span>
  );
}
