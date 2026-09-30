import { buildWhatsHref, CONTACT } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="relative mx-[calc(50%-50vw)] w-screen bg-primary text-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre a ROTEC</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>🏢 Atuando desde 1993</li>
                <li>💧 Desentupimento e Hidrojateamento</li>
                <li>🏭 Atendimento Residencial, Empresarial e Industrial</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href={CONTACT.phoneHref} className="hover:opacity-100 transition-opacity">
                    📞 {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={buildWhatsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 transition-opacity"
                  >
                    💬 {CONTACT.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.emailHref} className="hover:opacity-100 transition-opacity">
                    ✉️ {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>🕐 Seg a Dom: 08h às 18h</li>
                <li>🚨 Emergências: 24 horas</li>
                <li>📍 Grande São Paulo, Barueri e Região</li>
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
