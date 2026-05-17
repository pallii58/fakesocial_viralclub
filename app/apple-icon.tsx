import { ImageResponse } from "next/og";
import { og } from "@/lib/og-art";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: og.black,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            left: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${og.purple}55 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -50,
            right: -30,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${og.purpleDark}66 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 112,
            height: 112,
            borderRadius: 28,
            background: `linear-gradient(135deg, ${og.purpleDark}, ${og.purple}, ${og.purpleLight})`,
            boxShadow: `0 0 48px ${og.purple}88`,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: og.white,
              letterSpacing: -3,
            }}
          >
            V
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
