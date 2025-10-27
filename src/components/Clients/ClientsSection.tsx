"use client";

import Image from "next/image";
import { CLIENT_LOGOS } from "./clients.data";

export default function ClientsSection() {
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS]; 

  console.log("CLIENT_LOGOS:", CLIENT_LOGOS);

  return (
    <section
      id="clientes"
      className="relative mx-[calc(50%-50vw)] w-screen bg-secondary text-complementary"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <header className="text-center max-w-4xl mx-auto">
          <h2 className="font-display tracking-[0.25em] text-3xl sm:text-4xl">
            CLIENTES QUE ACREDITAM
            <br className="hidden sm:block" /> NO NOSSO TRABALHO
          </h2>
        </header>

        <div className="mt-10 overflow-hidden">
          <div className="relative">
            <div className="marquee-track relative z-10 flex items-center gap-10 sm:gap-14 lg:gap-20 will-change-transform select-none">
                {track.map((logo, i) => (
                  <div key={`${logo.id}-${i}`} className="shrink-0">
                    <div className="flex items-center h-14 sm:h-24 lg:h-30">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
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
            
            <div
              aria-hidden
              className="marquee-track marquee-ghost absolute inset-0 z-0 flex items-center gap-10 sm:gap-14 lg:gap-20 will-change-transform pointer-events-none select-none"
            >
              {track.map((logo, i) => (
                <div key={`ghost-${logo.id}-${i}`} className="shrink-0">
                  <div className="flex items-center h-14 sm:h-24 lg:h-30">
                    <Image
                      src={logo.src}
                      alt=""
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

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        .marquee-track { animation: marquee 40s linear infinite; }
        .marquee-ghost { transform: translateX(100%); }
      `}</style>

    </section>
  );
}
