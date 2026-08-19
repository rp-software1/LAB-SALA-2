import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurante App — Bootcamp RPSoft",
  description:
    "Sistema de gestión de mesas y menú desarrollado con Next.js 15 + TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {/* ── Navbar ─────────────────────────────────────── */}
        <nav className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold text-amber-700">
              🍽️ Restaurante App
            </Link>
            <div className="flex gap-4 text-sm font-medium">
              <Link href="/" className="hover:text-amber-700 transition-colors">
                Inicio
              </Link>
              <Link
                href="/mesas/1"
                className="hover:text-amber-700 transition-colors"
              >
                Mesa #1
              </Link>
              <Link
                href="/mesas/2"
                className="hover:text-amber-700 transition-colors"
              >
                Mesa #2
              </Link>
            </div>
          </div>
        </nav>

        {/* ── Contenido principal ─────────────────────────── */}
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
