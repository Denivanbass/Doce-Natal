
import type { Metadata } from "next";
import { Roboto, Poppins, Shantell_Sans } from "next/font/google";
import "./globals.css";


import Footer from "../_components/footer";
import Header from "@/_components/Header";

const shantellSans = Shantell_Sans({ variable: '--font-shantell_sans', subsets: ["latin"], weight: ["400", "500"] })

const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["400", "500", "700"], });

const poppins = Poppins({ variable: '--font-pop', weight: ["400", "500", "600", "700"], subsets: ["latin", "latin-ext"], style: ["normal", "italic"] })

export const metadata: Metadata = {
  title: "Catálogo - Doce Natal ",
  description: "Catálogo de sobremesas artesanais de Natal.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} ${poppins.variable} ${shantellSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header/>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
