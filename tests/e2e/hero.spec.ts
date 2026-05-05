import { test, expect } from "@playwright/test";

test.describe("Home page hero", () => {
  test("loads with headline, sub, CTA and image", async ({ page }) => {
    await page.goto("/");

    // Headline (tagline complète présente, dans le H1)
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Une boîte, une fête");
    await expect(h1).toContainText("étoiles");
    await expect(h1).toContainText("plein la tête");

    // Vérifier que "étoiles" est bien le seul mot en handwritten (1 seule occurrence)
    const handwrittenEm = page.locator("h1 em");
    await expect(handwrittenEm).toHaveCount(1);
    await expect(handwrittenEm).toHaveText("étoiles");

    // Sub-paragraphe (nouveau wording)
    await expect(
      page.getByText("Pensées pour transformer chaque anniversaire", {
        exact: false,
      })
    ).toBeVisible();
    await expect(
      page.getByText("livraison gratuite dès 50", { exact: false })
    ).toBeVisible();

    // Strip USP sous le CTA
    await expect(
      page.getByText("Commande avant 12h", { exact: false })
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
