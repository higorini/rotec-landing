import { expect, test } from "@playwright/test";

const FLOAT = "Fale conosco pelo WhatsApp";

test.describe("whatsapp button", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("is visible while browsing and hides on the contact section", async ({ page }) => {
    await expect(page.getByRole("link", { name: FLOAT })).toBeVisible();

    await page.locator("#contato").scrollIntoViewIfNeeded();
    await expect(page.getByRole("link", { name: FLOAT })).toHaveCount(0);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.getByRole("link", { name: FLOAT })).toBeVisible();
  });

  test("stays below open dialogs", async ({ page }) => {
    await page.getByRole("button", { name: "Abrir informações de Desentupimento" }).click();
    const dialog = page.getByRole("dialog", { name: "Desentupimento" });
    await expect(dialog).toBeVisible();

    const covered = await page.getByRole("link", { name: FLOAT }).evaluate((link) => {
      const box = link.getBoundingClientRect();
      const top = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
      return !link.contains(top);
    });

    expect(covered).toBe(true);
  });
});

test.describe("whatsapp button on mobile", () => {
  test("stays below the open menu", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    const covered = await page.getByRole("link", { name: FLOAT }).evaluate((link) => {
      const box = link.getBoundingClientRect();
      const top = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
      return !link.contains(top);
    });

    expect(covered).toBe(true);
  });
});

test.describe("desktop navigation", () => {
  for (const width of [1024, 1280, 1440]) {
    test(`fits in one line at ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop", "desktop only");
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");

      const nav = page.getByRole("navigation").first();
      await expect(nav).toBeVisible();
      const tops = await nav.locator("a").evaluateAll((links) =>
        links.map((link) => Math.round(link.getBoundingClientRect().top))
      );

      expect(new Set(tops).size).toBe(1);
      expect(await nav.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    });
  }

  test("uses the menu button on tablets", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop only");
    await page.setViewportSize({ width: 800, height: 900 });
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeVisible();
  });
});
