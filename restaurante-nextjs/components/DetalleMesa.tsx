import Link from "next/link";
import type { Mesa } from "@/src/types";

// ── Colores de estado ────────────────────────────────────────
const ESTADO_CONFIG: Record<
  string,
  { bg: string; text: string; label: string; icon: string }
> = {
  disponible: {
    bg: "bg-green-50 border-green-200",
    text: "text-green-700",
    label: "Disponible",
    icon: "✅",
  },
  ocupada: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-700",
    label: "Ocupada",
    icon: "🔴",
  },
  reservada: {
    bg: "bg-yellow-50 border-yellow-200",
    text: "text-yellow-700",
    label: "Reservada",
    icon: "📅",
  },
  mantenimiento: {
    bg: "bg-gray-100 border-gray-300",
    text: "text-gray-600",
    label: "Mantenimiento",
    icon: "🔧",
  },
};

// ── Props ────────────────────────────────────────────────────
interface DetalleMesaProps {
  mesa: Mesa;
}

/**
 * Componente de presentación que muestra el detalle completo de una mesa.
 *
 * DÍA 4 — Se renderiza dentro de un `<Suspense>` manual en la page.
 */
export default function DetalleMesa({ mesa }: DetalleMesaProps) {
  const config = ESTADO_CONFIG[mesa.estado] ?? ESTADO_CONFIG.disponible;

  return (
    <div className="space-y-6">
      {/* ── Encabezado de la mesa ────────────────────────── */}
      <div className={`rounded-xl border-2 p-6 ${config.bg}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${config.text}`}>
              Mesa #{mesa.numero}
            </h2>
            {mesa.ubicacion && (
              <p className="mt-1 text-sm text-gray-500">
                📍 {mesa.ubicacion}
              </p>
            )}
          </div>
          <span
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${config.text}`}
          >
            {config.icon} {config.label}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Capacidad:</span>{" "}
            {mesa.capacidad} personas
          </div>
          <div>
            <span className="font-medium text-gray-700">ID:</span> {mesa.id}
          </div>
        </div>
      </div>

      {/* ── Pedido actual (solo si está ocupada) ──────────── */}
      {mesa.estado === "ocupada" && mesa.pedidoActual && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">🛒 Pedido Actual</h3>
          {mesa.pedidoActual.length === 0 ? (
            <p className="text-sm text-gray-400">
              No hay platos en el pedido.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {mesa.pedidoActual.map((plato) => (
                <li
                  key={plato.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-medium">{plato.nombre}</p>
                    {plato.descripcion && (
                      <p className="text-xs text-gray-400">
                        {plato.descripcion}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold text-amber-700">
                    S/ {plato.precio.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Total */}
          <div className="mt-4 border-t border-gray-200 pt-3 text-right">
            <span className="text-sm text-gray-500">Total: </span>
            <span className="text-lg font-bold text-amber-700">
              S/{" "}
              {mesa.pedidoActual
                .reduce((sum, p) => sum + p.precio, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* ── Volver al inicio ─────────────────────────────── */}
      <Link
        href="/"
        className="inline-block rounded-lg bg-amber-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
      >
        ← Volver a Mesas
      </Link>
    </div>
  );
}
