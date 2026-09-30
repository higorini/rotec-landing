import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildWhatsHref, CONTACT } from "@/lib/contact";
import Footer from "./Footer";

describe("Footer", () => {
  it("links to every contact channel", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: CONTACT.phone })).toHaveAttribute("href", CONTACT.phoneHref);
    expect(screen.getByRole("link", { name: CONTACT.whatsappDisplay })).toHaveAttribute("href", buildWhatsHref());
    expect(screen.getByRole("link", { name: CONTACT.email })).toHaveAttribute("href", CONTACT.emailHref);
  });

  it("uses icons instead of emojis", () => {
    const { container } = render(<Footer />);

    expect(container.textContent).not.toMatch(/\p{Emoji_Presentation}|\uFE0F/u);
    expect(container.querySelectorAll("svg.lucide")).toHaveLength(9);
  });
});
