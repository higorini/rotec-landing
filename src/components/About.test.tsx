import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "./About";

describe("About", () => {
  it("starts on the company tab", () => {
    const { container } = render(<About />);

    expect(screen.getByRole("button", { name: "Sobre a Empresa" })).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector(".fade-in h2")).toHaveTextContent("SOBRE A EMPRESA");
  });

  it("hides the measuring copy of the tabs from assistive technology", () => {
    render(<About />);

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
  });

  it("switches content when another tab is selected", () => {
    const { container } = render(<About />);

    fireEvent.click(screen.getByRole("button", { name: "Nossa Missão" }));

    expect(screen.getByRole("button", { name: "Nossa Missão" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Sobre a Empresa" })).toHaveAttribute("aria-pressed", "false");
    expect(container.querySelector(".fade-in h2")).toHaveTextContent("NOSSA MISSÃO");
  });
});
