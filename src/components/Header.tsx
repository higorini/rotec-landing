"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-secondary/95 backdrop-blur border-b">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
        <div className="flex items-center justify-between">
          
          <Link
            href="/"
            aria-label="ROTEC Service — página inicial"
            className="flex items-center gap-2 shrink-0"
          >
            <Image
              src="/images/logo.svg"
              alt="ROTEC Service"
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="w-28 sm:w-36 lg:w-44 h-auto object-contain"
            />
          </Link>

          
          <nav className="hidden md:flex items-center gap-8 text-3xl sm:text-4xl font-display">
            <a href="#sobre" className="hover:opacity-80">Sobre</a>
            <a href="#servicos" className="hover:opacity-80">Serviços</a>
            <a href="#equipamento" className="hover:opacity-80">Equipamento</a>
            <a href="#contato" className="hover:opacity-80">Contato</a>
          </nav>

          
          <button
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="md:hidden rounded-full border w-10 h-10 grid place-items-center shadow-[var(--shadow-soft)]"
          >
            <span aria-hidden>≡</span>
          </button>
        </div>
      </div>

      
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/60"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute right-0 top-0 h-[100svh] w-[88%] max-w-xs bg-secondary border-l shadow-[var(--shadow-hover)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-5"
              style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
            >
              <Link
                href="/"
                className="py-4 font-display text-primary tracking-[0.2em]"
                onClick={() => setOpen(false)}
              >
                ROTEC
              </Link>
              <button
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
                className="rounded-full border w-9 h-9 grid place-items-center"
              >
                ✕
              </button>
            </div>

            <nav className="px-5 pb-6 grid gap-4 text-2xl font-display">
              <a href="#sobre" onClick={() => setOpen(false)} className="hover:opacity-80">Sobre</a>
              <a href="#servicos" onClick={() => setOpen(false)} className="hover:opacity-80">Serviços</a>
              <a href="#equipamento" onClick={() => setOpen(false)} className="hover:opacity-80">Equipamento</a>
              <a href="#contato" onClick={() => setOpen(false)} className="hover:opacity-80">Contato</a>
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold bg-primary text-white"
              >
                Solicitar Orçamento
              </a>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
