"use client";
import { ServiceItem } from "./types";

type Props = { service: ServiceItem; onClick: (svc: ServiceItem) => void };

export default function ServiceCard({ service, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(service)}
      aria-label={`Abrir informações de ${service.title}`}
      className="
        group rounded-2xl bg-secondary text-complementary border
        shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)]
        transition focus-visible:outline-2 focus-visible:outline-primary
        flex flex-col items-center justify-center text-center
        w-full max-w-[260px]
        h-[200px] sm:h-[220px] md:h-[240px]
        p-4
      "
    >
      <service.Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3" />
      <span className="font-display text-xl sm:text-2xl">
        {service.title}
      </span>
    </button>
  );
}
