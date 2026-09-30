"use client";

import Image from "next/image";
import { CLIENT_LOGOS } from "./clients.data";

export default function ClientsSection() {
  const track = [
    ...CLIENT_LOGOS.map((logo) => ({ ...logo, copy: false })),
    ...CLIENT_LOGOS.map((logo) => ({ ...logo, copy: true })),
  ];

  return (
    <section
      id="clientes"
      className="relative mx-[calc(50%-50vw)] w-screen bg-white text-complementary"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div>
          <header className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="font-display tracking-[0.25em] text-3xl sm:text-4xl">
              CLIENTES QUE ACREDITAM
              <br className="hidden sm:block" /> NO NOSSO TRABALHO
            </h2>
          </header>
          <div className="overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-10 pr-10 sm:gap-14 sm:pr-14 lg:gap-20 lg:pr-20 will-change-transform select-none">
              {track.map((logo) => (
                <div
                  key={`${logo.id}-${logo.copy ? "copy" : "main"}`}
                  className="shrink-0"
                  aria-hidden={logo.copy || undefined}
                >
                  <div className="flex items-center h-14 sm:h-24 lg:h-30">
                    <Image
                      src={logo.src}
                      alt={logo.copy ? "" : logo.alt}
                      width={240}
                      height={100}
                      className="h-full w-auto object-contain filter grayscale"
                      unoptimized
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
