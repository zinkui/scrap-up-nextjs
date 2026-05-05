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
