"use client";
import { ServiceItem } from "./types";

type Props = { service: ServiceItem; index: number; onClick: (svc: ServiceItem) => void };

export default function ServiceCard({ service, index, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(service)}
      aria-label={`Abrir informações de ${service.title}`}
      className="
        group rounded-2xl bg-secondary text-complementary border border-transparent
        shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)]
        hover:-translate-y-1 hover:border-accent
        transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
        flex flex-col items-center justify-center text-center
        w-full max-w-[260px]
        h-[200px] sm:h-[220px] md:h-[240px]
        p-4
      "
    >
      <span
        aria-hidden
        className="animate-float mb-3"
        style={{ animationDelay: `${index * -1.1}s` }}
      >
        <service.Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
      </span>
      <span className="font-display text-xl sm:text-2xl">
        {service.title}
      </span>
      <span aria-hidden className="mt-3 text-sm font-semibold text-accent">
        Ver detalhes{" "}
        <span className="inline-block transition group-hover:translate-x-1">→</span>
      </span>
    </button>
  );
}
