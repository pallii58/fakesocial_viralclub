import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "ViralClub — Fake Social",
  description:
    "Tool ViralClub per mock di chat, DM e commenti su WhatsApp, Instagram, Facebook, TikTok e YouTube.",
  applicationName: "ViralClub Fake Social",
  openGraph: {
    title: "ViralClub — Fake Social",
    description:
      "Mock di chat, DM e commenti su WhatsApp, Instagram, Facebook, TikTok e YouTube — pronti in un click.",
    siteName: "ViralClub",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralClub — Fake Social",
    description:
      "Mock di chat, DM e commenti su WhatsApp, Instagram, Facebook, TikTok e YouTube — pronti in un click.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${geist.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
