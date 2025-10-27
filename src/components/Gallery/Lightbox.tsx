"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "./types";

type Props = {
  open: boolean;
  index: number;
  photos: GalleryImage[];
  onClose: () => void;
  onIndex: (i: number) => void;
};

export default function Lightbox({ open, index, photos, onClose, onIndex }: Props) {
  const [dragX, setDragX] = useState<number | null>(null);
  const startRef = useRef(0);

  
  const idxRef = useRef(index);
  const lenRef = useRef(photos.length);
  const onIndexRef = useRef(onIndex);

  useEffect(() => { idxRef.current = index; }, [index]);
  useEffect(() => { lenRef.current = photos.length; }, [photos.length]);
  useEffect(() => { onIndexRef.current = onIndex; }, [onIndex]);

  const next = () => {
    const len = lenRef.current || 1;
    onIndexRef.current((idxRef.current + 1) % len);
  };
  const prev = () => {
    const len = lenRef.current || 1;
    onIndexRef.current((idxRef.current - 1 + len) % len);
  };

  
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    const onWheel = (e: WheelEvent) => {
      
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        e.deltaX > 0 ? next() : prev();
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("wheel", onWheel as any);
    };
  
  }, [open, onClose]);

  if (!open) return null;
  const photo = photos[index];

  
  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startRef.current = e.clientX;
    setDragX(0);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragX === null) return;
    setDragX(e.clientX - startRef.current);
  };
  const onPointerUp = () => {
    if (dragX !== null) {
      if (dragX < -60) next();
      else if (dragX > 60) prev();
    }
    setDragX(null);
  };

  return (
    <div
      className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full border w-10 h-10 grid place-items-center text-secondary"
      >
        ✕
      </button>

      <button
        aria-label="Anterior"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border w-10 h-10 grid place-items-center text-secondary/90 hover:text-white"
      >
        ‹
      </button>
      <button
        aria-label="Próxima"
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border w-10 h-10 grid place-items-center text-secondary/90 hover:text-white"
      >
        ›
      </button>

      
      <div
        className="h-full w-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="relative max-w-[min(95vw,1200px)] max-h-[85svh] w-full h-full"
          style={{
            transform: dragX ? `translateX(${dragX}px)` : undefined,
            transition: dragX ? "none" : "transform .2s",
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            className="object-contain select-none"
            draggable={false}
            priority
          />
        </div>
      </div>
    </div>
  );
}
