import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Carousel from "./Carousel";
import type { GalleryImage } from "./types";

const PHOTOS: GalleryImage[] = Array.from({ length: 6 }, (_, i) => ({
  id: `p-${i}`,
  src: `/p-${i}.jpeg`,
  alt: `Foto ${i}`,
  w: 1600,
  h: 1067,
}));

describe("Carousel", () => {
  it("renders every photo as a slide of an accessible carousel", () => {
    render(<Carousel photos={PHOTOS} />);

    expect(screen.getByRole("region", { name: "Fotos dos equipamentos" })).toHaveAttribute("aria-roledescription", "carrossel");
    const slides = screen.getAllByRole("group");
    expect(slides).toHaveLength(6);
    expect(slides[2]).toHaveAttribute("aria-label", "3 de 6");
    PHOTOS.forEach((photo) => expect(screen.getByRole("img", { name: photo.alt })).toBeInTheDocument());
  });

  it("shows the position counter", () => {
    render(<Carousel photos={PHOTOS} />);

    expect(screen.getByText("1 / 6")).toBeInTheDocument();
  });

  it("opens the lightbox with the clicked photo on any screen size", () => {
    const onOpenLightbox = vi.fn();
    render(<Carousel photos={PHOTOS} onOpenLightbox={onOpenLightbox} />);

    fireEvent.click(screen.getByRole("button", { name: "Ampliar imagem: Foto 4" }));
    expect(onOpenLightbox).toHaveBeenLastCalledWith(4);

    fireEvent.click(screen.getByRole("button", { name: "Ampliar imagem: Foto 0" }));
    expect(onOpenLightbox).toHaveBeenLastCalledWith(0);
  });

  it("lets the visitor pause and resume the slideshow", () => {
    render(<Carousel photos={PHOTOS} />);

    fireEvent.click(screen.getByRole("button", { name: "Pausar apresentação" }));
    fireEvent.click(screen.getByRole("button", { name: "Retomar apresentação" }));

    expect(screen.getByRole("button", { name: "Pausar apresentação" })).toBeInTheDocument();
  });

  it("hides the slideshow control when the system asks for reduced motion", () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({ ...original(query), matches: query.includes("reduce") })) as typeof window.matchMedia;

    render(<Carousel photos={PHOTOS} />);
    expect(screen.queryByRole("button", { name: /apresentação/ })).not.toBeInTheDocument();

    window.matchMedia = original;
  });
});
