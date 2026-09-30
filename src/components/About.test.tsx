import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "./About";

describe("About", () => {
  it("starts on the company tab", () => {
    render(<About />);

    expect(screen.getByRole("button", { name: "Sobre a Empresa" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("SOBRE A EMPRESA");
  });

  it("exposes only the active tab to assistive technology", () => {
    render(<About />);

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
  });

  it("switches content when another tab is selected", () => {
    render(<About />);

    fireEvent.click(screen.getByRole("button", { name: "Nossa Missão" }));

    expect(screen.getByRole("button", { name: "Nossa Missão" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Sobre a Empresa" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("NOSSA MISSÃO");
  });

  it("keeps every tab rendered so the transition can cross-fade", () => {
    const { container } = render(<About />);

    fireEvent.click(screen.getByRole("button", { name: "Nossos Valores" }));

    const panels = container.querySelectorAll("[data-tab-panel]");
    expect(panels).toHaveLength(4);
    expect(container.querySelector('[data-tab-panel="valores"]')).toHaveAttribute("data-active", "true");
    expect(container.querySelector('[data-tab-panel="empresa"]')).toHaveAttribute("data-active", "false");
    expect(container.querySelector('[data-tab-panel="empresa"]')).toHaveAttribute("inert");
  });
});
