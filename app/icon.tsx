import { ImageResponse } from "next/og";
import { og } from "@/lib/og-art";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${og.purpleDark} 0%, ${og.purple} 55%, ${og.purpleLight} 100%)`,
          borderRadius: 8,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: og.white,
            letterSpacing: -1,
            marginTop: 1,
          }}
        >
          V
        </span>
      </div>
    ),
    { ...size },
  );
}
