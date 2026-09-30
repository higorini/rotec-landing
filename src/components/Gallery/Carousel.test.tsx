import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Carousel from "./Carousel";
import type { GalleryImage } from "./types";

const PHOTOS: GalleryImage[] = Array.from({ length: 6 }, (_, i) => ({
  id: `p-${i}`,
  src: `/p-${i}.jpeg`,
  alt: `Foto ${i}`,
  w: 1600,
  h: 1067,
}));

function visibleSources(container: HTMLElement) {
  return Array.from(container.querySelectorAll("img")).map((img) => img.getAttribute("src"));
}

function advance() {
  act(() => {
    vi.advanceTimersByTime(300);
  });
}

describe("Carousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.innerWidth = 1440;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows four photos per page on desktop", () => {
    const { container } = render(<Carousel photos={PHOTOS} />);

    expect(visibleSources(container)).toEqual(["/p-0.jpeg", "/p-1.jpeg", "/p-2.jpeg", "/p-3.jpeg"]);
    expect(screen.getAllByRole("button", { name: /Ir para página/ })).toHaveLength(2);
  });

  it("goes to the next page and wraps back to the first", () => {
    const { container } = render(<Carousel photos={PHOTOS} />);

    fireEvent.click(screen.getByRole("button", { name: "Próxima página" }));
    advance();
    expect(visibleSources(container)).toEqual(["/p-4.jpeg", "/p-5.jpeg"]);

    fireEvent.click(screen.getByRole("button", { name: "Próxima página" }));
    advance();
    expect(visibleSources(container)[0]).toBe("/p-0.jpeg");
  });

  it("goes back from the first page to the last", () => {
    const { container } = render(<Carousel photos={PHOTOS} />);

    fireEvent.click(screen.getByRole("button", { name: "Página anterior" }));
    advance();

    expect(visibleSources(container)).toEqual(["/p-4.jpeg", "/p-5.jpeg"]);
  });

  it("opens the lightbox with the absolute photo index", () => {
    const onOpenLightbox = vi.fn();
    render(<Carousel photos={PHOTOS} onOpenLightbox={onOpenLightbox} />);

    fireEvent.click(screen.getByRole("button", { name: "Próxima página" }));
    advance();
    fireEvent.click(screen.getByRole("button", { name: "Ampliar imagem: Foto 5" }));

    expect(onOpenLightbox).toHaveBeenCalledWith(5);
  });

  it("keeps opening photos after an interrupted drag", () => {
    const onOpenLightbox = vi.fn();
    const { container } = render(<Carousel photos={PHOTOS} onOpenLightbox={onOpenLightbox} />);
    const track = container.querySelector(".overflow-hidden")!;

    fireEvent.pointerDown(track, { clientX: 100, pointerType: "touch" });
    fireEvent.pointerCancel(track, { clientX: 100, pointerType: "touch" });
    fireEvent.click(screen.getByRole("button", { name: "Ampliar imagem: Foto 1" }));

    expect(onOpenLightbox).toHaveBeenCalledWith(1);
  });

  it("shows one photo per page on mobile", () => {
    window.innerWidth = 390;
    const { container } = render(<Carousel photos={PHOTOS} />);

    expect(visibleSources(container)).toEqual(["/p-0.jpeg"]);
    expect(screen.getByText("1 / 6")).toBeInTheDocument();
    expect(screen.queryAllByRole("button", { name: /Ir para página/ })).toHaveLength(0);
  });
});
