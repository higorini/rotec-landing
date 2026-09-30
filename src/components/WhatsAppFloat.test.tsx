import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildWhatsHref } from "@/lib/contact";
import WhatsAppFloat from "./WhatsAppFloat";

let notify: (entries: Partial<IntersectionObserverEntry>[]) => void = () => {};

class IntersectionObserverStub {
  constructor(callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
    notify = callback;
  }
  observe() {}
  disconnect() {}
}

describe("WhatsAppFloat", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
    document.body.innerHTML = '<section id="contato"></section>';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("links to WhatsApp with the default message", () => {
    render(<WhatsAppFloat />);

    expect(screen.getByRole("link", { name: "Fale conosco pelo WhatsApp" })).toHaveAttribute("href", buildWhatsHref());
  });

  it("hides while the contact section is visible", () => {
    render(<WhatsAppFloat />);

    act(() => notify([{ isIntersecting: true }]));
    expect(screen.queryByRole("link", { name: "Fale conosco pelo WhatsApp" })).not.toBeInTheDocument();

    act(() => notify([{ isIntersecting: false }]));
    expect(screen.getByRole("link", { name: "Fale conosco pelo WhatsApp" })).toBeInTheDocument();
  });
});
