import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

/**
 * DÍA 6 — /not-found — Página 404 global de Next.js.
 *
 * Next.js muestra este componente cuando ninguna ruta coincide.
 * El title se renderiza como "Página no encontrada — Sistema de Restaurante"
 * gracias al title.template del layout.
 */
export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="text-7xl">🔍</div>

      <div>
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-lg text-gray-500">Página no encontrada</p>
      </div>

      <p className="max-w-md text-sm text-gray-400">
        La página que buscas no existe o fue movida a otra dirección.
      </p>

      <Link
        href="/"
        className="rounded-lg bg-amber-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-amber-700"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
