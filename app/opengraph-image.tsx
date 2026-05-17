import { ImageResponse } from "next/og";
import { og, platformDots } from "@/lib/og-art";

export const alt = "ViralClub — Fake Social: mock di chat e DM per social";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: og.black,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${og.purple}44 0%, transparent 65%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${og.purpleDark}55 0%, transparent 65%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "42%",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${og.purple}22 0%, transparent 70%)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${og.purpleDark}, ${og.purple}, ${og.purpleLight})`,
              boxShadow: `0 0 40px ${og.purple}66`,
            }}
          >
            <span style={{ fontSize: 40, fontWeight: 800, color: og.white }}>V</span>
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: og.muted,
              letterSpacing: 0.5,
            }}
          >
            ViralClub
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: og.white,
            }}
          >
            Fake Social
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.35,
              color: og.muted,
              maxWidth: 820,
            }}
          >
            Mock di chat, DM e commenti su WhatsApp, Instagram, Facebook, TikTok e
            YouTube — pronti in un click.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {platformDots.map((p) => (
            <div
              key={p.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 20px",
                borderRadius: 999,
                background: `${p.color}18`,
                border: `1px solid ${p.color}44`,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: p.color,
                  boxShadow: `0 0 12px ${p.color}`,
                }}
              />
              <span style={{ fontSize: 22, fontWeight: 600, color: og.white }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
