"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "../Gallery/types";

type Props = {
  photos: GalleryImage[];
  onOpenLightbox?: (index: number) => void;
};

export default function Carousel({ photos, onOpenLightbox }: Props) {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const md = window.matchMedia("(min-width:768px)");
    const lg = window.matchMedia("(min-width:1024px)");
    const update = () => setPerView(lg.matches ? 4 : md.matches ? 2 : 1);
    update();
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);

  const pages = useMemo(
    () => Math.max(1, Math.ceil(photos.length / perView)),
    [photos.length, perView]
  );
  const isDesktop = perView >= 2;

  // Loop infinito: 1 cópia anterior + original + 1 cópia posterior
  const loop = useMemo(() => [...photos.slice(-1), ...photos, ...photos.slice(0, 1)], [photos]);
  const base = 1; // Começamos no índice 1 (primeira cópia anterior)
  const [idx, setIdx] = useState(base);
  const [isNormalizing, setIsNormalizing] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const normalizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Normalizar índice para loop infinito suave
  const normalize = useCallback(() => {
    setIsNormalizing(true);
    let newIdx = idx;
    const total = photos.length;

    // Se passou do final, volta pro início
    if (idx >= base + total) {
      newIdx = base;
    }
    // Se foi antes do início, vai pro final
    if (idx < base) {
      newIdx = base + total - perView;
    }

    if (newIdx !== idx && trackRef.current) {
      trackRef.current.style.transition = "none";
      setIdx(newIdx);
      // Force reflow para garantir que o navegador aplique a mudança
      void trackRef.current.offsetHeight;
      setIsNormalizing(false);
    } else {
      setIsNormalizing(false);
    }
  }, [idx, base, perView, photos.length]);

  const go = useCallback(
    (page: number) => setIdx(base + page * perView),
    [base, perView]
  );
  const pageFromIdx = Math.floor(((idx - base) / perView) % pages + pages) % pages;

  const next = useCallback(() => setIdx((v) => v + perView), [perView]);
  const prev = useCallback(() => setIdx((v) => v - perView), [perView]);

  const pointerDown = useRef(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const deltaX = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerDown.current = true;
    dragging.current = false;
    startX.current = e.clientX;
    deltaX.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointerDown.current) return;
    const dx = e.clientX - startX.current;
    deltaX.current = dx;

    if (!dragging.current && Math.abs(dx) > 6) {
      dragging.current = true;
      if (trackRef.current) trackRef.current.style.transition = "none";
      document.body.style.userSelect = "none";
    }

    if (!dragging.current || !trackRef.current) return;
    const width = (e.currentTarget as HTMLElement).clientWidth;
    const percent = (dx / width) * 100;
    const stepPercent = (100 / perView) * idx;
    trackRef.current.style.transform = `translateX(calc(-${stepPercent}% + ${percent}%))`;
  };

  const finishDrag = () => {
    document.body.style.userSelect = "";
    pointerDown.current = false;

    if (!dragging.current) return;

    if (trackRef.current) trackRef.current.style.transition = "transform .3s ease";
    const threshold = 40;
    if (deltaX.current < -threshold) next();
    else if (deltaX.current > threshold) prev();
    else {
      if (trackRef.current) {
        const stepPercent = (100 / perView) * idx;
        trackRef.current.style.transform = `translateX(-${stepPercent}%)`;
      }
    }

    dragging.current = false;
    deltaX.current = 0;
  };

  useEffect(() => {
    if (!isDesktop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDesktop, next, prev]);

  useEffect(() => {
    if (!trackRef.current) return;
    const stepPercent = (100 / perView) * idx;
    trackRef.current.style.transform = `translateX(-${stepPercent}%)`;

    // Se não estamos normalizando, aplicar transição
    if (!isNormalizing) {
      trackRef.current.style.transition = "transform 0.3s ease";
    }

    // Normalizar após a transição terminar
    if (normalizeTimeoutRef.current) clearTimeout(normalizeTimeoutRef.current);
    normalizeTimeoutRef.current = setTimeout(normalize, 300);

    return () => {
      if (normalizeTimeoutRef.current) clearTimeout(normalizeTimeoutRef.current);
    };
  }, [idx, perView, isNormalizing, normalize]);

  const basis =
    perView === 4 ? "basis-1/4" : perView === 2 ? "basis-1/2" : "basis-full";

  return (
    <div className="relative overflow-visible">
      <div
        className="overflow-hidden rounded-2xl touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onPointerLeave={finishDrag}
      >
        <div ref={trackRef} className="flex will-change-transform">
          {loop.map((p, i) => {
            const normalized = ((i % photos.length) + photos.length) % photos.length;
            return (
              <div key={`${p.id}-${i}`} className={`${basis} shrink-0 p-2 sm:p-3`}>
                <button
                  className="relative block w-full overflow-hidden rounded-2xl border bg-secondary shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] group"
                  onClick={(ev) => {
                    if (!isDesktop) return;
                    if (dragging.current) {
                      ev.preventDefault();
                      return;
                    }
                    onOpenLightbox?.(normalized);
                  }}
                  aria-label={isDesktop ? `Ampliar imagem: ${p.alt}` : `Imagem`}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      draggable={false}
                    />
                  </div>
                  {isDesktop && (
                    <div
                      aria-hidden
                      className="absolute inset-0 hidden md:grid place-items-center bg-black/0 group-hover:bg-black/15 transition"
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition rounded-full border backdrop-blur bg-white/70 text-primary w-10 h-10 grid place-items-center">
                        ＋
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <button
        aria-label="Anterior"
        onClick={prev}
        className="hidden md:grid place-items-center absolute -left-10 top-1/2 -translate-y-1/2 rounded-full border w-10 h-10 text-primary bg-white/90 hover:bg-white shadow"
      >
        ‹
      </button>
      <button
        aria-label="Próxima"
        onClick={next}
        className="hidden md:grid place-items-center absolute -right-10 top-1/2 -translate-y-1/2 rounded-full border w-10 h-10 text-primary bg-white/90 hover:bg-white shadow"
      >
        ›
      </button>

      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para página ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 w-2 rounded-full transition ${
              pageFromIdx === i ? "bg-primary" : "bg-gray-400/50 hover:bg-gray-500/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
