"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * DÍA 5 — error.tsx para /comandas
 *
 * Error boundary que Next.js renderiza cuando el Server Component
 * de la página lanza una excepción no capturada.
 */
export default function ComandasError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[ComandasPage] Error:", error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-16 text-center">
      <div className="text-6xl">💥</div>

      <h2 className="text-2xl font-bold text-gray-900">
        No se pudieron cargar las comandas
      </h2>

      <p className="max-w-md text-gray-500">
        Ocurrió un error al obtener los pedidos. Por favor intenta de nuevo.
      </p>

      {error.digest && (
        <p className="rounded-lg bg-gray-100 px-4 py-2 font-mono text-xs text-gray-400">
          Error ID: {error.digest}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-amber-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
