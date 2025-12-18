export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.rotecservice.com.br/#organization",
        "name": "ROTEC Service",
        "alternateName": "ROTEC",
        "url": "https://www.rotecservice.com.br",
        "logo": "https://www.rotecservice.com.br/images/hero.jpg",
        "image": "https://www.rotecservice.com.br/images/hero.jpg",
        "description": "Soluções em desentupimento, hidrojateamento de alta pressão e auto vácuo. Atendimento residencial, empresarial e industrial com segurança, agilidade e eficiência em Barueri e Grande São Paulo.",
        "telephone": "+55-11-4195-9000",
        "email": "rotec@rotecservice.com.br",
        "foundingDate": "1993",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Barueri",
          "addressRegion": "SP",
          "addressCountry": "BR"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Barueri"
          },
          {
            "@type": "City",
            "name": "São Paulo"
          },
          {
            "@type": "Place",
            "name": "Grande São Paulo"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/rotecservice/",
          "https://www.linkedin.com/company/rotecservice/"
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.rotecservice.com.br/#service",
        "serviceType": "Desentupimento e Hidrojateamento",
        "provider": {
          "@id": "https://www.rotecservice.com.br/#organization"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Grande São Paulo, Barueri e Região"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Serviços de Desentupimento",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Desentupimento Residencial"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Desentupimento Empresarial"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Desentupimento Industrial"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hidrojateamento de Alta Pressão"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Auto Vácuo"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.rotecservice.com.br/#website",
        "url": "https://www.rotecservice.com.br",
        "name": "ROTEC Service",
        "description": "Desentupimento, Hidrojateamento e Auto Vácuo desde 1993",
        "publisher": {
          "@id": "https://www.rotecservice.com.br/#organization"
        },
        "inLanguage": "pt-BR"
      },
      {
        "@type": "WebPage",
        "@id": "https://www.rotecservice.com.br/#webpage",
        "url": "https://www.rotecservice.com.br",
        "name": "ROTEC Service — Desentupimento, Hidrojateamento e Auto Vácuo desde 1993",
        "isPartOf": {
          "@id": "https://www.rotecservice.com.br/#website"
        },
        "about": {
          "@id": "https://www.rotecservice.com.br/#organization"
        },
        "description": "Soluções em desentupimento, hidrojateamento de alta pressão e auto vácuo. Atendimento residencial, empresarial e industrial com segurança, agilidade e eficiência em Barueri e Grande São Paulo.",
        "inLanguage": "pt-BR"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
