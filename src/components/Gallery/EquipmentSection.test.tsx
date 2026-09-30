import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EquipmentSection from "./EquipmentSection";
import { EQUIPMENT_PHOTOS } from "./gallery.data";

describe("EquipmentSection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.innerWidth = 1440;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not move the carousel while the lightbox handles the arrow keys", () => {
    render(<EquipmentSection />);

    fireEvent.click(screen.getByRole("button", { name: `Ampliar imagem: ${EQUIPMENT_PHOTOS[0].alt}` }));
    fireEvent.keyDown(document, { key: "ArrowRight" });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByRole("button", { name: "Ir para página 1" })).toHaveClass("bg-primary");
  });
});
