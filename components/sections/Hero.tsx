import Image from "next/image";
import Link from "next/link";
import { HeroBackground } from "./HeroBackground";
import { HeroReveal } from "./HeroReveal";

export function Hero() {
  return (
    <section
      aria-label="Présentation Scrap-up"
      className="relative isolate min-h-[88vh] overflow-hidden"
    >
      <HeroBackground />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 pt-32 md:grid-cols-12 md:gap-8 md:px-12 md:pt-40">
        {/* Colonne texte — 7 cols sur desktop */}
        <div className="md:col-span-7 md:pr-8">
          <HeroReveal>
            <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
              Une boîte, une fête,
              <br />
              des{" "}
              <em className="font-handwritten not-italic text-accent text-[0.92em] inline-block -rotate-3 align-baseline">
                étoiles
              </em>{" "}
              plein la tête.
            </h1>
            <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-ink-soft md:text-xl">
              Pensées pour transformer chaque anniversaire en un moment magique.
              Pack de 8, livraison gratuite dès 50 €.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/boutique"
                className="group inline-flex items-center gap-2 rounded-pill bg-accent px-8 py-4 font-body text-base font-medium text-bg-base shadow-magic transition-transform duration-200 will-change-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Découvrir nos boîtes
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="#themes"
                className="font-body text-base text-ink-soft underline decoration-ink-mute decoration-1 underline-offset-4 transition-colors hover:text-ink"
              >
                Voir les thèmes
              </Link>
            </div>
          </HeroReveal>
        </div>

        {/* Colonne photo — 5 cols, déborde légèrement à droite, sans caption */}
        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-soft md:-mr-12 md:aspect-[3/4]">
            <Image
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80&auto=format&fit=crop"
              alt="Table de fête d'anniversaire enfant aux teintes pastel"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
