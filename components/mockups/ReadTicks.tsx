import type { ReadStatus } from "@/lib/types";

const GRAY = "#8696A0";
const BLUE = "#53C2EC";

const TICK_SINGLE = "M20 6L9 17l-5-5";
const TICK_DOUBLE_BACK = "M13 17l-5-5";
const TICK_DOUBLE_FRONT = "M18 6l-9 9";

/** Spunte stile WhatsApp: 1 grigia | 2 grigie | 2 blu */
export function ReadTicks({ status }: { status?: ReadStatus }) {
  const resolved = status ?? "sent";
  const color = resolved === "read" ? BLUE : GRAY;
  const showDouble = resolved === "delivered" || resolved === "read";

  return (
    <span
      className="ml-0.5 inline-flex shrink-0 items-center"
      aria-label={
        resolved === "sent"
          ? "Inviato"
          : resolved === "delivered"
            ? "Consegnato"
            : "Letto"
      }
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden
      >
        {showDouble ? (
          <>
            <path
              d={TICK_DOUBLE_BACK}
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={TICK_DOUBLE_FRONT}
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <path
            d={TICK_SINGLE}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </span>
  );
}
