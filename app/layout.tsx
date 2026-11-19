import type { Metadata } from "next";
import { Roboto, Poppins, Shantell_Sans } from "next/font/google";
import "./globals.css";

import Footer from "../_components/footer";
import Header from "@/_components/Header";

const shantellSans = Shantell_Sans({
  variable: "--font-shantell_sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const poppins = Poppins({
  variable: "--font-pop",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

// Substitua pela URL oficial do seu site em produção
const SITE_URL = process.env.URL as string;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sobremesas Artesanais de Natal no ABC | Encomendas em Diadema e Região",
    template: "%s | Doce Natal - Confeitaria Artesanal ABC",
  },
  description:
    "Encomende sobremesas artesanais para a ceia de Natal no Grande ABC: pudins, mousses e tortas feitas sob encomenda. Retirada em Diadema (Eldorado) ou delivery para Santo André, São Bernardo, São Caetano e região.",
  keywords: [
    "sobremesas de natal abc",
    "encomenda de sobremesas natal diadema",
    "doces de natal santo andré",
    "sobremesas para ceia de natal são bernardo do campo",
    "confeitaria artesanal são caetano do sul",
    "pudim e mousse de natal grande abc",
    "encomenda ceia de natal eldorado diadema",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sobremesas Artesanais de Natal no ABC | Encomendas Abertas",
    description:
      "Pudins, mousses e tortas artesanais para tornar sua ceia inesquecível. Retirada em Diadema ou entrega agendada no Grande ABC.",
    url: SITE_URL,
    siteName: "Doce Natal — Confeitaria Artesanal",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "https://images.unsplash.com/photo-1740385549630-4e31b8019fec?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Sobremesas artesanais de Natal para encomenda no Grande ABC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobremesas Artesanais de Natal no ABC | Encomendas Abertas",
    description:
      "Encomende pudins, mousses e tortas artesanais para a sua ceia de Natal no Grande ABC.",
    images: [
      "https://images.unsplash.com/photo-1740385549630-4e31b8019fec?q=80&w=1200&auto=format&fit=crop",
    ],
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  // Dados estruturados para SEO Local (Google Meu Negócio / Busca Local no ABC)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Doce Natal — Confeitaria Artesanal",
    description:
      "Confeitaria artesanal especializada em sobremesas de Natal sob encomenda, com retirada em Diadema e delivery para todo o Grande ABC.",
    url: SITE_URL,
    telephone: "+55-11-98958-5389",
    priceRange: "$$",
    servesCuisine: "Confeitaria Artesanal, Sobremesas de Natal",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Rio José Afonso, 26",
      addressLocality: "Diadema",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Diadema" },
      { "@type": "City", name: "Santo André" },
      { "@type": "City", name: "São Bernardo do Campo" },
      { "@type": "City", name: "São Caetano do Sul" },
      { "@type": "City", name: "Mauá" },
      { "@type": "City", name: "Ribeirão Pires" },
      { "@type": "City", name: "Rio Grande da Serra" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };

  return (
    <html
      lang="pt-BR"
      className={`${roboto.variable} ${poppins.variable} ${shantellSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}