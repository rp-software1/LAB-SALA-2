import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import "./globals.css";

// ============================================================
// DÍA 6 — Layout Metadata
//
// - title.template: las páginas hijas usan "%s — Sistema de Restaurante"
// - title.default: si una página no define title, usa este
// - robots: no indexar ni seguir (app interna)
// - openGraph / twitter: metadata de redes sociales
// ============================================================
export const metadata: Metadata = {
  title: {
    template: "%s — Sistema de Restaurante",
    default: "Sistema de Restaurante",
  },
  description:
    "Sistema de gestión de mesas, menú y comandas desarrollado con Next.js 15 + TypeScript",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sistema de Restaurante",
    description:
      "Gestión de mesas, menú y comandas en tiempo real para restaurantes.",
    type: "website",
    locale: "es_PE",
    siteName: "Restaurante App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema de Restaurante",
    description:
      "Gestión de mesas, menú y comandas en tiempo real para restaurantes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <NavBar />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
