import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Lightbox from "./Lightbox";
import type { GalleryImage } from "./types";

const PHOTOS: GalleryImage[] = [
  { id: "a", src: "/a.jpeg", alt: "Foto A", w: 1600, h: 1067 },
  { id: "b", src: "/b.jpeg", alt: "Foto B", w: 1600, h: 1067 },
  { id: "c", src: "/c.jpeg", alt: "Foto C", w: 1600, h: 1067 },
];

function renderLightbox(index = 0) {
  const onClose = vi.fn();
  const onIndex = vi.fn();
  const view = render(<Lightbox open index={index} photos={PHOTOS} onClose={onClose} onIndex={onIndex} />);
  return { ...view, onClose, onIndex };
}

describe("Lightbox", () => {
  it("renders nothing when closed", () => {
    render(<Lightbox open={false} index={0} photos={PHOTOS} onClose={vi.fn()} onIndex={vi.fn()} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows every photo, the counter of the selected one and locks page scroll", () => {
    const { unmount } = renderLightbox(1);

    expect(screen.getByRole("dialog", { name: "Foto ampliada" })).toBeInTheDocument();
    PHOTOS.forEach((photo) => expect(screen.getByRole("img", { name: photo.alt })).toBeInTheDocument());
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("highlights the thumbnail of the selected photo", () => {
    renderLightbox(2);

    expect(screen.getAllByRole("button", { name: /Ver foto/ })).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Ver foto 3" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("button", { name: "Ver foto 1" })).toHaveAttribute("aria-current", "false");
  });

  it("closes with Escape", () => {
    const { onClose } = renderLightbox();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes once with the close button", () => {
    const { onClose } = renderLightbox();

    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when clicking outside the photo but not on it", () => {
    const { onClose } = renderLightbox();

    fireEvent.click(screen.getByRole("img", { name: "Foto A" }));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
