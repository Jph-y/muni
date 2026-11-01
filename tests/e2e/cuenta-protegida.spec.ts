import { expect, test } from "@playwright/test";

test.describe("Control de acceso al área privada", () => {
  test("CP-06: redirige a /login cuando no hay sesión", async ({ page }) => {
    await page.goto("/mi-cuenta");

    await expect(page).toHaveURL(
      /\/login\?redirect=%2Fmi-cuenta|\/login\?redirect=\/mi-cuenta/,
    );
  });

  test("CP-06b: protege subrutas de mi cuenta", async ({ page }) => {
    await page.goto("/mi-cuenta/tributos");

    await expect(page).toHaveURL(/\/login/);
  });
});
