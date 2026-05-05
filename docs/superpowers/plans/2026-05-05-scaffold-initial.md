# Scrap-up — Scaffold initial Next.js 15 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mettre debout un projet Next.js 15 + Tailwind v4 + Motion fonctionnel avec une page d'accueil contenant un Hero "Editorial Whimsical" pleinement designé, déployable en preview Vercel — comme socle visuel à valider AVANT d'implémenter boutique/produits/panier/checkout.

**Architecture :** App Router strict, Server Components par défaut avec deux îlots Client localisés (animation hero + bouton CTA), Tailwind v4 CSS-first (`@theme`), tokens design exposés via variables CSS et consommés à la fois par Tailwind et par les composants. Polices Google chargées via `next/font` (zéro request externe, FOIT prevented). Aucune dépendance Lottie/Magic UI au scaffold (économie ~50kb gzip). Aucun panier/Stripe au scaffold (Zustand + Stripe arriveront avec la boutique).

**Tech Stack :**
- **Framework** : Next.js `15.x` (App Router, Turbopack dev)
- **React** : `19.x`
- **TypeScript** : `5.x` (strict)
- **Tailwind** : `4.x` + `@tailwindcss/postcss` `4.x`
- **Animations** : `motion` `12.x` (ex-Framer Motion)
- **Utils** : `clsx` `2.x`
- **Tests** : `@playwright/test` `1.x`
- **Polices** : `Fraunces`, `Manrope`, `Homemade Apple` via `next/font/google`

**Décisions de design (rappel brainstorm) :**
- Catalogue : scrapé depuis `https://scrap-up.com` (étape ultérieure, hors-scaffold)
- Photos : placeholder Unsplash editorial pour le hero
- Stripe : non-installé au scaffold (stub plus tard)
- Lottie : non-installé au scaffold (Motion/CSS suffisent)
- Magic UI / React Bits : non-installés au scaffold (premier composant déclenchera l'install via shadcn)
- Vercel preview : connecté APRÈS validation du hero (Task 11+)

**Refs visuelles cibles :** Smallable (rigueur commerciale), Bonjour Maurice (chaleur), Milk Magazine / Mon Petit Art (gravitas éditoriale).

**Direction esthétique du Hero :**
- Asymétrie : photo qui déborde à droite, texte calé à gauche dans une grille 12 colonnes
- Mesh gradient ambré→rose pâle qui respire (animation 24s ease-in-out, pure CSS)
- Overlay grain noise (SVG inline sur `body::after`)
- Headline en Fraunces SOFT 100, italic stagger sur le mot "fête"
- Sub en Manrope, ink-soft
- Petit "✨" en Homemade Apple posé en accent au-dessus de la headline
- CTA "Découvrir nos boîtes" en accent-magique avec hover scale 1.03 (transform only)

---

## File Structure

```
scrap-up-nextjs/
├── package.json                          [créé Task 1]
├── tsconfig.json                         [créé Task 1, modifié Task 5]
├── next.config.ts                        [créé Task 1]
├── postcss.config.mjs                    [créé Task 1, modifié Task 3]
├── eslint.config.mjs                     [créé Task 1]
├── playwright.config.ts                  [créé Task 10]
├── .gitignore                            [étendu Task 1]
├── .env.local.example                    [créé Task 11]
├── README.md                             [créé Task 11]
├── app/
│   ├── layout.tsx                        [créé Task 6]
│   ├── globals.css                       [créé Task 1, réécrit Tasks 3 & 7]
│   ├── (shop)/
│   │   └── page.tsx                      [créé Task 9]
│   ├── (legal)/                          [.gitkeep — Task 5]
│   └── api/                              [.gitkeep — Task 5]
├── components/
│   ├── ui/                               [.gitkeep — Task 5]
│   ├── sections/
│   │   ├── Hero.tsx                      [créé Task 8 — Server]
│   │   ├── HeroBackground.tsx            [créé Task 7 — Server, CSS only]
│   │   └── HeroReveal.tsx                [créé Task 8 — Client]
│   ├── product/                          [.gitkeep — Task 5]
│   ├── cart/                             [.gitkeep — Task 5]
│   └── animations/                       [.gitkeep — Task 5]
├── lib/
│   ├── fonts.ts                          [créé Task 4]
│   └── utils.ts                          [créé Task 5 — `cn` helper]
├── content/
│   └── lottie/                           [.gitkeep — Task 5]
├── public/
│   └── .gitkeep                          [créé Task 1]
├── tests/
│   └── e2e/
│       └── hero.spec.ts                  [créé Task 10]
└── docs/
    └── superpowers/
        └── plans/
            └── 2026-05-05-scaffold-initial.md  [ce fichier]
```

**Files responsibilities :**
- `lib/fonts.ts` — instances `next/font` (Fraunces, Manrope, Homemade Apple) avec `variable` exposées globalement
- `lib/utils.ts` — `cn(...inputs)` helper minimal (clsx wrapper) — pas de tailwind-merge tant qu'on n'a pas de conflits
- `app/globals.css` — `@import "tailwindcss"`, bloc `@theme` (tokens couleurs/fonts/radii/shadows), reset perso, reduced-motion media query, noise overlay SVG, gradient mesh keyframes
- `app/layout.tsx` — HTML lang="fr", body classes (font variables + bg-base + ink), metadata baseline, balise pour grain overlay
- `app/(shop)/page.tsx` — page d'accueil, importe `<Hero />`
- `components/sections/Hero.tsx` — Server Component shell (texte hardcodé FR + `<Image>` Unsplash)
- `components/sections/HeroBackground.tsx` — Server Component, gradient mesh CSS, posé en `absolute inset-0 -z-10`
- `components/sections/HeroReveal.tsx` — Client Component (`"use client"`), wrap les enfants dans un stagger motion (respecte `useReducedMotion`)

---

## Task 1 : Initialiser le projet Next.js 15

**Files:**
- Créés : `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `public/`
- À supprimer après init : `app/page.tsx` (sera remplacé par `app/(shop)/page.tsx` en Task 9), `app/favicon.ico` (laissé), tous les exemples par défaut

- [ ] **Step 1.1** : Vérifier Node ≥ 20

```powershell
node --version
```
Expected : `v20.x.x` ou supérieur. Sinon, `nvm install 20`.

- [ ] **Step 1.2** : Initialiser le projet (à la racine `C:\Users\BAPTISTE\projects\scrap-up-nextjs`)

```powershell
npx create-next-app@latest . `
  --typescript `
  --tailwind `
  --app `
  --eslint `
  --no-src-dir `
  --import-alias "@/*" `
  --use-npm `
  --turbopack `
  --skip-install
```

Notes :
- Le dossier contient déjà `.git/`, `.gitignore`, `CLAUDE.md`, `docs/` — `create-next-app` doit accepter le dossier non-vide. Si refus, utiliser `npx create-next-app@latest scrap-up-tmp` puis copier les fichiers générés et supprimer `scrap-up-tmp`.
- `--skip-install` : on installera les deps en Task 2 avec versions épinglées.
- `--use-npm` : npm évite les soucis Windows + pnpm avec hardlinks. (Le user peut basculer plus tard.)

- [ ] **Step 1.3** : Étendre le `.gitignore` minimal pré-existant avec celui de Next.js

Le scaffold a écrasé `.gitignore`. Vérifier qu'il contient au moins :
```
node_modules/
.next/
out/
.env*.local
.vercel/
*.tsbuildinfo
next-env.d.ts
test-results/
playwright-report/
```

- [ ] **Step 1.4** : Vérifier que les fichiers générés sont là

```powershell
ls
```
Expected : `app/`, `public/`, `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`.

- [ ] **Step 1.5** : Commit

```powershell
git add -A
git commit -m "chore: scaffold Next.js 15 project (App Router, TS, Tailwind v4)"
```

---

## Task 2 : Épingler & installer les dépendances

**Files:**
- Modifié : `package.json` (versions exactes)

- [ ] **Step 2.1** : Réécrire `package.json` avec versions épinglées

```json
{
  "name": "scrap-up-nextjs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "dependencies": {
    "next": "15.1.6",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "motion": "12.0.6",
    "clsx": "2.1.1"
  },
  "devDependencies": {
    "@playwright/test": "1.49.1",
    "@tailwindcss/postcss": "4.0.0",
    "@types/node": "22.10.7",
    "@types/react": "19.0.7",
    "@types/react-dom": "19.0.3",
    "eslint": "9.18.0",
    "eslint-config-next": "15.1.6",
    "tailwindcss": "4.0.0",
    "typescript": "5.7.3"
  }
}
```

- [ ] **Step 2.2** : Installer

```powershell
npm install
```
Expected : pas d'erreur, `node_modules/` créé. Ignorer warnings dépréciés transitifs.

- [ ] **Step 2.3** : Installer les browsers Playwright (utilisés en Task 10)

```powershell
npx playwright install --with-deps chromium
```
Expected : Chromium téléchargé.

- [ ] **Step 2.4** : Vérifier que dev server démarre

```powershell
npm run dev
```
Expected : `Ready in Xs` + `http://localhost:3000`. Stopper avec Ctrl+C.

- [ ] **Step 2.5** : Commit

```powershell
git add package.json package-lock.json
git commit -m "chore: pin core dependencies (next 15, react 19, tailwind v4, motion 12)"
```

---

## Task 3 : Configurer Tailwind v4 + design tokens "Editorial Whimsical"

**Files:**
- Modifié : `app/globals.css` (réécrit complètement)
- Vérifié : `postcss.config.mjs` (créé par Task 1, ne devrait pas avoir besoin de modification)

- [ ] **Step 3.1** : Vérifier `postcss.config.mjs`

```powershell
cat postcss.config.mjs
```
Expected exactement :
```js
const config = {
  plugins: ["@tailwindcss/postcss"],
};
export default config;
```
Si différent, écraser avec ce contenu.

- [ ] **Step 3.2** : Réécrire `app/globals.css` avec les tokens

```css
@import "tailwindcss";

@theme {
  /* === BACKGROUNDS === */
  --color-bg-base: #FDF9F3;       /* crème poudré */
  --color-bg-elevated: #FFFCF7;   /* cartes, modals */
  --color-bg-warm: #F5EDE0;       /* sections alternées */

  /* === ENCRES === */
  --color-ink: #1A1A2E;           /* titres, contrastes forts */
  --color-ink-soft: #3A3A52;      /* corps de texte */
  --color-ink-mute: #6E6E85;      /* meta, captions */

  /* === PASTELS SATURÉS === */
  --color-rose-poudre: #F4C2C2;
  --color-lavande: #D4C5E2;
  --color-champagne: #E8D5A8;
  --color-mint-fee: #B8E0D2;

  /* === ACCENT MAGIQUE (CTA) === */
  --color-accent: #5B3A9E;        /* aubergine profond */
  --color-accent-soft: #7E5BC2;   /* hover */
  --color-accent-glow: rgba(91, 58, 158, 0.18);

  /* === OMBRES === */
  --shadow-soft: 0 1px 2px rgba(26, 26, 46, 0.06), 0 8px 24px rgba(26, 26, 46, 0.04);
  --shadow-magic: 0 8px 32px rgba(91, 58, 158, 0.18);

  /* === TYPOGRAPHIE === */
  --font-display: var(--font-fraunces);
  --font-body: var(--font-manrope);
  --font-handwritten: var(--font-homemade-apple);

  /* === RAYONS === */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-pill: 9999px;
}

/* === RESET LÉGER === */
@layer base {
  html {
    color-scheme: light;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  body {
    background-color: var(--color-bg-base);
    color: var(--color-ink);
    font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif;
    line-height: 1.6;
  }
  h1, h2, h3, h4 {
    font-family: var(--font-display), Georgia, serif;
    line-height: 1.1;
    color: var(--color-ink);
    letter-spacing: -0.02em;
  }
  ::selection {
    background-color: var(--color-accent);
    color: var(--color-bg-base);
  }
}

/* === REDUCED-MOTION GLOBAL === */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3.3** : Test rapide manuel

Ajouter temporairement dans `app/page.tsx` :
```tsx
export default function Page() {
  return (
    <main className="min-h-screen bg-bg-base text-ink p-8">
      <h1 className="font-display text-6xl">Test typo serif</h1>
      <p className="font-body text-ink-soft text-lg">Body en Manrope (à venir Task 4).</p>
      <button className="bg-accent text-bg-base px-6 py-3 rounded-pill mt-4">CTA</button>
    </main>
  );
}
```

```powershell
npm run dev
```
Expected dans le navigateur : fond crème, texte serif (police par défaut tant que Task 4 pas faite, mais `bg-bg-base`, `text-ink`, `bg-accent` doivent fonctionner — couleurs visibles). Vérifier via inspecteur que `--color-bg-base: #FDF9F3` est défini sur `:root`. Stopper.

- [ ] **Step 3.4** : Commit

```powershell
git add app/globals.css
git commit -m "feat: configure tailwind v4 with editorial whimsical design tokens"
```

---

## Task 4 : Brancher next/font (Fraunces + Manrope + Homemade Apple)

**Files:**
- Créé : `lib/fonts.ts`
- Modifié : `app/layout.tsx` (consommer les variables font)

- [ ] **Step 4.1** : Créer `lib/fonts.ts`

```ts
import { Fraunces, Manrope, Homemade_Apple } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const homemadeApple = Homemade_Apple({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-homemade-apple",
  display: "swap",
});

export const fontVariables = `${fraunces.variable} ${manrope.variable} ${homemadeApple.variable}`;
```

- [ ] **Step 4.2** : Modifier `app/layout.tsx` pour appliquer les variables

```tsx
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
```

- [ ] **Step 4.3** : Vérifier que les fonts chargent

```powershell
npm run dev
```
Ouvrir `http://localhost:3000`. Inspecter : `<html>` doit avoir 3 classes `__variable_xxxx`. `font-display` doit afficher Fraunces (italique caractéristique du `g`). Stopper.

- [ ] **Step 4.4** : Commit

```powershell
git add lib/fonts.ts app/layout.tsx
git commit -m "feat: wire next/font (fraunces, manrope, homemade apple)"
```

---

## Task 5 : Scaffolder la structure de dossiers + utilitaires

**Files:**
- Créés : `lib/utils.ts`, plus `.gitkeep` dans tous les dossiers vides

- [ ] **Step 5.1** : Créer `lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
```

- [ ] **Step 5.2** : Créer la structure de dossiers vides avec `.gitkeep`

```powershell
$dirs = @(
  "app/(legal)",
  "app/api",
  "components/ui",
  "components/sections",
  "components/product",
  "components/cart",
  "components/animations",
  "content/lottie",
  "tests/e2e"
)
foreach ($d in $dirs) {
  New-Item -ItemType Directory -Force -Path $d | Out-Null
  New-Item -ItemType File -Force -Path "$d/.gitkeep" | Out-Null
}
```

- [ ] **Step 5.3** : Vérifier l'arborescence

```powershell
tree /F /A app components lib content tests | Select-Object -First 40
```

- [ ] **Step 5.4** : Commit

```powershell
git add lib/ app/ components/ content/ tests/
git commit -m "chore: scaffold folder structure per CLAUDE.md section 7"
```

---

## Task 6 : Renforcer le layout root (metadata complète, viewport, theme color)

**Files:**
- Modifié : `app/layout.tsx`

- [ ] **Step 6.1** : Étendre `app/layout.tsx`

```tsx
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
```

- [ ] **Step 6.2** : Build de validation rapide

```powershell
npm run build
```
Expected : compile sans erreur, route `/` listée. Stopper après build.

- [ ] **Step 6.3** : Commit

```powershell
git add app/layout.tsx
git commit -m "feat: harden root layout with metadata, viewport, theme color"
```

---

## Task 7 : Background Hero (gradient mesh + grain noise) — pure CSS

**Files:**
- Modifié : `app/globals.css` (ajout en bas)
- Créé : `components/sections/HeroBackground.tsx`

- [ ] **Step 7.1** : Ajouter au bas de `app/globals.css` les keyframes + classes utilitaires custom

```css
/* === GRADIENT MESH ANIMÉ === */
@keyframes mesh-drift {
  0%, 100% {
    background-position: 0% 0%, 100% 0%, 50% 100%;
  }
  50% {
    background-position: 20% 30%, 80% 20%, 40% 70%;
  }
}

.mesh-hero {
  background-image:
    radial-gradient(circle at 20% 20%, var(--color-rose-poudre) 0%, transparent 50%),
    radial-gradient(circle at 80% 30%, var(--color-champagne) 0%, transparent 55%),
    radial-gradient(circle at 50% 90%, var(--color-lavande) 0%, transparent 60%);
  background-size: 140% 140%, 130% 130%, 150% 150%;
  background-repeat: no-repeat;
  animation: mesh-drift 24s ease-in-out infinite;
  filter: saturate(1.05);
}

/* === GRAIN NOISE OVERLAY (SVG inline en data URI) === */
.grain-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: 180px 180px;
}
```

- [ ] **Step 7.2** : Créer `components/sections/HeroBackground.tsx` (Server Component)

```tsx
export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="mesh-hero grain-overlay pointer-events-none absolute inset-0 -z-10"
    />
  );
}
```

- [ ] **Step 7.3** : Test visuel rapide en injectant dans `app/page.tsx`

```tsx
import { HeroBackground } from "@/components/sections/HeroBackground";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 p-12">
        <h1 className="font-display text-7xl">Test mesh + grain</h1>
      </div>
    </main>
  );
}
```

```powershell
npm run dev
```
Expected : fond crème avec halos rose/champagne/lavande qui dérivent doucement, texture grain perceptible. Le titre serif est lisible par-dessus. Stopper.

- [ ] **Step 7.4** : Commit

```powershell
git add app/globals.css components/sections/HeroBackground.tsx
git commit -m "style: add gradient mesh and grain noise hero background"
```

---

## Task 8 : Hero Section + reveal stagger (Server shell + Client island)

**Files:**
- Créé : `components/sections/Hero.tsx` (Server)
- Créé : `components/sections/HeroReveal.tsx` (Client)

- [ ] **Step 8.1** : Créer `components/sections/HeroReveal.tsx` (l'unique îlot Client)

```tsx
"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : (
            <motion.div variants={itemVariants}>{children}</motion.div>
          )}
    </motion.div>
  );
}
```

- [ ] **Step 8.2** : Créer `components/sections/Hero.tsx` (Server)

```tsx
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
            <span className="font-handwritten text-2xl text-accent md:text-3xl">
              ✶ une boîte, une fête
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
              Des étoiles{" "}
              <em className="font-display italic text-accent">plein la tête</em>{" "}
              à chaque anniversaire.
            </h1>
            <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-ink-soft md:text-xl">
              Boîtes cadeau pensées pour transformer chaque anniversaire enfant
              en moment magique. Pack de 8, livraison gratuite dès 50 €,
              expédition le jour-même avant 12 h.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/boutique"
                className="group inline-flex items-center gap-2 rounded-pill bg-accent px-8 py-4 font-body text-base font-medium text-bg-base shadow-magic transition-transform duration-200 will-change-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Découvrir nos boîtes
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
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

        {/* Colonne photo — 5 cols, déborde légèrement à droite */}
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
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -left-6 hidden font-handwritten text-2xl text-ink-mute md:block"
          >
            ★ pack de 8
          </span>
        </div>
      </div>
    </section>
  );
}
```

> **Note importante** : la photo Unsplash citée doit être **vérifiée disponible** au moment du scaffold. Si erreur 404, fallback vers `https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=80&auto=format&fit=crop`. Si Unsplash bloque le hotlink, télécharger une image dans `public/hero-placeholder.jpg` et ajuster le src. Documenter le source dans un commentaire.

- [ ] **Step 8.3** : Configurer Next.js pour autoriser le domaine images.unsplash.com

Modifier `next.config.ts` :

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 8.4** : Commit

```powershell
git add components/sections/Hero.tsx components/sections/HeroReveal.tsx next.config.ts
git commit -m "feat: build hero section with stagger reveal and editorial layout"
```

---

## Task 9 : Câbler le Hero sur la home page

**Files:**
- Supprimé : `app/page.tsx` (placeholder Task 1)
- Créé : `app/(shop)/page.tsx`

- [ ] **Step 9.1** : Supprimer le `app/page.tsx` par défaut

```powershell
Remove-Item app/page.tsx -Force
```

- [ ] **Step 9.2** : Créer `app/(shop)/page.tsx`

```tsx
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 9.3** : Démarrer le dev server et vérifier visuellement

```powershell
npm run dev
```
Expected dans `http://localhost:3000` :
- Fond crème animé (mesh) + grain perceptible
- Pré-titre handwritten "✶ une boîte, une fête" en aubergine
- H1 serif (Fraunces) avec "plein la tête" en italic + couleur accent
- Sub-paragraphe Manrope en ink-soft
- CTA aubergine "Découvrir nos boîtes" + lien secondaire
- Photo qui déborde à droite avec petit caption "★ pack de 8"
- Animation stagger au chargement (~1s)
- Aucune erreur dans la console

Test reduced-motion : ouvrir DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce" → recharger → aucun stagger, gradient mesh figé.

Stopper le dev server.

- [ ] **Step 9.4** : Commit

```powershell
git add app/page.tsx app/(shop)/page.tsx
git commit -m "feat: render hero on home page"
```

---

## Task 10 : Smoke test Playwright (hero)

**Files:**
- Créé : `playwright.config.ts`
- Créé : `tests/e2e/hero.spec.ts`

- [ ] **Step 10.1** : Créer `playwright.config.ts`

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 10.2** : Créer `tests/e2e/hero.spec.ts` (test ÉCHOUE d'abord ? Non, le code existe ; ce test confirme l'intégration)

```ts
import { test, expect } from "@playwright/test";

test.describe("Home page hero", () => {
  test("loads with headline, sub, CTA and image", async ({ page }) => {
    await page.goto("/");

    // Headline (présence du H1 + texte clé)
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("plein la tête");

    // Sub-paragraphe
    await expect(
      page.getByText("Boîtes cadeau pensées pour transformer", { exact: false })
    ).toBeVisible();

    // CTA principal
    const cta = page.getByRole("link", { name: /Découvrir nos boîtes/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/boutique");

    // Image hero présente avec alt non vide
    const heroImg = page.locator("img").first();
    await expect(heroImg).toBeVisible();
    await expect(heroImg).toHaveAttribute("alt", /.+/);

    // Aucune erreur console
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("respects prefers-reduced-motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await context.close();
  });
});
```

- [ ] **Step 10.3** : Lancer les tests

```powershell
npm run test:e2e
```
Expected : 2 passed.

- [ ] **Step 10.4** : Commit

```powershell
git add playwright.config.ts tests/
git commit -m "test: add hero smoke tests (playwright)"
```

---

## Task 11 : Documentation + variables d'environnement + verification finale

**Files:**
- Créé : `README.md`
- Créé : `.env.local.example`

- [ ] **Step 11.1** : Créer `.env.local.example`

```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BUSINESS_EMAIL=info@scrap-up.fr

# Stripe (à remplir plus tard)
# STRIPE_SECRET_KEY=
# STRIPE_WEBHOOK_SECRET=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend (à remplir plus tard)
# RESEND_API_KEY=
```

- [ ] **Step 11.2** : Créer `README.md` minimal

```markdown
# Scrap-up — Next.js 15

Refonte e-commerce de scrap-up.com (boîtes anniversaire enfant). Cf. [`CLAUDE.md`](./CLAUDE.md) pour la spec produit complète.

## Stack
Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Motion · Playwright

## Démarrer

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Build production |
| `npm run start` | Serveur production |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test:e2e` | Playwright E2E |

## État du scaffold

Hero validable. Boutique / produits / panier / checkout : à venir.

Plan d'exécution : [`docs/superpowers/plans/`](./docs/superpowers/plans/).
```

- [ ] **Step 11.3** : Lancer toute la batterie de vérifs

```powershell
npm run lint
```
Expected : `✔ No ESLint warnings or errors`.

```powershell
npm run typecheck
```
Expected : pas de sortie (succès).

```powershell
npm run build
```
Expected : `Compiled successfully` + route `/` listée comme statique. Vérifier que la taille du First Load JS pour `/` est `< 150kb` (objectif performance CLAUDE.md section 6).

```powershell
npm run test:e2e
```
Expected : 2 passed.

Si tous OK → invoquer `verification-before-completion` (cf. instructions utilisateur).

- [ ] **Step 11.4** : Commit final

```powershell
git add README.md .env.local.example
git commit -m "docs: add README and env example"
```

- [ ] **Step 11.5** : Tag visuel (optionnel)

```powershell
git tag -a scaffold-v0 -m "Scaffold initial — hero validable"
```

---

## Hors-scope (jalons suivants — NE PAS implémenter dans ce plan)

- Connexion Vercel + déploiement preview (séparé après validation visuelle du hero par Maxime)
- Scrape catalogue scrap-up.com → `lib/products.ts`
- Pages boutique, fiche produit, panier, checkout
- Intégration Stripe + Resend
- Magic UI / React Bits / Lottie / GSAP
- Pages légales + cookies banner

Chacun fera l'objet d'un nouveau brainstorm + plan dédié.

---

## Self-Review

**Spec coverage vs. instructions utilisateur (CLAUDE.md sections 1–13) :**

| Exigence | Couvert par |
|---|---|
| Next.js 15 App Router TypeScript | Tasks 1–2 |
| Tailwind v4 + tokens design | Task 3 |
| Magic UI + React Bits | Différé (justifié hors-scaffold) |
| Motion v12 | Task 2 (install) + Task 8 (usage) |
| Lottie | Différé (décision brainstorm 4B) |
| GSAP | Différé (pas requis pour le hero) |
| Zustand panier | Hors-scope (pas de panier au scaffold) |
| Stripe / Resend | Hors-scope (stub plus tard) |
| Polices Fraunces / Manrope / Homemade Apple | Task 4 |
| `next/image` partout | Task 8 (hero), `next.config.ts` configuré |
| Server Components par défaut | Hero.tsx (Server), HeroBackground.tsx (Server), HeroReveal.tsx (seul Client) |
| Animation transform/opacity uniquement | Hero CTA hover (`hover:scale-[1.03]`), motion variants (y, opacity) |
| `prefers-reduced-motion` | `globals.css` + `useReducedMotion` dans HeroReveal + test Playwright |
| Couleurs via tokens, pas hardcodées | `@theme` + classes Tailwind générées |
| Métadonnées + lang fr | Task 6 |
| Tests Playwright | Task 10 |

**Placeholder scan :** OK — pas de TBD, tous les blocs de code complets, toutes les commandes exécutables.

**Type consistency :** `cn`, `fontVariables`, `Hero`, `HeroBackground`, `HeroReveal` cohérents entre déclarations et usages.

**Ambiguity :** Photo Unsplash a un fallback documenté. Versions deps épinglées, pas de "latest".

---

*Plan rédigé : 2026-05-05 — Baptiste / Agentora — Workflow Superpowers*
