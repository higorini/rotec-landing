export const revalidate = 3600;

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services/ServicesSection";
import FAQSection from "@/components/FAQ/FAQSection";
import EquipmentSection from "@/components/Gallery/EquipmentSection";
import ClientsSection from "@/components/Clients/ClientsSection";
import SectionLicencas from "@/components/SectionLicencas";
import SectionContato from "@/components/SectionContato";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <About />

        <section id="servicos" className="">
          <div className="space-y-16">
            <Services />
          </div>
        </section>

        <section id="faq" className="">
          <FAQSection />
        </section>

        <section id="galeria" className="">
          <EquipmentSection />
        </section>

        <section id="clientes" className="">
          <ClientsSection />
        </section>

        <section id="licencas" className="">
          <SectionLicencas />
        </section>

        <section id="contato" className="">
          <SectionContato
            phone="(11) 3815-6720"
            whatsapp="5511987654321"
            email="atendimento@rotec.com.br"
            socials={[
              { name: "Instagram", href: "https:" },
              { name: "Facebook", href: "https:" }
            ]}
            whatsMessage="Olá! Vim pelo site da ROTEC e gostaria de um orçamento."
            pepeSrc="/images/mascotes/pepe.svg"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
