"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { GalleryImage } from "../Gallery/types";

type Props = {
  photos: GalleryImage[];
  onOpenLightbox?: (index: number) => void;
  paused?: boolean;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const AUTOPLAY_DELAY = 4000;

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export default function Carousel({ photos, onOpenLightbox, paused = false }: Props) {
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({
      delay: AUTOPLAY_DELAY,
      playOnInit: false,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  ]);
  const [selected, setSelected] = useState(0);
  const [stoppedByUser, setStoppedByUser] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const shouldPlay = !stoppedByUser && !paused && !reducedMotion && !hovered && !focused;
  const shouldPlayRef = useRef(shouldPlay);

  useEffect(() => {
    shouldPlayRef.current = shouldPlay;
    const autoplay = emblaApi?.plugins().autoplay;
    if (!autoplay) return;
    if (shouldPlay) autoplay.play();
    else autoplay.stop();
  }, [emblaApi, shouldPlay]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const onPointerUp = () => {
      if (shouldPlayRef.current) emblaApi.plugins().autoplay?.play();
    };
    emblaApi.on("select", onSelect).on("reInit", onSelect).on("pointerUp", onPointerUp);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect).off("pointerUp", onPointerUp);
    };
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <div className="space-y-6">
      <div
        ref={emblaRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Fotos dos equipamentos"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
        className="overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
      >
        <div className="flex touch-pan-y -ml-3 sm:-ml-4">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} de ${photos.length}`}
              className="min-w-0 shrink-0 grow-0 basis-full pl-3 sm:basis-1/2 sm:pl-4 lg:basis-1/3 xl:basis-1/4"
            >
              <button
                onClick={() => onOpenLightbox?.(idx)}
                className="relative block w-full overflow-hidden rounded-xl border bg-secondary shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] group cursor-pointer transition-all"
                aria-label={`Ampliar imagem: ${photo.alt}`}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    draggable={false}
                  />
                </div>
                <div className="absolute inset-0 hidden md:grid place-items-center bg-black/0 group-hover:bg-black/15 transition">
                  <div className="opacity-0 group-hover:opacity-100 transition rounded-full border backdrop-blur bg-white/70 text-primary w-10 h-10 grid place-items-center">
                    ＋
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={prev}
          className="grid shrink-0 place-items-center rounded-full border w-10 h-10 text-primary bg-white/90 hover:bg-white shadow transition"
          aria-label="Foto anterior"
        >
          ‹
        </button>

        <div className="flex items-center gap-3">
          <span aria-live="polite" className="text-sm font-semibold tabular-nums">
            {selected + 1} / {photos.length}
          </span>
          {!reducedMotion && (
            <button
              onClick={() => setStoppedByUser((value) => !value)}
              className="grid shrink-0 place-items-center rounded-full border w-8 h-8 text-xs hover:bg-white/10 transition"
              aria-label={stoppedByUser ? "Retomar apresentação" : "Pausar apresentação"}
            >
              <span aria-hidden>{stoppedByUser ? "▶" : "❚❚"}</span>
            </button>
          )}
        </div>

        <button
          onClick={next}
          className="grid shrink-0 place-items-center rounded-full border w-10 h-10 text-primary bg-white/90 hover:bg-white shadow transition"
          aria-label="Próxima foto"
        >
          ›
        </button>
      </div>
    </div>
  );
}
