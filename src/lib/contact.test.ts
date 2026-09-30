import { describe, expect, it } from "vitest";
import { buildWhatsHref, CONTACT, onlyDigits } from "./contact";

describe("contact", () => {
  it("keeps only digits", () => {
    expect(onlyDigits("+55 (11) 94785-0224")).toBe("5511947850224");
  });

  it("builds the WhatsApp link with the default message", () => {
    expect(buildWhatsHref()).toBe(
      `https://wa.me/5511947850224?text=${encodeURIComponent("Olá! Vim pelo site da ROTEC e gostaria de um orçamento.")}`
    );
  });

  it("builds the WhatsApp link with a custom message", () => {
    expect(buildWhatsHref("Emergência")).toBe("https://wa.me/5511947850224?text=Emerg%C3%AAncia");
  });

  it("exposes phone and e-mail links", () => {
    expect(CONTACT.phoneHref).toBe("tel:+551141959000");
    expect(CONTACT.emailHref).toBe("mailto:rotec@rotecservice.com.br");
  });
});
