"use client";

import { useEffect, useMemo, useRef, useState, useCallback, ReactElement } from "react";

type Tab = {
  id: string;
  title: string;
  content: ReactElement;
};

export default function AboutTabs() {
  const [active, setActive] = useState("empresa");

  const TABS: Tab[] = useMemo(
    () => [
      {
        id: "empresa",
        title: "Sobre a Empresa",
        content: (
          <>
            <p className="indent-4 sm:indent-8 lg:indent-16">
              A <strong>ROTEC Service</strong> atua desde <strong>1993</strong> levando
              soluções em <strong>desentupimento</strong>,{" "}
              <strong>hidrojateamento de alta pressão</strong> e{" "}
              <strong>auto vácuo</strong>. Unimos <strong>equipamentos modernos</strong>{" "}
              a uma <strong>equipe técnica qualificada</strong> para atender com{" "}
              <strong>segurança, agilidade e eficiência</strong>.
            </p>
            <p className="indent-4 sm:indent-8 lg:indent-16">
              Atendemos os segmentos <strong>residencial</strong>,{" "}
              <strong>empresarial</strong> e <strong>industrial</strong>, seguindo
              procedimentos padronizados, uso de <strong>EPIs</strong> e{" "}
              <strong>testes finais</strong> antes da liberação do serviço. Nosso
              compromisso é entregar <strong>qualidade com garantia</strong> e minimizar
              paradas ou transtornos no seu dia a dia.
            </p>
            <p className="indent-4 sm:indent-8 lg:indent-16">
              Trabalhamos com diagnóstico claro, orientação técnica e{" "}
              <strong>orçamento transparente</strong>. Se você busca um parceiro de
              confiança para resolver rápido e de forma correta, pode contar com a{" "}
              <strong>ROTEC</strong>.
            </p>
          </>
        ),
      },
      {
        id: "missao",
        title: "Nossa Missão",
        content: (
          <p className="indent-4 sm:indent-8 lg:indent-16">
            Servir indústrias com soluções técnicas confiáveis, seguras e
            ambientalmente responsáveis, cuidando de sistemas essenciais
            que sustentam a operação e garantindo a continuidade dos
            processos produtivos. Atuamos como extensão das empresas
            que atendemos, com <strong>responsabilidade</strong>, <strong>proximidade</strong> e{" "}
            <strong>compromisso com pessoas, processos e resultados</strong>.
          </p>
        ),
      },
      {
        id: "visao",
        title: "Nossa Visão",
        content: (
          <p className="indent-4 sm:indent-8 lg:indent-16">
            Ser referência no atendimento às indústrias <strong>automotiva</strong>,{" "}
            <strong>farmacêutica</strong> e <strong>alimentícia</strong>, reconhecida como parceira
            estratégica que alia excelência técnica, conformidade ambiental
            e uma cultura de cuidado típica de uma empresa familiar, capaz
            de construir <strong>relações sólidas e duradouras</strong>.
          </p>
        ),
      },
      {
        id: "valores",
        title: "Nossos Valores",
        content: (
          <ul className="list-disc list-inside space-y-2 text-left sm:text-justify indent-4 sm:indent-8 lg:indent-16">
            <li>
              <strong>Servir com compromisso:</strong> atuamos como braço direito da
              operação do cliente.
            </li>
            <li>
              <strong>Cuidado com as pessoas:</strong> valorizamos colaboradores,
              parceiros e clientes em relações baseadas em respeito e confiança.
            </li>
            <li>
              <strong>Excelência operacional:</strong> técnica, método e qualidade,
              mesmo nos bastidores.
            </li>
            <li>
              <strong>Segurança sempre:</strong> proteção das pessoas, instalações e
              processos.
            </li>
            <li>
              <strong>Responsabilidade ambiental:</strong> gestão correta de resíduos e
              práticas sustentáveis.
            </li>
            <li>
              <strong>Transparência e ética:</strong> clareza, conformidade e relações
              de longo prazo.
            </li>
          </ul>
        ),
      },
    ],
    []
  );

  const bankRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const setBankRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      bankRefs.current[id] = el;
    },
    []
  );

  useEffect(() => {
    const els = Object.values(bankRefs.current).filter(
      (el): el is HTMLDivElement => !!el
    );
    if (!els.length) return;

    const compute = () => {
      const h = Math.max(...els.map((el) => el.scrollHeight));
      setMaxHeight(h);
    };

    compute();

    const ros = els.map(() => new ResizeObserver(compute));
    ros.forEach((ro, i) => ro.observe(els[i]!));

    const onResize = () => compute();
    window.addEventListener("resize", onResize);

    return () => {
      ros.forEach((ro) => ro.disconnect());
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <section id="sobre" className="py-16 sm:py-20 lg:py-24 bg-white full-bleed">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === tab.id
                  ? "bg-primary text-white shadow-soft"
                  : "bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-100"
              }`}
              aria-pressed={active === tab.id}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl lock-to-max" style={{ minHeight: maxHeight || undefined }}>
          <div className="mx-auto fade-in">
            <h2 className="font-display text-3xl sm:text-4xl text-slate-900 mb-6">
              {activeTab.title.toUpperCase()}
            </h2>

            <div className="text-left sm:text-justify text-complementary leading-relaxed text-xl lg:text-2xl space-y-6">
              {activeTab.content}
            </div>
          </div>

          <div className="measure-bank">
            {TABS.map((tab) => (
              <div key={`bank-${tab.id}`} ref={setBankRef(tab.id)} className="mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl text-slate-900 mb-6">
                  {tab.title.toUpperCase()}
                </h2>
                <div className="text-left sm:text-justify text-complementary leading-relaxed text-xl lg:text-2xl space-y-6">
                  {tab.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <a
            href="#contato"
            className="inline-flex items-center justify-center rounded-2xl px-8 py-4 font-semibold bg-primary text-white hover:opacity-90 active:scale-[0.99] transition shadow-[var(--shadow-soft)]"
          >
            Entre em contato
          </a>
        </div>
      </div>
    </section>
  );
}
