"use client";

import { useState } from "react";
import { SERVICES } from "./services.data";
import { ServiceItem } from "./types";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";

export default function ServicesSection() {
  const [current, setCurrent] = useState<ServiceItem | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <section
      id="servicos"
      className="relative mx-[calc(50%-50vw)] w-screen bg-primary text-secondary"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <header className="text-center max-w-3xl mx-auto">
          <h2 className="font-display tracking-[0.25em] text-3xl sm:text-5xl">
            NOSSOS SERVIÇOS
          </h2>
          <p className="mt-3 text-base sm:text-2xl text-secondary/80">
            Atendemos residencial, empresarial e industrial com segurança, agilidade
            e eficiência. Clique em um serviço para ver os detalhes.
          </p>
        </header>

        <div className="mt-8 sm:mt-10 max-w-7xl mx-auto">
          <div
            className="
              grid gap-4 sm:gap-6 justify-items-center
              grid-cols-2
              sm:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
            "
          >
            {SERVICES.map((svc) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                onClick={(s) => { setCurrent(s); setOpen(true); }}
              />
            ))}
          </div>
        </div>
      </div>

      <ServiceModal
        open={open}
        service={current}
        onClose={() => {
          setOpen(false);
          setCurrent(null);
        }}
      />
    </section>
  );
}
