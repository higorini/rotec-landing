"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "../Gallery/types";

type Props = {
  photos: GalleryImage[];
  onOpenLightbox?: (index: number) => void;
};

export default function Carousel({ photos, onOpenLightbox }: Props) {
  const [isMobile, setIsMobile] = useState(true);
  const [page, setPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const draggingRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const imagesPerPage = isMobile ? 1 : 4;
  const totalPages = Math.ceil(photos.length / imagesPerPage);

  const goToPage = useCallback((newPage: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setPage(newPage);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const next = useCallback(() => {
    const nextPage = page + 1 >= totalPages ? 0 : page + 1;
    goToPage(nextPage);
  }, [page, totalPages, goToPage]);

  const prev = useCallback(() => {
    const prevPage = page - 1 < 0 ? totalPages - 1 : page - 1;
    goToPage(prevPage);
  }, [page, totalPages, goToPage]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobile, next, prev]);

  const startXRef = useRef(0);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (isTransitioning) return;
    startXRef.current = e.clientX;
    draggingRef.current = true;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const deltaX = e.clientX - startXRef.current;
    const threshold = 50;
    if (deltaX > threshold) prev();
    else if (deltaX < -threshold) next();
  };

  const startIdx = page * imagesPerPage;
  const displayPhotos = photos.slice(startIdx, startIdx + imagesPerPage);

  const handlePhotoClick = (photoIndex: number) => {
    if (draggingRef.current) return;
    if (!isMobile) {
      onOpenLightbox?.(startIdx + photoIndex);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className="overflow-hidden rounded-2xl"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className={`grid gap-3 sm:gap-4 ${
            isMobile ? "grid-cols-1" : "grid-cols-4"
          } transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {displayPhotos.map((photo, idx) => (
            <button
              key={`${page}-${idx}`}
              onClick={() => handlePhotoClick(idx)}
              className="relative block w-full overflow-hidden rounded-xl border bg-secondary shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] group cursor-pointer transition-all"
              aria-label={isMobile ? "Imagem" : `Ampliar imagem: ${photo.alt}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  draggable={false}
                />
              </div>
              {!isMobile && (
                <div className="absolute inset-0 hidden md:grid place-items-center bg-black/0 group-hover:bg-black/15 transition">
                  <div className="opacity-0 group-hover:opacity-100 transition rounded-full border backdrop-blur bg-white/70 text-primary w-10 h-10 grid place-items-center">
                    ＋
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={prev}
          disabled={isTransitioning}
          className="grid place-items-center rounded-full border w-10 h-10 text-primary bg-white/90 hover:bg-white shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Página anterior"
        >
          ‹
        </button>

        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isTransitioning) {
                  goToPage(i);
                }
              }}
              disabled={isTransitioning}
              className={`h-2 w-2 rounded-full transition ${
                page === i ? "bg-primary" : "bg-gray-400/50 hover:bg-gray-500/70"
              } disabled:cursor-not-allowed`}
              aria-label={`Ir para página ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={isTransitioning}
          className="grid place-items-center rounded-full border w-10 h-10 text-primary bg-white/90 hover:bg-white shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Próxima página"
        >
          ›
        </button>
      </div>
    </div>
  );
}
