# Scrap-up — Refonte Next.js

> Projet : reconstruction complète en Next.js 15 du site e-commerce **scrap-up.com** (actuellement WooCommerce). Livraison clé en main, le client basculera son nom de domaine sur ce site une fois validé.

---

## 1. Contexte business

- **Brand** : Scrap-up
- **Produit** : boîtes anniversaires à thème pour enfants (Mickey, Licorne, Ariel, Minnie, Princesse, Centre de table, etc.)
- **Tagline** : *"Une boîte, une fête, des étoiles plein la tête"*
- **Cible** : parents (principalement mères) organisant des anniversaires enfants
- **Prix moyen** : 24,95 € – 26,95 € (pack de 8 unités) / 9,50 € (centres de table)
- **USPs** :
  - Livraison gratuite dès 50 €
  - Commande avant 12h00 → expédition le jour-même
  - Pack de 8 (parfait pour toute la classe)
  - Option remplie/vide (bonbons fournis par Val Gourmand)
  - Thèmes sur mesure (info@scrap-up.fr)
- **Roadmap produit** : nouvelles collections "boîtes baptêmes" et "boîte Merci maîtresse"
- **Contact** : info@scrap-up.fr

## 2. Stack technique (FIGÉE)

| Couche | Choix | Skill associé |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | `vercel-react-best-practices` |
| Langage | **TypeScript strict** | — |
| Style | **Tailwind CSS v4** | — |
| Composants visuels | **Magic UI + React Bits** | `animated-component-libraries` |
| Animations React | **Motion (Framer Motion v12+)** | `motion-framer` |
| Animations vectorielles | **lottie-react** | `lottie-animations` |
| Animations scroll | **GSAP + ScrollTrigger** | `gsap-scrolltrigger` |
| State (panier) | **Zustand + persist** | — |
| Paiements | **Stripe Checkout** | — |
| Email | **Resend** | — |
| Images | **next/image** | — |
| Polices | **next/font** | — |
| Tests E2E | **Playwright** | `webapp-testing` |
| Hosting | **Vercel** | — |

## 3. Skills disponibles (16 installés)

### Direction créative & design
- `frontend-design` → choisir une direction esthétique AVANT de coder (anti-AI-slop)
- `modern-web-design` → trends 2024-2025, micro-interactions, scrollytelling
- `web-design-guidelines` → audit a11y/perf/UX en continu (Vercel)

### Code quality
- `vercel-react-best-practices` → 57 règles de perf React/Next.js
- `vercel-composition-patterns` → patterns React 19+ pour composants scalables

### Animations
- `motion-framer` → animations React (gestures, layout, AnimatePresence, spring)
- `lottie-animations` → JSON vector animations (sparkles, confettis, étoiles)
- `gsap-scrolltrigger` → scroll storytelling, pinning, scrubbing, parallax
- `animated-component-libraries` → Magic UI + React Bits

### Workflow (Obra Superpowers)
- `brainstorming` → AVANT toute feature : explorer intent + requirements
- `writing-plans` → décomposer un spec en plan d'exécution multi-étapes
- `subagent-driven-development` → exécuter le plan avec subagents indépendants
- `systematic-debugging` → méthode rigoureuse pour bug/test failure
- `verification-before-completion` → AVANT de dire "c'est fini" (preuves avant assertions)

### Tests
- `webapp-testing` → Playwright pour add-to-cart, checkout, contact

### Méta
- `skill-creator` → pour créer des skills custom plus tard

## 4. Direction esthétique : "Editorial Whimsical"

> Magazine premium pour enfants × féerie discrète. PAS de "cute kawaii" générique, PAS de gradient violet AI-slop.

### Typographie
- **Display** : `Fraunces` ou `Playfair Display` — serif éditorial
- **Body** : `Manrope` ou `Geist Sans` — moderne, lisible
- **Accents** : `Caveat` ou `Reenie Beanie` — handwritten, parcimonieux
- **BANNIR** : Inter, Roboto, Arial, Space Grotesk

### Palette
```css
--bg-base: #FDF9F3;        /* crème poudré */
--ink: #1A1A2E;            /* noir profond bleuté */
--rose-poudre: #F4C2C2;
--lavande: #D4C5E2;
--champagne: #E8D5A8;
--mint-fee: #B8E0D2;
--accent-magique: #6B4FBB; /* violet profond pour CTA */
--shadow-magic: rgba(107, 79, 187, 0.15);
```
> Pastels saturés, jamais délavés. Noir profond pour le texte.

### Layout
- Asymétrie volontaire, breaks de grille
- Photos produits qui débordent légèrement
- Mise en page éditoriale (cf. magazines Milk, Mon Petit Renne)
- Espace négatif généreux

### Backgrounds & profondeur
- Gradient mesh qui respire (animation 20s+ ease-in-out)
- Grain noise en overlay (texture papier)
- Sparkles Lottie en arrière-plan du hero

## 5. Règles d'animation

### Performance
- **GPU-accelerated only** : `transform` et `opacity` exclusivement
- **60fps minimum** sinon simplifier
- **Lazy load Lottie** : composants dynamiques

### Timing & easing
- **Entrées** : ease-out (200–400ms)
- **Sorties** : ease-in (150–250ms)
- **Hover** : 150–200ms
- **Page transitions** : 300–500ms
- **Spring physics** pour add-to-cart et badge panier

### Accessibilité
- TOUJOURS respecter `prefers-reduced-motion`
- Fallback statique pour Lottie en reduced-motion

### Animations clés du projet
| Élément | Animation | Skill |
|---|---|---|
| Hero | Sparkles Lottie + reveal stagger | `lottie-animations` + `motion-framer` |
| Cartes produits | Hover scale 1.03 + glow | `motion-framer` |
| Add-to-cart | Burst confettis + bump panier | `lottie-animations` + `motion-framer` |
| Section "Nos boîtes" | Stagger + parallax au scroll | `gsap-scrolltrigger` |
| Page transitions | Fade + étoiles | `motion-framer` (AnimatePresence) |
| CTA "Thème sur mesure" | Magnétique au curseur | `animated-component-libraries` |

## 6. Performance budget

- **LCP** < 2.0s
- **CLS** = 0
- **INP** < 200ms
- **Bundle JS initial** < 150kb gzip
- **Lighthouse Performance** ≥ 95
- **Lighthouse Accessibility** = 100

## 7. Structure de dossiers

```
app/
├── (shop)/
│   ├── page.tsx                    # Landing
│   ├── boutique/
│   │   ├── page.tsx                # Grille filtrable
│   │   └── [slug]/page.tsx         # Détail produit
│   ├── panier/page.tsx
│   └── checkout/
│       ├── page.tsx
│       └── success/page.tsx
├── (legal)/
│   ├── mentions-legales/page.tsx
│   ├── cgv/page.tsx
│   └── politique-confidentialite/page.tsx
├── api/
│   ├── checkout/route.ts
│   ├── webhook/stripe/route.ts
│   └── contact/route.ts
├── layout.tsx
└── globals.css

components/
├── ui/                             # Magic UI, React Bits
├── sections/                       # Hero, ProductGrid...
├── product/                        # Card, Gallery, OptionsPicker
├── cart/                           # Drawer, Badge, Item
└── animations/                     # SparkleField, ConfettiBurst...

lib/
├── products.ts                     # Catalogue statique MVP
├── stripe.ts
├── cart-store.ts                   # Zustand
└── utils.ts

content/
└── lottie/                         # JSON Lottie

tests/
└── e2e/                            # Playwright
```

## 8. Catalogue produits (MVP)

Stockage : **fichier statique `lib/products.ts`** (TypeScript). Migration possible vers CMS plus tard.

```typescript
type Product = {
  slug: string;
  name: string;
  theme: 'mickey' | 'licorne' | 'ariel' | 'minnie' | 'princesse' | 'centre-table';
  category: 'boite' | 'sac' | 'deco';
  description: string;
  story: string;
  images: { src: string; alt: string }[];
  variants: {
    name: string;
    priceCents: number;
    stripeId: string;
  }[];
  packSize: number;
  inStock: boolean;
};
```

## 9. SEO

- **Mots-clés cibles** : "boîte anniversaire enfant", "sac anniversaire personnalisé", "déco anniversaire thème [X]"
- **Schema.org** : `Product`, `Offer`, `Organization`, `BreadcrumbList`
- **Metadata** : unique par page, OpenGraph + Twitter cards
- **Sitemap dynamique** : `app/sitemap.ts`
- **Robots** : `app/robots.ts`

## 10. Voice & tone (FR)

- **Tutoiement** dans marketing, **vouvoiement** dans légal et checkout
- Chaleureux, féerique sans niaiserie, professionnel sans froideur
- Émojis avec parcimonie (✨ 🎂 💫 🎁 🎀 acceptés)
- Pas de "magique" toutes les 3 lignes, pas de "wow"

✅ *"Pensées pour transformer chaque anniversaire en un moment magique."*
❌ *"Wow ! Découvrez nos super produits incroyables !"*

## 11. Toujours / Jamais

### TOUJOURS
- ✅ Invoquer `brainstorming` avant toute nouvelle feature
- ✅ Invoquer `frontend-design` avant de coder une UI nouvelle
- ✅ Auditer avec `web-design-guidelines` + `vercel-react-best-practices` avant commit
- ✅ Invoquer `verification-before-completion` AVANT de dire "c'est fini"
- ✅ Server Components par défaut, `"use client"` seulement si nécessaire
- ✅ `next/image` pour TOUTE image (jamais `<img>`)
- ✅ `next/font` pour TOUTES les polices
- ✅ Respecter `prefers-reduced-motion` sur chaque anim
- ✅ Tests Playwright (`webapp-testing`) avant de marquer une tâche done
- ✅ Pour les bugs : `systematic-debugging` AVANT de proposer un fix
- ✅ Commits conventionnels (`feat:`, `fix:`, `chore:`, `style:`)

### JAMAIS
- ❌ De `<img>` non-optimisé
- ❌ De police Google via `<link>` dans `<head>`
- ❌ D'animation sur `width`, `height`, `top`, `left`
- ❌ De Three.js / R3F / Babylon (overkill e-commerce)
- ❌ De `useEffect` pour fetch côté serveur (utiliser RSC)
- ❌ De `style={{}}` inline (sauf dynamique justifié)
- ❌ De localStorage côté serveur
- ❌ De couleur hardcodée hors design tokens
- ❌ De claim "fait" sans `verification-before-completion`

## 12. Workflow de développement (Superpowers)

Pour chaque feature significative :

1. **Brainstorm** → skill `brainstorming`
2. **Plan** → skill `writing-plans`
3. **Build** → skill `subagent-driven-development`
4. **Audit visuel** → `frontend-design` + `web-design-guidelines`
5. **Audit code** → `vercel-react-best-practices` + `vercel-composition-patterns`
6. **Test** → `webapp-testing` (Playwright)
7. **Debug si bug** → `systematic-debugging`
8. **Vérif finale** → `verification-before-completion`
9. **Deploy** → Vercel preview → review → promote

## 13. Variables d'environnement

```env
# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://scrap-up.com
NEXT_PUBLIC_BUSINESS_EMAIL=info@scrap-up.fr
```

## 14. Notes / À clarifier avec Maxime

- [ ] Photos produits HD originales (300x300 actuelles = trop petit)
- [ ] Hébergement final (Vercel ? quel compte ?)
- [ ] Compte Stripe : Maxime/sa mère, pas Agentora
- [ ] Mentions légales / CGV / Cookies à fournir
- [ ] Validation copy par la cliente avant prod
- [ ] Bascule DNS + redirections 301 depuis l'ancien WooCommerce
- [ ] Question IP Disney : non-prioritaire (à revoir plus tard)

---

*Dernière mise à jour : 5 mai 2026 — Baptiste / Agentora*
*16 skills installés et référencés dans ce document*
