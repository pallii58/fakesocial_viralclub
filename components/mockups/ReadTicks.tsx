import type { ReadStatus } from "@/lib/types";

const GRAY = "#8696a0";
const BLUE = "#53bdeb";

/** Path spunte WhatsApp (stile ufficiale, fill) */
const TICK_BACK =
  "M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.642.018l-.362.354a.48.48 0 0 0 .018.67l3.13 2.96a.46.46 0 0 0 .642-.019l6.856-8.475a.48.48 0 0 0-.018-.67l-.35-.354z";

const TICK_FRONT =
  "M15.354 1.064l-.478-.373a.494.494 0 0 0-.707.073L8.93 9.233 5.383 5.686a.494.494 0 0 0-.707.073l-.478.373a.488.488 0 0 0 .073.693l4.92 4.838a.494.494 0 0 0 .707-.073l7.053-8.721a.49.49 0 0 0-.073-.693z";

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
        width="16"
        height="11"
        viewBox="0 0 16 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden
      >
        {showDouble && <path fill={color} d={TICK_BACK} />}
        <path fill={color} d={TICK_FRONT} />
      </svg>
    </span>
  );
}
