"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type LicencaKey = "IBAMA" | "CETESB" | "SABESP";

const LICENCAS: Record<
  LicencaKey,
  { title: string; logo: string; alt: string; resumo: string }
> = {
  IBAMA: {
    title: "IBAMA",
    logo: "/images/licencas/ibama.jpg",
    alt: "Logotipo do IBAMA",
    resumo:
      "O IBAMA é responsável por fiscalizações referentes ao descarte de materiais poluentes que possam trazer danos ao meio ambiente. Somos frequentemente avaliados e sempre aprovados!",
  },
  CETESB: {
    title: "CETESB",
    logo: "/images/licencas/cetesb.jpg",
    alt: "Logotipo da CETESB",
    resumo:
      "A CETESB é o órgão responsável por fiscalizar o papel ambiental da empresa, verificando se o sistema de descarte está regularizado, causando o menor impacto ao meio ambiente.",
  },
  SABESP: {
    title: "SABESP",
    logo: "/images/licencas/sabesp.jpg",
    alt: "Logotipo da SABESP",
    resumo:
      "A SABESP averigua se os efluentes removidos são destinados a tratamento correto, sem impactos ambientais e sociais. A Rotec Desentupidora é constantemente fiscalizada.",
  },
};

export default function SectionLicencas() {
  const [open, setOpen] = useState<LicencaKey | null>(null);

  
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section className="full-bleed isolate overflow-hidden bg-primary text-white">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 lg:py-28">
            
            <div className="flex flex-col items-start justify-center">
                <span className="mb-3 inline-block text-sm font-semibold tracking-widest text-zinc-400">
                    Nosso Compromisso
                </span>
                <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl">
                    Selo de Qualidade <span className="text-teal-300">ROTEC</span>
                </h2>

                <p className="mb-8 max-w-prose text-zinc-300">
                    Trabalhamos com segurança, agilidade e conformidade ambiental. Nosso
                    selo próprio atesta padrão técnico, treinamento contínuo e processos
                    auditáveis do começo ao fim do serviço.
                </p>

                <div className="w-full rounded-2xl p-6">
                    <div className="relative mx-auto aspect-[3/2] w-full max-w-sm">
                    <Image
                        src="/images/selos/PFP.svg"
                        alt="Selo de Qualidade ROTEC"
                        fill
                        className="object-contain drop-shadow-[0_0_30px_rgba(45,212,191,0.25)]"
                        priority
                    />
                    </div>
                </div>
            </div>

            
            <div className="flex flex-col justify-center">
                <span className="mb-3 inline-block text-sm font-semibold tracking-widest text-zinc-400">
                    Nossas Licenças
                </span>
                <h3 className="mb-6 text-2xl font-semibold">Órgãos reguladores</h3>
                <p className="mb-10 max-w-prose text-zinc-300">
                    Somos licenciados por órgãos responsáveis pelo controle, fiscalização,
                    monitoramento e licenciamento de atividades geradoras de poluição.
                </p>

                <ul className="grid grid-cols-3 gap-6 sm:gap-8">
                    {(Object.keys(LICENCAS) as LicencaKey[]).map((key) => (
                        <li key={key} className="group">
                            <button
                            onClick={() => setOpen(key)}
                            className="flex w-full flex-col items-center gap-3 rounded-2xl bg-zinc-900/40 p-5 ring-1 ring-white/10 transition hover:bg-zinc-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                            >
                            <div className="relative aspect-square w-24 sm:w-28">
                                <Image
                                src={LICENCAS[key].logo}
                                alt={LICENCAS[key].alt}
                                fill
                                className="object-contain grayscale contrast-125 brightness-95 transition group-hover:grayscale-0"
                                />
                            </div>
                            <span className="text-sm font-medium tracking-wide text-zinc-200">
                                {LICENCAS[key].title}
                            </span>
                            <span className="text-[11px] uppercase tracking-widest text-zinc-400">
                                Saiba mais
                            </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setOpen(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute top-4 right-4 rounded-full border w-9 h-9 grid place-items-center hover:bg-gray-100 transition"
                aria-label="Fechar"
              >
                ✕
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative aspect-square w-32 mb-6">
                  <Image
                    src={LICENCAS[open].logo}
                    alt={LICENCAS[open].alt}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-3xl font-bold text-zinc-900 mb-4">
                  {LICENCAS[open].title}
                </h3>
                <p className="text-zinc-700 leading-relaxed max-w-xl">
                  {LICENCAS[open].resumo}
                </p>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}
