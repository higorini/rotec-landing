import { expect, test, type Page } from "@playwright/test";

const TOTAL = 18;

function carousel(page: Page) {
  return page.getByRole("region", { name: "Fotos dos equipamentos" });
}

function counter(page: Page) {
  return page.locator("#equipamento").getByText(new RegExp(`^\\d+ / ${TOTAL}$`)).last();
}

async function openGallery(page: Page) {
  await page.goto("/");
  await carousel(page).scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
}

test.describe("equipment carousel", () => {
  for (const [width, expected] of [
    [390, 1],
    [800, 2],
    [1100, 3],
    [1440, 4],
  ] as const) {
    test(`shows ${expected} photo(s) at ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop", "viewport set per test");
      await page.setViewportSize({ width, height: 900 });
      await openGallery(page);

      const visible = await carousel(page).evaluate((region) => {
        const box = region.getBoundingClientRect();
        return Array.from(region.querySelectorAll('[aria-roledescription="slide"] button')).filter((photo) => {
          const rect = photo.getBoundingClientRect();
          return rect.left >= box.left - 1 && rect.right <= box.right + 1;
        }).length;
      });

      expect(visible).toBe(expected);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    });
  }

  test("moves one photo with the arrows and loops around", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: "Pausar apresentação" }).click();

    await page.getByRole("button", { name: "Próxima foto" }).click();
    await expect(counter(page)).toHaveText(`2 / ${TOTAL}`);

    await page.getByRole("button", { name: "Foto anterior" }).click();
    await page.getByRole("button", { name: "Foto anterior" }).click();
    await expect(counter(page)).toHaveText(`${TOTAL} / ${TOTAL}`);
  });

  test("follows a drag", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: "Pausar apresentação" }).click();
    const box = (await carousel(page).boundingBox())!;

    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 12 });
    await page.mouse.up();

    await expect(counter(page)).not.toHaveText(`1 / ${TOTAL}`);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("uses the arrow keys only while focused", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "keyboard");
    await openGallery(page);
    await page.getByRole("button", { name: "Pausar apresentação" }).click();

    await page.locator("body").press("ArrowRight");
    await expect(counter(page)).toHaveText(`1 / ${TOTAL}`);

    await carousel(page).focus();
    await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText(`2 / ${TOTAL}`);
  });

  test("opens the tapped photo in the lightbox", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: "Pausar apresentação" }).click();
    await page.getByRole("button", { name: "Próxima foto" }).click();
    await expect(counter(page)).toHaveText(`2 / ${TOTAL}`);

    await page.getByRole("button", { name: /^Ampliar imagem/ }).nth(1).click();

    const dialog = page.getByRole("dialog", { name: "Foto ampliada" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(`2 / ${TOTAL}`)).toBeVisible();
  });
});

test.describe("slideshow", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "timing tests run once");
  });

  test("advances by itself", async ({ page }) => {
    await openGallery(page);

    await expect(counter(page)).toHaveText(`2 / ${TOTAL}`, { timeout: 7000 });
  });

  test("stops with the pause button", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: "Pausar apresentação" }).click();
    const before = await counter(page).textContent();
    await page.mouse.move(0, 0);

    await page.waitForTimeout(5500);
    await expect(counter(page)).toHaveText(before!);
  });

  test("stays paused after hovering when paused by the visitor", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: "Pausar apresentação" }).click();
    const before = await counter(page).textContent();

    await carousel(page).hover();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(5500);

    await expect(counter(page)).toHaveText(before!);
  });

  test("pauses while hovered", async ({ page }) => {
    await openGallery(page);
    await carousel(page).hover();
    const before = await counter(page).textContent();

    await page.waitForTimeout(5500);
    await expect(counter(page)).toHaveText(before!);
  });

  test("does not move with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openGallery(page);

    await expect(page.getByRole("button", { name: /apresentação/ })).toHaveCount(0);
    await page.waitForTimeout(5500);
    await expect(counter(page)).toHaveText(`1 / ${TOTAL}`);
  });
});

test.describe("lightbox", () => {
  test("jumps to a photo from the thumbnails and closes with Escape", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: "Pausar apresentação" }).click();
    await page.getByRole("button", { name: /^Ampliar imagem/ }).first().click();
    const dialog = page.getByRole("dialog", { name: "Foto ampliada" });

    await dialog.getByRole("button", { name: "Ver foto 5" }).click();
    await expect(dialog.getByText(`5 / ${TOTAL}`)).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Ver foto 5" })).toHaveAttribute("aria-current", "true");

    await page.keyboard.press("ArrowLeft");
    await expect(dialog.getByText(`4 / ${TOTAL}`)).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(counter(page)).toHaveText(`1 / ${TOTAL}`);
  });

  test("loops from the last photo to the first", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: "Pausar apresentação" }).click();
    await page.getByRole("button", { name: /^Ampliar imagem/ }).first().click();
    const dialog = page.getByRole("dialog", { name: "Foto ampliada" });

    await page.keyboard.press("ArrowLeft");
    await expect(dialog.getByText(`${TOTAL} / ${TOTAL}`)).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText(`1 / ${TOTAL}`)).toBeVisible();
  });

  test("swipes between photos", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: "Pausar apresentação" }).click();
    await page.getByRole("button", { name: /^Ampliar imagem/ }).first().click();
    const dialog = page.getByRole("dialog", { name: "Foto ampliada" });
    const box = (await dialog.getByRole("img", { name: /./ }).first().boundingBox())!;
    const y = box.y + box.height / 2;
    const viewport = page.viewportSize()!;

    await page.mouse.move(viewport.width * 0.8, y);
    await page.mouse.down();
    await page.mouse.move(viewport.width * 0.2, y, { steps: 12 });
    await page.mouse.up();

    await expect(dialog.getByText(`2 / ${TOTAL}`)).toBeVisible();
    await expect(dialog).toBeVisible();
  });
});
