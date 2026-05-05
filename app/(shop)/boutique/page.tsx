import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackground } from "@/components/sections/HeroBackground";

export const metadata: Metadata = {
  title: "Boutique · Bientôt disponible",
  description:
    "Notre boutique en ligne arrive très bientôt. En attendant, contactez-nous directement à info@scrap-up.fr pour passer commande.",
  robots: { index: false, follow: true },
};

export default function BoutiquePage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="font-handwritten text-2xl text-accent">✶ on s&apos;active</p>

        <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
          Bientôt disponible.
        </h1>

        <p className="mx-auto mt-8 max-w-xl font-body text-lg leading-relaxed text-ink-soft md:text-xl">
          Notre boutique en ligne arrive très bientôt. En attendant, contactez-nous
          directement à{" "}
          <a
            href="mailto:info@scrap-up.fr"
            className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
          >
            info@scrap-up.fr
          </a>{" "}
          pour passer commande.
        </p>

        <div className="mt-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-pill bg-accent px-8 py-4 font-body text-base font-medium text-bg-base shadow-magic transition-transform duration-200 will-change-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:-translate-x-1"
            >
              ←
            </span>
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
