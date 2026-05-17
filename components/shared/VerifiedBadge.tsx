/** Spunta verificata Instagram / TikTok (rosetta blu ufficiale) */
export function VerifiedBadge({
  className = "",
  size = 14,
}: {
  className?: string;
  size?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/badges/verified-instagram.png"
      alt=""
      width={size}
      height={size}
      className={`inline-block shrink-0 align-middle object-contain ${className}`}
      aria-hidden
      draggable={false}
    />
  );
}
