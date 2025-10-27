"use client";

import { useEffect, useId } from "react";
import { ServiceItem } from "./types";

type Props = {
  open: boolean;
  service: ServiceItem | null;
  onClose: () => void;
};

export default function ServiceModal({ open, service, onClose }: Props) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !service) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <article
        className="max-h-[90svh] w-full max-w-3xl rounded-2xl bg-secondary text-complementary shadow-[var(--shadow-hover)] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-5 border-b">
          <h3 id={titleId} className="font-title text-xl sm:text-2xl font-bold">
            {service.title}
          </h3>
          <button
            aria-label="Fechar"
            onClick={onClose}
            className="rounded-full border w-9 h-9 grid place-items-center"
          >
            ✕
          </button>
        </header>

        <div className="p-5 grid gap-6">
          <p className="leading-relaxed">{service.description}</p>

          <div className="grid sm:grid-cols-2 gap-6">
            {service.residential && (
              <section className="rounded-2xl border p-4">
                <h4 className="font-semibold mb-2">Residencial</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.residential.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
            {service.business && (
              <section className="rounded-2xl border p-4">
                <h4 className="font-semibold mb-2">Empresarial</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.business.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
            {service.industrial && (
              <section className="rounded-2xl border p-4 sm:col-span-2">
                <h4 className="font-semibold mb-2">Industrial</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.industrial.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
