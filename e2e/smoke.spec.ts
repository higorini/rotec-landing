import { expect, test } from "@playwright/test";

test.describe("smoke @smoke", () => {
  test("serves the home page", async ({ request }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);

    const html = await response.text();
    for (const text of ["ROTEC SERVICE", "NOSSOS SERVIÇOS", "COMO FUNCIONA", "NOSSO EQUIPAMENTO", "GTM-MKWC6JHW"]) {
      expect(html).toContain(text);
    }
  });

  test("serves the open graph image", async ({ request }) => {
    const response = await request.get("/images/og.jpg");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/jpeg");
  });

  test("serves sitemap and robots", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("<loc>https://www.rotecservice.com.br</loc>");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap: https://www.rotecservice.com.br/sitemap.xml");
  });
});
