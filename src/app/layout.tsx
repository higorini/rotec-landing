import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ROTEC Service — Desentupimento, Hidrojateamento e Auto Vácuo desde 1993",
  description:
    "Soluções em desentupimento, hidrojateamento de alta pressão e auto vácuo. Atendimento residencial, empresarial e industrial com segurança, agilidade e eficiência.",
  openGraph: {
    title: "ROTEC Service — desde 1993",
    description:
      "Desentupimento, hidrojateamento e auto vácuo com equipe técnica qualificada e equipamentos modernos.",
    images: ["/images/hero.jpg"],
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-secondary text-complementary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
