import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const alexandria = localFont({
  src: [
    { path: "./fonts/alexandria.woff2", weight: "400", style: "normal" },
    { path: "./fonts/alexandria.woff2", weight: "600", style: "normal" },
    { path: "./fonts/alexandria.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-alexandria",
  display: "swap",
});

const bebasNeue = localFont({
  src: "./fonts/bebas-neue-400.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-bebas-neue",
  display: "swap",
});

const karantina = localFont({
  src: [
    { path: "./fonts/karantina-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/karantina-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/karantina-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-karantina",
  display: "swap",
});

const GTM_ID = "GTM-MKWC6JHW";

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
        url: "/images/og.jpg",
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
    images: ["/images/og.jpg"],
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
    { rel: "apple-touch-icon", url: "/images/apple-touch-icon.png", sizes: "180x180" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${alexandria.variable} ${bebasNeue.variable} ${karantina.variable}`}>
      <GoogleTagManager gtmId={GTM_ID} />
      <head>
        <StructuredData />
      </head>
      <body className="bg-secondary text-complementary font-body antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
