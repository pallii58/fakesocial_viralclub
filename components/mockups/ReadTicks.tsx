import type { ReadStatus } from "@/lib/types";

const GRAY = "#8696a0";
const BLUE = "#53bdeb";

/** Spunte stile WhatsApp: 1 grigia | 2 grigie | 2 celesti */
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
        width={showDouble ? 16 : 10}
        height="11"
        viewBox={showDouble ? "0 0 16 11" : "0 0 10 11"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {showDouble && (
          <path
            d="M1.2 5.8L3.1 7.7 6.6 3.6"
            stroke={color}
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        <path
          d={
            showDouble
              ? "M5.2 5.8L7.1 7.7 14.2 1.2"
              : "M1.2 5.8L3.1 7.7 8.2 1.2"
          }
          stroke={color}
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
