const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("la página cumple la auditoría WCAG AA automatizada", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("el formulario valida campos y anuncia el error del checkbox", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await expect(page.locator("#nombre-error")).toHaveText("Escribe tu nombre completo (mínimo 3 letras).");
  await expect(page.locator("#terminos-error")).toHaveText("Debes aceptar los términos y condiciones.");
  await expect(page.locator("#terminos")).toHaveAttribute("aria-invalid", "true");

  await page.getByLabel("Nombre completo").fill("Iker Guanín");
  await page.getByLabel("Correo electrónico").fill("iker@example.com");
  await page.getByLabel("Teléfono").fill("0999999999");
  await page.getByLabel("Contraseña").fill("contraseña-segura");
  await page.getByLabel("Acepto los términos y condiciones").check();
  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await expect(page.locator("#mensajeExito")).toHaveText("¡Cuenta creada correctamente!");
});

test.describe("adaptabilidad", () => {
  for (const viewport of [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1280, height: 800 }
  ]) {
    test(`no genera scroll horizontal en ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
    });
  }
});