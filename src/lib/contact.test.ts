import { describe, expect, it } from "vitest";
import { buildWhatsHref, CONTACT, onlyDigits } from "./contact";

describe("contact", () => {
  it("keeps only digits", () => {
    expect(onlyDigits("+55 (11) 94030-2311")).toBe("5511940302311");
  });

  it("builds the WhatsApp link with the default message", () => {
    expect(buildWhatsHref()).toBe(
      `https://wa.me/5511940302311?text=${encodeURIComponent("Olá! Vim pelo site da ROTEC e gostaria de um orçamento.")}`
    );
  });

  it("builds the WhatsApp link with a custom message", () => {
    expect(buildWhatsHref("Emergência")).toBe("https://wa.me/5511940302311?text=Emerg%C3%AAncia");
  });

  it("exposes phone and e-mail links", () => {
    expect(CONTACT.phoneHref).toBe("tel:+551141959000");
    expect(CONTACT.emailHref).toBe("mailto:rotec@rotecservice.com.br");
  });

  it("exposes the WhatsApp and the alternative phone", () => {
    expect(CONTACT.whatsappDisplay).toBe("(11) 94030-2311");
    expect(CONTACT.alternativePhone).toBe("(11) 96649-6087");
    expect(CONTACT.alternativePhoneHref).toBe("tel:+5511966496087");
  });
});
