# Notes — Photos produits importées du WordPress legacy

**Date import :** 2026-05-05
**Source :** `https://scrap-up.com/wp-content/uploads/2026/04/`

## Inventaire

| Slug | Fichier source WordPress | Dimensions | Poids | Aspect | Qualité |
|---|---|---|---|---|---|
| mickey | `IMG_20260304_143524_resized_20260403_114216376.jpg` | 1555×1555 | 489 kB | 1:1 | ✅ HD suffisante |
| licorne | `IMG_20260304_120015.jpg` | 1512×1512 | 333 kB | 1:1 | ✅ HD suffisante |
| ariel | `IMG_20260304_120045.jpg` | 1512×1512 | 441 kB | 1:1 | ✅ HD suffisante |
| minnie | `IMG_20260305_101717.jpg` | 1959×1959 | 526 kB | 1:1 | ✅ HD suffisante |
| princesse | `IMG_20260305_101811.jpg` | 1786×1786 | 588 kB | 1:1 | ✅ HD suffisante |
| centre-table | `IMG_20260319_132840.jpg-1_resized_20260403_114216165.jpg` | 1640×1639 | 349 kB | 1:1 | ✅ HD suffisante |

## Résumé

- **Toutes au format full-size WordPress** (URL sans suffixe `-300x300`)
- **Toutes en HD** (≥ 1500 px de côté) — adaptées aux cartes produit + zoom détail
- **Toutes carrées** — cohérent pour grille e-commerce
- **Total disque :** ~2.7 MB (sera optimisé par `next/image` à la livraison)

## Recommandation pour Maxime

**Pas besoin de fournir d'originales** : les versions full-size du WordPress sont déjà en résolution mobile native (photos smartphone, ratio 1:1, ~1500-2000 px). Suffisantes pour MVP et pour zoom modéré.

**Améliorations futures éventuelles** (non bloquant) :
- Shooting professionnel avec lumière contrôlée et fond neutre cohérent (certaines photos ont un fond cuisine, d'autres un fond table — manque d'unité visuelle)
- Compléter avec photos de mise en situation (boîte ouverte, contenu déballé, table dressée)
- Ajouter 1-2 angles secondaires par produit pour la galerie produit

Ces améliorations interviendront en jalon "shooting produits" séparé, pas dans le scope du scaffold actuel.

## Note technique

Ces photos seront servies via `next/image` qui les recompresse automatiquement en WebP/AVIF responsive. Aucune action manuelle d'optimisation requise.
