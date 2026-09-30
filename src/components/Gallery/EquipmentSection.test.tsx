import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EquipmentSection from "./EquipmentSection";
import { EQUIPMENT_PHOTOS } from "./gallery.data";

describe("EquipmentSection", () => {
  it("opens the clicked photo in the lightbox and closes it", () => {
    render(<EquipmentSection />);

    fireEvent.click(screen.getByRole("button", { name: `Ampliar imagem: ${EQUIPMENT_PHOTOS[4].alt}` }));
    expect(screen.getByRole("dialog", { name: "Foto ampliada" })).toBeInTheDocument();
    expect(screen.getByText(`5 / ${EQUIPMENT_PHOTOS.length}`)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
