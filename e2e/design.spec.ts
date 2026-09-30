import { expect, test, type Page } from "@playwright/test";

function luminance(rgb: number[]) {
  const [r, g, b] = rgb.map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: number[], background: number[]) {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

async function colors(page: Page, selector: string) {
  return page.locator(selector).first().evaluate((element) => {
    const canvas = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
    const parse = (color: string) => {
      canvas.clearRect(0, 0, 1, 1);
      canvas.fillStyle = color;
      canvas.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = canvas.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    };
    const blend = (top: number[], bottom: number[]) => {
      const alpha = top[3] ?? 1;
      return [0, 1, 2].map((i) => top[i] * alpha + bottom[i] * (1 - alpha));
    };
    let background = [255, 255, 255];
    const layers: number[][] = [];
    for (let node: Element | null = element; node; node = node.parentElement) {
      const color = parse(getComputedStyle(node).backgroundColor);
      if ((color[3] ?? 1) > 0) layers.unshift(color);
    }
    for (const layer of layers) background = blend(layer, background);
    const foreground = blend(parse(getComputedStyle(element).color), background);
    return { foreground, background };
  });
}

test.describe("design", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  for (const section of ["servicos", "equipamento"]) {
    test(`has readable subtitles on the dark ${section} section`, async ({ page }) => {
      const { foreground, background } = await colors(page, `#${section} header p`);

      expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
    });
  }

  test("uses the body typeface in the contact title", async ({ page }) => {
    const fontFamily = await page.locator("#contato h2").evaluate((heading) => getComputedStyle(heading).fontFamily);

    expect(fontFamily).toMatch(/alexandria/i);
  });

  test("aligns licenses and contact with the rest of the page", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop only");
    const reference = await page.locator("#faq h2").first().evaluate((heading) => {
      const container = heading.closest(".container")!;
      return container.getBoundingClientRect().left + parseFloat(getComputedStyle(container).paddingLeft);
    });

    for (const id of ["licencas", "contato"]) {
      const left = await page.locator(`#${id} h2`).first().evaluate((heading) => heading.getBoundingClientRect().left);
      expect(Math.round(left), id).toBe(Math.round(reference));
    }
  });

  test("shows a single indicator on each FAQ question", async ({ page }) => {
    const title = page.getByRole("button", { name: /Desentupimento — Como funciona/ });

    await expect(title).not.toContainText("▸");
    await expect(title).not.toContainText("▾");
  });
});

test.describe("design on mobile", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await page.goto("/");
  });

  test("stacks services in a single column", async ({ page }) => {
    const lefts = await page
      .getByRole("button", { name: /Abrir informações de/ })
      .evaluateAll((cards) => cards.map((card) => Math.round(card.getBoundingClientRect().left)));

    expect(new Set(lefts).size).toBe(1);
  });

  test("shows a page counter instead of dots in the carousel", async ({ page }) => {
    await expect(page.locator("#equipamento").getByText("1 / 18")).toBeVisible();
    await expect(page.getByRole("button", { name: /Ir para página/ })).toHaveCount(0);
  });

  test("keeps the carousel arrows round", async ({ page }) => {
    const box = await page.getByRole("button", { name: "Próxima foto" }).boundingBox();

    expect(Math.round(box!.width)).toBe(Math.round(box!.height));
  });
});

test.describe("hero typography", () => {
  test("grows the hero text from mobile to desktop", async ({ page }) => {
    test.setTimeout(90_000);
    const sizes: number[][] = [];
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      sizes.push(
        await page.evaluate(() =>
          ["section p", "section h1 ~ p", "section a"].map((selector) =>
            parseFloat(getComputedStyle(document.querySelector(selector)!).fontSize)
          )
        )
      );
    }

    for (let i = 0; i < 3; i++) {
      expect(sizes[0][i]).toBeLessThanOrEqual(sizes[1][i]);
      expect(sizes[1][i]).toBeLessThanOrEqual(sizes[2][i]);
    }
  });
});
