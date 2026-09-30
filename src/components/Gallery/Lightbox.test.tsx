import { act, fireEvent, render, screen } from "@testing-library/react";
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

  it("shows the selected photo and locks page scroll", () => {
    const { unmount } = renderLightbox(1);

    expect(screen.getByRole("img", { name: "Foto B" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("navigates with the keyboard and wraps around", () => {
    const { onIndex } = renderLightbox(0);

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(onIndex).toHaveBeenLastCalledWith(1);

    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(onIndex).toHaveBeenLastCalledWith(2);
  });

  it("navigates with the arrow buttons", () => {
    const { onIndex } = renderLightbox(2);

    fireEvent.click(screen.getByRole("button", { name: "Próxima" }));
    expect(onIndex).toHaveBeenLastCalledWith(0);

    fireEvent.click(screen.getByRole("button", { name: "Anterior" }));
    expect(onIndex).toHaveBeenLastCalledWith(1);
  });

  it("fades the photo in when it changes", () => {
    vi.useFakeTimers();
    const { rerender } = renderLightbox(0);

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByRole("img", { name: "Foto A" })).toHaveStyle({ opacity: "1" });

    rerender(<Lightbox open index={1} photos={PHOTOS} onClose={vi.fn()} onIndex={vi.fn()} />);
    expect(screen.getByRole("img", { name: "Foto B" })).toHaveStyle({ opacity: "0" });

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByRole("img", { name: "Foto B" })).toHaveStyle({ opacity: "1" });
    vi.useRealTimers();
  });

  it("closes with Escape", () => {
    const { onClose } = renderLightbox();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes with the close button", () => {
    const { onClose } = renderLightbox();

    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));

    expect(onClose).toHaveBeenCalled();
  });
});
