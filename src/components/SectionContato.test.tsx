import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionContato from "./SectionContato";

describe("SectionContato", () => {
  it("builds WhatsApp, phone and e-mail links from props", () => {
    render(
      <SectionContato
        phone="(11) 4195-9000"
        whatsapp="55 11 94785-0224"
        email="rotec@rotecservice.com.br"
        whatsMessage="Olá! Quero um orçamento."
      />
    );

    expect(screen.getByRole("link", { name: /Seja atendido no WhatsApp/ })).toHaveAttribute(
      "href",
      `https://wa.me/5511947850224?text=${encodeURIComponent("Olá! Quero um orçamento.")}`
    );
    expect(screen.getByRole("link", { name: "(11) 4195-9000" })).toHaveAttribute("href", "tel:+551141959000");
    expect(screen.getByRole("link", { name: "rotec@rotecservice.com.br" })).toHaveAttribute(
      "href",
      "mailto:rotec@rotecservice.com.br"
    );
  });

  it("uses the company contacts by default", () => {
    render(<SectionContato />);

    expect(screen.getByRole("link", { name: "(11) 4195-9000" })).toHaveAttribute("href", "tel:+551141959000");
    expect(screen.getByRole("link", { name: "rotec@rotecservice.com.br" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/rotecservice/");
  });

  it("highlights the call to action of the title", () => {
    render(<SectionContato title="Ficou com alguma dúvida? Fale conosco!" />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Ficou com alguma dúvida?");
    expect(heading.querySelector("span")).toHaveTextContent("Fale conosco!");
  });

  it("renders a link for each social network", () => {
    render(
      <SectionContato
        socials={[
          { name: "Instagram", href: "https://www.instagram.com/rotecservice/", iconPath: "/images/redes/instagram.svg" },
          { name: "LinkedIn", href: "https://www.linkedin.com/company/rotecservice/", iconPath: "/images/redes/linkedin.svg" },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/rotecservice/");
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/company/rotecservice/");
  });
});
