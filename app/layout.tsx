import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://scrap-up.com"
  ),
  title: {
    default: "Scrap-up — Boîtes anniversaire enfants",
    template: "%s · Scrap-up",
  },
  description:
    "Une boîte, une fête, des étoiles plein la tête. Boîtes cadeau enfant à thème : Mickey, Licorne, Princesse… Livraison gratuite dès 50 €.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Scrap-up",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Scrap-up" }],
};

export const viewport: Viewport = {
  themeColor: "#FDF9F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="relative min-h-screen bg-bg-base text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
