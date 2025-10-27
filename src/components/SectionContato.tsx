"use client";

import Image from "next/image";

type Social = { name: string; href: string };
type Props = {
  title?: string;
  subtitle?: string;
  phone?: string;          // formato livre para exibir
  whatsapp?: string;       // só dígitos com DDI+DDD, ex: 5511987654321
  email?: string;
  socials?: Social[];
  whatsMessage?: string;   // mensagem pré-preenchida
  pepeSrc?: string;        // caminho do SVG
};

export default function SectionContato({
  title = "Ficou com alguma dúvida? Fale conosco!",
  subtitle = "Entre em contato pelo WhatsApp ou, se preferir, envie um e-mail.",
  phone = "(11) 3815-6720",
  whatsapp = "5511987654321",
  email = "contato@seudominio.com.br",
  socials = [{ name: "Instagram", href: "https://instagram.com/seu_perfil" }],
  whatsMessage = "Olá! Vim pelo site e gostaria de um orçamento.",
  pepeSrc = "/images/mascotes/pepe.svg",
}: Props) {
  const whatsHref = buildWhatsHref(whatsapp, whatsMessage);

  return (
    <section className="full-bleed bg-white">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-stretch gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="flex flex-col justify-center">
          <h2 className="max-w-2xl font-serif text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
            {formatTitle(title)}
          </h2>

          <p className="mt-6 max-w-xl text-zinc-600">{subtitle}</p>
          <div className="mt-8">
            <a
              href={whatsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40"
            >
              <WhatsappIcon className="h-5 w-5" />
              Seja atendido no WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-4 text-zinc-700">
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-zinc-500" />
              <a href={`tel:${onlyDigits(phone)}`} className="hover:underline">
                {phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <MailIcon className="h-5 w-5 text-zinc-500" />
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </div>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-sm font-semibold tracking-wide text-zinc-500">
              Siga-nos
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white shadow-sm transition hover:scale-105"
                  aria-label={s.name}
                  title={s.name}
                >
                  <InstagramIcon className="h-5 w-5 text-zinc-800" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
            <div className="h-full w-full max-w-[640px]">
                <div className="relative h-full w-full">
                    <Image
                        src={pepeSrc}
                        alt="Mascote da empresa, Pepe"
                        fill
                        className="object-contain"
                        priority
                        sizes="(min-width: 1024px) 640px, 90vw"
                    />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

function buildWhatsHref(digits: string, msg: string) {
  const q = encodeURIComponent(msg);
  return `https://wa.me/${onlyDigits(digits)}?text=${q}`;
}
function onlyDigits(s: string) {
  return (s.match(/\d/g) || []).join("");
}
function formatTitle(t: string) {
  return (
    <>
      {t.replace(/\s+Fale\s+Conosco!?/i, "")}
      <span className="block text-teal-600">
        {((t.match(/Fale\s+Conosco!?/i) || [])[0] as string) ?? ""}
      </span>
    </>
  );
}

function WhatsappIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.47A11.77 11.77 0 0 0 12 1 11 11 0 0 0 1 12.02a10.9 10.9 0 0 0 1.6 5.73L1 23l5.4-1.56A10.95 10.95 0 0 0 12 23h.01A11 11 0 0 0 23 12a11.1 11.1 0 0 0-2.48-8.53ZM12 21a9.1 9.1 0 0 1-4.65-1.26l-.33-.2-3.21.93.92-3.13-.21-.33A9.09 9.09 0 1 1 12 21Zm5.17-6.86c-.28-.14-1.66-.82-1.92-.91s-.45-.14-.64.14-.73.91-.9 1.1-.33.21-.61.07a7.43 7.43 0 0 1-2.17-1.34 8.15 8.15 0 0 1-1.5-1.86c-.16-.28 0-.43.12-.57l.35-.41c.12-.14.16-.24.24-.41s.04-.31-.02-.43c-.07-.14-.64-1.55-.87-2.12s-.46-.49-.64-.5h-.55a1.05 1.05 0 0 0-.76.36 3.21 3.21 0 0 0-1 2.39 5.57 5.57 0 0 0 1.2 2.97 12.7 12.7 0 0 0 4.87 4.68c.68.29 1.22.46 1.64.59a3.95 3.95 0 0 0 1.8.11 2.93 2.93 0 0 0 1.94-1.37 2.31 2.31 0 0 0 .16-1.37c-.06-.11-.25-.18-.53-.32Z"/>
    </svg>
  );
}
function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79a15.09 15.09 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.02l-2.2 2.2Z"/>
    </svg>
  );
}
function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/>
    </svg>
  );
}
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-.75a1.25 1.25 0 1 1 1.25-1.25 1.25 1.25 0 0 1-1.25 1.25Z"/>
    </svg>
  );
}
