import type { ReadStatus } from "@/lib/types";

const GRAY = "#8696A0";
const BLUE = "#53C2EC";

const TICK_DOUBLE_BACK = "M13.5 7L6 15l-4-4";
const TICK_FRONT = "M18 7L10.5 15l-4-4";

const STROKE = {
  strokeWidth: "1.75",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Spunte stile WhatsApp: 1 grigia | 2 grigie | 2 blu */
export function ReadTicks({ status }: { status?: ReadStatus }) {
  const resolved = status ?? "sent";
  const color = resolved === "read" ? BLUE : GRAY;
  const showDouble = resolved === "delivered" || resolved === "read";

  const label =
    resolved === "sent"
      ? "Inviato"
      : resolved === "delivered"
        ? "Consegnato"
        : "Letto";

  return (
    <span
      className="ml-0.5 inline-flex shrink-0 items-center"
      aria-label={label}
    >
      <svg
        width="12"
        height="8"
        viewBox={showDouble ? "4 6 16 11" : "9 6 11 10"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden
      >
        {showDouble && (
          <path d={TICK_DOUBLE_BACK} stroke={color} {...STROKE} />
        )}
        <path d={TICK_FRONT} stroke={color} {...STROKE} />
      </svg>
    </span>
  );
}
