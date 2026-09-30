import { expect, test, type Locator, type Page } from "@playwright/test";

const SLOW = ":root { --motion-enter: 800ms; --motion-exit: 800ms; }";

async function opacity(locator: Locator) {
  return locator.evaluate((element) => Number(getComputedStyle(element).opacity));
}

async function expectAnimatedOpenClose(page: Page, open: () => Promise<void>, close: () => Promise<void>) {
  await page.addStyleTag({ content: SLOW });
  const dialog = page.locator('[role="dialog"]');

  await open();
  await expect(dialog).toHaveCount(1);
  expect(await opacity(dialog)).toBeLessThan(0.95);
  await expect.poll(() => opacity(dialog)).toBe(1);

  await close();
  await expect(dialog).toHaveCount(1);
  await expect.poll(() => opacity(dialog)).toBeLessThan(0.95);
  await expect(dialog).toHaveCount(0, { timeout: 3000 });
}

test.describe("how it works", () => {
  test("starts with the first answer open and always keeps one open", async ({ page }) => {
    await page.goto("/");
    const first = page.getByRole("button", { name: /Desentupimento — Como funciona/ });
    const second = page.getByRole("button", { name: /Hidrojateamento — Como funciona/ });

    await expect(first).toHaveAttribute("aria-expanded", "true");
    await first.click({ force: true });
    await expect(first).toHaveAttribute("aria-expanded", "true");

    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("clickable cards", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows services as clickable", async ({ page }) => {
    const card = page.getByRole("button", { name: "Abrir informações de Desentupimento" });

    await expect(card).toContainText("Ver detalhes");
    expect(await card.locator(".animate-float").evaluate((icon) => getComputedStyle(icon).animationName)).toBe("float");
  });

  test("shows licenses as clickable", async ({ page }) => {
    const card = page.getByRole("button", { name: /IBAMA/ });

    await expect(card).toContainText("Saiba mais →");
    expect(await card.locator(".animate-float").evaluate((logo) => getComputedStyle(logo).animationName)).toBe("float");
  });

  test("lifts cards on hover", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "hover");
    for (const card of [
      page.getByRole("button", { name: "Abrir informações de Auto Vácuo" }),
      page.getByRole("button", { name: /CETESB/ }),
    ]) {
      await card.scrollIntoViewIfNeeded();
      const before = (await card.boundingBox())!.y;
      await card.hover();
      await expect.poll(async () => (await card.boundingBox())!.y).toBeLessThan(before);
    }
  });

  test("keeps cards still with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });

    const names = await page
      .locator(".animate-float")
      .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName));

    expect(names.length).toBeGreaterThanOrEqual(6);
    expect(new Set(names)).toEqual(new Set(["none"]));
  });
});

test.describe("dialog motion", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "timing tests run once");
  });

  test("animates the service details", async ({ page }) => {
    await page.goto("/");
    await expectAnimatedOpenClose(
      page,
      () => page.getByRole("button", { name: "Abrir informações de Desentupimento" }).click(),
      () => page.keyboard.press("Escape")
    );
  });

  test("animates the license details", async ({ page }) => {
    await page.goto("/");
    await expectAnimatedOpenClose(
      page,
      () => page.getByRole("button", { name: /SABESP/ }).click(),
      () => page.getByRole("button", { name: "Fechar" }).click()
    );
  });

  test("animates the photo viewer", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Pausar apresentação" }).click();
    await expectAnimatedOpenClose(
      page,
      () => page.getByRole("button", { name: /^Ampliar imagem/ }).first().click(),
      () => page.keyboard.press("Escape")
    );
  });

  test("uses only a short fade with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.getByRole("button", { name: "Abrir informações de Desentupimento" }).click();
    const panel = page.locator(".motion-pop");

    expect(await panel.evaluate((element) => getComputedStyle(element).transitionProperty)).toBe("opacity");
  });
});

test.describe("mobile menu motion", () => {
  test("slides the menu in and out", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await page.goto("/");
    await page.addStyleTag({ content: SLOW });
    const panel = page.locator(".motion-drawer");
    const right = () => panel.evaluate((element) => Math.round(element.getBoundingClientRect().left));

    await page.getByRole("button", { name: "Abrir menu" }).click();
    const viewport = page.viewportSize()!.width;
    expect(await right()).toBeGreaterThan(viewport * 0.2);
    await expect.poll(right).toBeLessThan(viewport * 0.2);

    await page.getByRole("button", { name: "Fechar menu" }).click();
    await expect(panel).toHaveCount(1);
    await expect(panel).toHaveCount(0, { timeout: 3000 });
  });
});

test.describe("about tabs", () => {
  const SLOW_TABS = "[data-tab-panel] { transition-duration: 1200ms !important; }";

  async function translateX(page: Page, id: string) {
    return page.locator(`[data-tab-panel="${id}"]`).evaluate((panel) => {
      const matrix = new DOMMatrix(getComputedStyle(panel).transform);
      const translate = getComputedStyle(panel).translate;
      return translate && translate !== "none" ? parseFloat(translate) : matrix.m41;
    });
  }

  test("slides the pill under the selected tab", async ({ page }) => {
    await page.goto("/");
    const tab = page.getByRole("button", { name: "Nossos Valores" });

    await tab.click();

    await expect
      .poll(async () => {
        const pill = await page.locator("#sobre span.bg-primary").boundingBox();
        const button = await tab.boundingBox();
        return Math.abs(pill!.x - button!.x) + Math.abs(pill!.width - button!.width);
      })
      .toBeLessThan(2);
    await expect(tab).toHaveAttribute("aria-pressed", "true");
  });

  test("brings the next tab in from the side it was clicked", async ({ page }) => {
    await page.goto("/");
    await page.addStyleTag({ content: SLOW_TABS });

    await page.getByRole("button", { name: "Nossa Visão" }).click();
    expect(await translateX(page, "visao")).toBeGreaterThan(0);
    await expect.poll(() => translateX(page, "visao")).toBe(0);

    await page.getByRole("button", { name: "Sobre a Empresa" }).click();
    expect(await translateX(page, "empresa")).toBeLessThan(0);
    await expect.poll(() => translateX(page, "empresa")).toBe(0);
  });

  test("keeps the same height on every tab", async ({ page }) => {
    await page.goto("/");
    const box = page.locator("#sobre .grid").first();
    const heights = new Set<number>();

    for (const name of ["Sobre a Empresa", "Nossa Missão", "Nossa Visão", "Nossos Valores"]) {
      await page.getByRole("button", { name }).click();
      heights.add(Math.round((await box.boundingBox())!.height));
    }

    expect(heights.size).toBe(1);
  });

  test("only fades with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    for (const id of ["missao", "visao", "valores"]) {
      expect(await translateX(page, id)).toBe(0);
    }
  });
});
