import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionLicencas from "./SectionLicencas";

describe("SectionLicencas", () => {
  it("lists the regulatory agencies", () => {
    render(<SectionLicencas />);

    ["IBAMA", "CETESB", "SABESP"].forEach((agency) =>
      expect(screen.getByRole("button", { name: new RegExp(agency) })).toBeInTheDocument()
    );
  });

  it("opens the agency details and closes with the close button", () => {
    render(<SectionLicencas />);

    fireEvent.click(screen.getByRole("button", { name: /CETESB/ }));

    expect(screen.getByRole("heading", { level: 3, name: "CETESB" })).toBeInTheDocument();
    expect(screen.getByText(/papel ambiental da empresa/)).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));
    expect(screen.queryByText(/papel ambiental da empresa/)).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("opens the agency details as an accessible dialog that closes with Escape", () => {
    render(<SectionLicencas />);

    fireEvent.click(screen.getByRole("button", { name: /SABESP/ }));
    expect(screen.getByRole("dialog", { name: "SABESP" })).toBeInTheDocument();
    expect(screen.getByText(/A ROTEC Service é constantemente fiscalizada/)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
