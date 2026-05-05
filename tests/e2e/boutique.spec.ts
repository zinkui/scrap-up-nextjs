import { test, expect } from "@playwright/test";

test.describe("Boutique placeholder page", () => {
  test("loads with coming-soon copy and contact mailto", async ({ page }) => {
    const response = await page.goto("/boutique");
    expect(response?.status()).toBe(200);

    // Headline visible et byte-exact
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText("Bientôt disponible.");

    // Sub-paragraphe : la copy d'attente est présente
    await expect(
      page.getByText("Notre boutique en ligne arrive très bientôt", {
        exact: false,
      })
    ).toBeVisible();

    // Mailto contact
    const mailto = page.getByRole("link", { name: /info@scrap-up\.fr/i });
    await expect(mailto).toBeVisible();
    await expect(mailto).toHaveAttribute("href", "mailto:info@scrap-up.fr");

    // CTA retour à l'accueil pointe bien vers /
    const backCta = page.getByRole("link", { name: /Retour à l'accueil/i });
    await expect(backCta).toBeVisible();
    await expect(backCta).toHaveAttribute("href", "/");

    // Aucune erreur console
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});
