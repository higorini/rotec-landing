"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { buildWhatsHref, CONTACT, onlyDigits, type Social } from "@/lib/contact";

type Props = {
  title?: string;
  subtitle?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  socials?: Social[];
  whatsMessage?: string;
  pepeSrc?: string;
};

export default function SectionContato({
  title = "Ficou com alguma dúvida? Fale conosco!",
  subtitle = "Entre em contato pelo WhatsApp ou, se preferir, envie um e-mail.",
  phone = CONTACT.phone,
  whatsapp = CONTACT.whatsapp,
  email = CONTACT.email,
  socials = CONTACT.socials,
  whatsMessage = CONTACT.whatsappMessage,
  pepeSrc = "/images/mascotes/pepe.svg",
}: Props) {
  const whatsHref = buildWhatsHref(whatsMessage, whatsapp);

  return (
    <section id="contato" className="full-bleed bg-white">
      <div className="container mx-auto grid grid-cols-1 items-stretch gap-12 px-4 sm:px-6 lg:px-8 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="flex flex-col justify-center">
          <h2 className="max-w-2xl font-body text-3xl font-bold leading-tight text-complementary sm:text-4xl">
            {formatTitle(title)}
          </h2>
          <p className="mt-6 max-w-xl text-gray-600">{subtitle}</p>
          <div className="mt-8">
            <a href={whatsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl bg-[var(--color-success)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-success)]/40">
              <Image src="/images/redes/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="h-5 w-5 brightness-0 invert" />
              Seja atendido no WhatsApp
            </a>
          </div>
          <div className="mt-8 flex flex-col gap-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <a href={`tel:+55${onlyDigits(phone)}`} className="hover:underline">{phone}</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <a href={`mailto:${email}`} className="hover:underline">{email}</a>
            </div>
          </div>
          <div className="mt-10">
            <p className="mb-3 text-sm font-semibold tracking-wide text-gray-500">Siga-nos</p>
            <div className="flex items-center gap-3">
              {socials.map((social, index) => {
                if (!social.iconPath) return null;
                return (
                  <a key={`${social.name}-${index}`} href={social.href} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:scale-105" aria-label={social.name} title={social.name}>
                    <Image src={social.iconPath} alt={`Ícone ${social.name}`} width={20} height={20} className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative h-[400px] w-full max-w-[500px] lg:h-[500px] lg:max-w-[640px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[100%] w-[100%] bg-white" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
            </div>
            <Image src={pepeSrc} alt="Mascote da empresa, Pepe" fill className="relative z-10 object-contain drop-shadow-2xl" priority sizes="(min-width: 1024px) 640px, 90vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

function formatTitle(t: string) {
  return (
    <>
      {t.replace(/\s+Fale\s+Conosco!?/i, "")}
      <span className="block text-[var(--color-accent)]">
        {((t.match(/Fale\s+Conosco!?/i) || [])[0] as string) ?? ""}
      </span>
    </>
  );
}