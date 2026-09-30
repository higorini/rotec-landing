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
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <About />
        <Services />
        <FAQSection />
        <EquipmentSection />
        <ClientsSection />
        <SectionLicencas />
        <SectionContato />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
