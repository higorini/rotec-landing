import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "./Header";

describe("Header", () => {
  it("links desktop navigation to page sections and WhatsApp", () => {
    render(<Header />);
    const nav = screen.getAllByRole("navigation")[0];

    expect(nav.querySelector('a[href="#sobre"]')).toHaveTextContent("Sobre");
    expect(nav.querySelector('a[href="#servicos"]')).toHaveTextContent("Serviços");
    expect(nav.querySelector('a[href="#equipamento"]')).toHaveTextContent("Equipamento");
    expect(nav.querySelector('a[href^="https://wa.me/5511947850224"]')).toHaveTextContent("Contato");
  });

  it("opens the mobile menu and closes it with Escape", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the mobile menu when a link is clicked", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    fireEvent.click(screen.getByRole("link", { name: "Solicitar Orçamento" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
