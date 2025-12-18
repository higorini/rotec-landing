import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "ROTEC Service — Desentupimento, Hidrojateamento e Auto Vácuo desde 1993",
  description:
    "Soluções em desentupimento, hidrojateamento de alta pressão e auto vácuo. Atendimento residencial, empresarial e industrial com segurança, agilidade e eficiência em Barueri e Grande São Paulo.",
  keywords: [
    "desentupimento",
    "hidrojateamento",
    "auto vácuo",
    "desentupidora",
    "desentupimento Barueri",
    "desentupimento São Paulo",
    "hidrojateamento alta pressão",
    "limpeza de esgoto",
    "desentupimento residencial",
    "desentupimento empresarial",
    "desentupimento industrial",
    "emergência 24 horas",
    "ROTEC Service",
    "desentupidora Barueri",
    "desentupidora Grande São Paulo",
  ],
  authors: [{ name: "ROTEC Service" }],
  creator: "ROTEC Service",
  publisher: "ROTEC Service",
  metadataBase: new URL("https://www.rotecservice.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ROTEC Service — Desentupimento e Hidrojateamento desde 1993",
    description:
      "Desentupimento, hidrojateamento e auto vácuo com equipe técnica qualificada e equipamentos modernos. Atendimento em Barueri e Grande São Paulo.",
    url: "https://www.rotecservice.com.br",
    siteName: "ROTEC Service",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "ROTEC Service - Desentupimento e Hidrojateamento",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROTEC Service — Desentupimento e Hidrojateamento desde 1993",
    description:
      "Soluções em desentupimento, hidrojateamento de alta pressão e auto vácuo em Barueri e Grande São Paulo.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/favicon.ico" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <StructuredData />
      </head>
      <body className="bg-secondary text-complementary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
