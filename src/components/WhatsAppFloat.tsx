"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { buildWhatsHref } from "@/lib/contact";

export default function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contato");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <a
      href={buildWhatsHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed right-4 grid h-14 w-14 place-items-center rounded-full bg-[var(--color-success)] shadow-[var(--shadow-hover)] transition hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-success)]/40 fade-in"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))", zIndex: "var(--z-float)" }}
    >
      <Image src="/images/redes/whatsapp.svg" alt="" width={28} height={28} className="h-7 w-7 brightness-0 invert" />
    </a>
  );
}
