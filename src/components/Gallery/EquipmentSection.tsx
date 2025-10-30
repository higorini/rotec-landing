"use client";

import { useState } from "react";
import { EQUIPMENT_PHOTOS } from "./gallery.data";
import type { GalleryImage } from "./types";
import Carousel from "./Carousel";
import Lightbox from "./Lightbox";

export default function EquipmentSection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section
      id="equipamento"
      className="relative mx-[calc(50%-50vw)] w-screen bg-primary text-secondary"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <header className="text-center max-w-3xl mx-auto">
          <h2 className="font-display tracking-[0.2em] text-3xl sm:text-4xl">NOSSO EQUIPAMENTO</h2>
          <p className="mt-3 text-sm sm:text-base text-gray-200">
            Arraste para o lado no celular. Em telas maiores, clique para ampliar.
          </p>
        </header>

        <div className="mt-8 sm:mt-10 max-w-7xl mx-auto">
          <Carousel
            photos={EQUIPMENT_PHOTOS}
            onOpenLightbox={(i) => {
              
              if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
                setIndex(i);
                setOpen(true);
              }
            }}
          />
        </div>
      </div>

      <Lightbox
        open={open}
        index={index}
        onClose={() => setOpen(false)}
        onIndex={setIndex}
        photos={EQUIPMENT_PHOTOS as GalleryImage[]}
      />
    </section>
  );
}
