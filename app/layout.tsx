import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Scrap-up — Boîtes anniversaire enfants",
    template: "%s · Scrap-up",
  },
  description:
    "Une boîte, une fête, des étoiles plein la tête. Boîtes cadeau enfant à thème : Mickey, Licorne, Princesse… Livraison gratuite dès 50 €.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="bg-bg-base text-ink antialiased">{children}</body>
    </html>
  );
}
