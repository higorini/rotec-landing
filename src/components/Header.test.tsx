import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "./Header";

describe("Header", () => {
  const SECTIONS = [
    ["#sobre", "Sobre"],
    ["#servicos", "Serviços"],
    ["#faq", "Como Funciona"],
    ["#equipamento", "Equipamento"],
    ["#clientes", "Clientes"],
    ["#licencas", "Licenças"],
    ["#contato", "Contato"],
  ];

  it("links desktop navigation to every page section", () => {
    render(<Header />);
    const links = Array.from(screen.getAllByRole("navigation")[0].querySelectorAll("a"));

    expect(links.map((link) => [link.getAttribute("href"), link.textContent])).toEqual(SECTIONS);
  });

  it("links the mobile menu to every page section", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    const links = Array.from(screen.getByRole("dialog").querySelectorAll("nav a"))
      .filter((link) => link.textContent !== "Solicitar Orçamento");

    expect(links.map((link) => [link.getAttribute("href"), link.textContent])).toEqual(SECTIONS);
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
