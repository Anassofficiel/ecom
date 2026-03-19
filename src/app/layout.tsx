import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Electro Manager | Premium Home Appliances & Kitchen Store",
  description: "Découvrez les meilleurs appareils électroménagers chez Electro Manager — Réfrigérateurs, Lave-linge, TV, Fours et plus au Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <Header />
        <main className="min-h-screen pt-[170px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
