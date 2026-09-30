import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders every section", async ({ page }) => {
    await expect(page).toHaveTitle(/ROTEC Service/);
    await expect(page.getByRole("heading", { name: "ROTEC SERVICE" })).toBeVisible();

    for (const name of ["NOSSOS SERVIÇOS", "COMO FUNCIONA", "NOSSO EQUIPAMENTO", "Selo de Qualidade ROTEC"]) {
      await expect(page.getByRole("heading", { name })).toBeVisible();
    }
    await expect(page.getByRole("heading", { name: /CLIENTES QUE ACREDITAM/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Ficou com alguma dúvida/ })).toBeVisible();
    await expect(page.locator("footer")).toContainText("rotec@rotecservice.com.br");
  });

  test("has a reachable open graph image", async ({ page, request }) => {
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toMatch(/\/images\/og\.jpg$/);

    const response = await request.get(new URL(ogImage!).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/jpeg");
  });

  test("points every navigation anchor to an existing section", async ({ page }) => {
    const anchors = await page.locator('header a[href^="#"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("href"))
    );

    for (const anchor of new Set(anchors)) {
      await expect(page.locator(anchor!).first()).toBeAttached();
    }
  });

  test("has unique element ids", async ({ page }) => {
    const duplicated = await page.evaluate(() => {
      const ids = Array.from(document.querySelectorAll("[id]"), (element) => element.id);
      return ids.filter((id, index) => ids.indexOf(id) !== index);
    });

    expect(duplicated).toEqual([]);
  });

  test("keeps section titles below the sticky header after navigating", async ({ page }) => {
    const headerHeight = await page.locator("header").first().evaluate((header) => header.getBoundingClientRect().height);

    for (const id of ["servicos", "faq", "equipamento", "clientes", "licencas", "contato"]) {
      await page.evaluate((target) => {
        document.documentElement.style.scrollBehavior = "auto";
        location.hash = "";
        location.hash = target;
      }, id);
      const top = await page
        .locator(`#${id} h2`)
        .first()
        .evaluate((heading) => heading.getBoundingClientRect().top);

      expect(top, id).toBeGreaterThanOrEqual(headerHeight);
    }
  });

  test("keeps FAQ answers fully visible after resizing", async ({ page }) => {
    await page.getByRole("button", { name: /Desentupimento — Como funciona/ }).click();
    await page.waitForTimeout(400);
    await page.setViewportSize({ width: 320, height: 800 });
    await page.waitForTimeout(400);

    const list = page.locator("#faq ol").first();
    const { panel, content } = await list.evaluate((element) => {
      const listBox = element.getBoundingClientRect();
      let panelElement = element.parentElement!;
      while (panelElement && getComputedStyle(panelElement).overflow !== "hidden") {
        panelElement = panelElement.parentElement!;
      }
      return { panel: panelElement.getBoundingClientRect().bottom, content: listBox.bottom };
    });

    expect(panel).toBeGreaterThanOrEqual(content);
  });

  test("scrolls client logos seamlessly", async ({ page }) => {
    const track = page.locator("#clientes .marquee-track");
    await expect(track).toHaveCount(1);

    const { trackWidth, viewportWidth, end } = await track.evaluate((element) => {
      const keyframes = element.getAnimations()[0]?.effect instanceof KeyframeEffect
        ? (element.getAnimations()[0].effect as KeyframeEffect).getKeyframes()
        : [];
      return {
        trackWidth: element.scrollWidth,
        viewportWidth: element.parentElement!.clientWidth,
        end: keyframes.at(-1)?.transform,
      };
    });

    expect(trackWidth).toBeGreaterThan(viewportWidth);
    expect(end).toMatch(/^translateX?\(-50%\)$/);
  });

  test("stops the client logos for reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });

    const animationName = await page
      .locator("#clientes .marquee-track")
      .first()
      .evaluate((element) => getComputedStyle(element).animationName);

    expect(animationName).toBe("none");
  });

  test("opens and closes the service details", async ({ page }) => {
    await page.getByRole("button", { name: "Abrir informações de Desentupimento" }).click();
    await expect(page.getByRole("dialog", { name: "Desentupimento" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("opens the license details", async ({ page }) => {
    await page.getByRole("button", { name: /IBAMA/ }).click();
    await expect(page.getByText(/descarte de materiais poluentes/)).toBeVisible();

    await page.getByRole("button", { name: "Fechar" }).click();
    await expect(page.getByText(/descarte de materiais poluentes/)).toHaveCount(0);
  });
});

test.describe("mobile", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await page.goto("/");
  });

  test("has no horizontal scroll", async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("opens and closes the menu", async ({ page }) => {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByRole("button", { name: "Fechar menu" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
