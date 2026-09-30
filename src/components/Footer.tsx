import { Building2, Clock, Droplets, Factory, Mail, MapPin, MessageCircle, Phone, Siren } from "lucide-react";
import { buildWhatsHref, CONTACT } from "@/lib/contact";

const ICON = "h-4 w-4 shrink-0";

export default function Footer() {
  return (
    <footer className="relative mx-[calc(50%-50vw)] w-screen bg-primary text-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre a ROTEC</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><Building2 aria-hidden className={ICON} />Atuando desde 1993</li>
                <li className="flex items-center gap-2"><Droplets aria-hidden className={ICON} />Desentupimento e Hidrojateamento</li>
                <li className="flex items-center gap-2"><Factory aria-hidden className={ICON} />Atendimento Residencial, Empresarial e Industrial</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 hover:opacity-100 transition-opacity">
                    <Phone aria-hidden className={ICON} />{CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={buildWhatsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:opacity-100 transition-opacity"
                  >
                    <MessageCircle aria-hidden className={ICON} />{CONTACT.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.emailHref} className="inline-flex items-center gap-2 hover:opacity-100 transition-opacity">
                    <Mail aria-hidden className={ICON} />{CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><Clock aria-hidden className={ICON} />Seg a Dom: 08h às 18h</li>
                <li className="flex items-center gap-2"><Siren aria-hidden className={ICON} />Emergências: 24 horas</li>
                <li className="flex items-center gap-2"><MapPin aria-hidden className={ICON} />Grande São Paulo, Barueri e Região</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary/20 text-center text-sm opacity-90">
          <p>Todos os direitos reservados. ROTEC Service © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
