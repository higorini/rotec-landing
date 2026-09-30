import { expect, test } from "@playwright/test";

test.describe("seo and performance", () => {
  test("uses a single WhatsApp link across the page", async ({ page }) => {
    await page.goto("/");

    const hrefs = await page.locator('a[href^="https://wa.me/"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("href"))
    );

    expect(hrefs.length).toBeGreaterThan(0);
    expect(new Set(hrefs).size).toBe(1);
  });

  test("points structured data logo to the company logo", async ({ page }) => {
    await page.goto("/");

    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    const organization = data["@graph"].find((node: { "@type": string }) => node["@type"] === "LocalBusiness");

    expect(organization.logo).toBe("https://www.rotecservice.com.br/images/logo.svg");
    expect(organization.description).toContain("24 horas");
  });

  test("serves a PNG apple touch icon", async ({ page, request }) => {
    await page.goto("/");

    const href = await page.locator('link[rel="apple-touch-icon"]').getAttribute("href");
    const response = await request.get(href!);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("lists only real pages in the sitemap", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();

    expect(sitemap.match(/<loc>/g)).toHaveLength(1);
    expect(sitemap).not.toContain("#");
  });

  test("self-hosts the fonts", async ({ page }) => {
    const googleFonts: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("fonts.googleapis.com")) googleFonts.push(request.url());
    });

    await page.goto("/", { waitUntil: "networkidle" });

    expect(googleFonts).toEqual([]);
    expect(await page.evaluate(() => getComputedStyle(document.body).fontFamily)).toMatch(/Alexandria/);
  });

  test("starts Google Tag Manager", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const started = await page.evaluate(() =>
      ((window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer ?? []).some(
        (entry) => entry.event === "gtm.js"
      )
    );

    expect(started).toBe(true);
    expect(await page.content()).toContain("googletagmanager.com/ns.html?id=GTM-MKWC6JHW");
  });
});
