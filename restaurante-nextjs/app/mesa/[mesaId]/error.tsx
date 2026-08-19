"use client";

import { useEffect } from "react";
import Link from "next/link";

// ── Props del error boundary (Next.js los proporciona) ───────
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * DÍA 4 — error.tsx ('use client')
 *
 * Error boundary que Next.js renderiza cuando el Server Component
 * de la página lanza una excepción no capturada.
 *
 * Recibe:
 * - `error`: el objeto Error lanzado
 * - `reset`: función para re-intentar el render
 */
export default function MesaError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log del error para debugging / monitoring
    console.error("[MesaPage] Error:", error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-16 text-center">
      {/* Icono */}
      <div className="text-6xl">💥</div>

      {/* Título */}
      <h2 className="text-2xl font-bold text-gray-900">
        Algo salió mal
      </h2>

      {/* Descripción */}
      <p className="max-w-md text-gray-500">
        No se pudo cargar el detalle de la mesa. Por favor intenta de nuevo.
      </p>

      {/* Digest (útil para debugging en producción) */}
      {error.digest && (
        <p className="rounded-lg bg-gray-100 px-4 py-2 font-mono text-xs text-gray-400">
          Error ID: {error.digest}
        </p>
      )}

      {/* Acciones */}
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
