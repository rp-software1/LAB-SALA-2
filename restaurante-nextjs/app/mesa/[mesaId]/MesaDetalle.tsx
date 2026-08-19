"use client";

import { useState, useTransition } from "react";
import { cambiarEstadoMesa } from "./actions";
import type { EstadoMesa } from "@/src/types";

// ── Configuración visual de cada estado ──────────────────────
const ESTADO_CONFIG: Record<
  EstadoMesa,
  { bg: string; activeBg: string; label: string; icon: string }
> = {
  disponible: {
    bg: "border-green-300 text-green-700 hover:bg-green-50",
    activeBg: "bg-green-600 border-green-600 text-white",
    label: "Disponible",
    icon: "✅",
  },
  ocupada: {
    bg: "border-red-300 text-red-700 hover:bg-red-50",
    activeBg: "bg-red-600 border-red-600 text-white",
    label: "Ocupada",
    icon: "🔴",
  },
  reservada: {
    bg: "border-yellow-300 text-yellow-700 hover:bg-yellow-50",
    activeBg: "bg-yellow-500 border-yellow-500 text-white",
    label: "Reservada",
    icon: "📅",
  },
  fuera_servicio: {
    bg: "border-gray-300 text-gray-600 hover:bg-gray-50",
    activeBg: "bg-gray-600 border-gray-600 text-white",
    label: "Fuera de servicio",
    icon: "🔧",
  },
};

const ESTADOS: EstadoMesa[] = [
  "disponible",
  "ocupada",
  "reservada",
  "fuera_servicio",
];

// ── Props ────────────────────────────────────────────────────
interface MesaDetalleProps {
  id: string;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  ubicacion?: string;
}

/**
 * DÍA 4 — Componente CLIENT con `useState` + `useTransition`.
 *
 * Muestra el detalle de la mesa y 4 botones para cambiar su estado.
 * Cada botón invoca la server action `cambiarEstadoMesa` dentro de
 * un `startTransition` para no bloquear la UI.
 */
export default function MesaDetalle({
  id,
  numero,
  capacidad,
  estado: initialEstado,
  ubicacion,
}: MesaDetalleProps) {
  const [estado, setEstado] = useState<EstadoMesa>(initialEstado);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleCambiarEstado(nuevoEstado: EstadoMesa) {
    setError(null);

    startTransition(async () => {
      const result = await cambiarEstadoMesa(id, nuevoEstado);

      if (result.ok) {
        setEstado(nuevoEstado);
      } else {
        setError(result.error ?? "No se pudo cambiar el estado");
      }
    });
  }

  const config = ESTADO_CONFIG[estado];

  return (
    <div className="space-y-6">
      {/* ── Info de la mesa ─────────────────────────────── */}
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Mesa #{numero}
            </h2>
            {ubicacion && (
              <p className="mt-1 text-sm text-gray-500">📍 {ubicacion}</p>
            )}
          </div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${config.activeBg}`}
          >
            {config.icon} {config.label}
          </span>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <span className="font-medium">Capacidad:</span> {capacidad} personas
        </div>
      </div>

      {/* ── Botones de estado ───────────────────────────── */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">
          Cambiar estado de la mesa
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ESTADOS.map((est) => {
            const btn = ESTADO_CONFIG[est];
            const isActive = est === estado;

            return (
              <button
                key={est}
                type="button"
                disabled={isPending || isActive}
                onClick={() => handleCambiarEstado(est)}
                className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition
                  disabled:cursor-not-allowed disabled:opacity-50
                  ${isActive ? btn.activeBg : btn.bg}`}
              >
                {btn.icon} {btn.label}
              </button>
            );
          })}
        </div>

        {/* Indicador de pending */}
        {isPending && (
          <p className="mt-3 text-sm text-gray-400 animate-pulse">
            Actualizando estado...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* ── Info técnica (Día 4 reference) ──────────────── */}
      <div className="rounded-lg bg-gray-100 p-4 text-xs text-gray-500">
        <p>
          <strong>Día 4:</strong> This component uses{" "}
          <code>useState</code> + <code>useTransition</code> to call a{" "}
          <code>Server Action</code> without blocking the UI.
        </p>
      </div>
    </div>
  );
}
