import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServicesSection from "./ServicesSection";
import { SERVICES } from "./services.data";

describe("ServicesSection", () => {
  it("renders a card for each service", () => {
    render(<ServicesSection />);

    SERVICES.forEach((service) =>
      expect(screen.getByRole("button", { name: `Abrir informações de ${service.title}` })).toBeInTheDocument()
    );
  });

  it("opens the service details and closes with Escape", () => {
    render(<ServicesSection />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir informações de Auto Vácuo" }));

    const dialog = screen.getByRole("dialog", { name: "Auto Vácuo" });
    expect(dialog).toHaveTextContent("Residencial");
    expect(dialog).toHaveTextContent("Empresarial");
    expect(dialog).toHaveTextContent("Industrial");
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the details with the close button", () => {
    render(<ServicesSection />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir informações de Desentupimento" }));
    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
