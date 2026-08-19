import type { Metadata } from "next";
import { getPedidos } from "@/src/services/api";
import type { Pedido, EstadoPedido } from "@/src/types";
import ComandaCard from "./ComandaCard";

export const metadata: Metadata = {
  title: "Comandas — Restaurante",
  description: "Panel de comandas y pedidos activos del restaurante.",
};

// ── Estados que se consideran "activos" ──────────────────────
const ESTADOS_ACTIVOS: ReadonlySet<EstadoPedido> = new Set([
  "pendiente",
  "en_preparacion",
  "lista",
]);

// ── Orden de urgencia (menor índice = más urgente) ───────────
const ORDEN_URGENCIA: Record<EstadoPedido, number> = {
  pendiente: 0,
  en_preparacion: 1,
  lista: 2,
  entregada: 3,
  cerrada: 4,
  cancelada: 5,
};

function compararUrgencia(a: Pedido, b: Pedido): number {
  const diff = ORDEN_URGENCIA[a.estado] - ORDEN_URGENCIA[b.estado];
  if (diff !== 0) return diff;
  // Desempate: el más antiguo primero
  return new Date(a.creadoEn).getTime() - new Date(b.creadoEn).getTime();
}

/**
 * DÍA 5 — Server Component: página de comandas.
 *
 * 1. Fetch de todos los pedidos (server-side).
 * 2. Ordena por urgencia.
 * 3. Divide en "Activas" y "Cerradas".
 */
export default async function ComandasPage() {
  let pedidos: Pedido[] = [];
  let error: string | null = null;

  try {
    pedidos = await getPedidos();
  } catch (err) {
    error = err instanceof Error ? err.message : "Error al cargar pedidos";
  }

  const activos = pedidos
    .filter((p) => ESTADOS_ACTIVOS.has(p.estado))
    .sort(compararUrgencia);

  const cerrados = pedidos
    .filter((p) => !ESTADOS_ACTIVOS.has(p.estado))
    .sort(compararUrgencia);

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">Comandas</h1>

      {/* ── Error ───────────────────────────────────────── */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* ── Activas ─────────────────────────────────────── */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          🔥 Activas ({activos.length})
        </h2>
        {activos.length === 0 ? (
          <p className="text-sm text-gray-400">
            No hay pedidos activos en este momento.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activos.map((pedido) => (
              <ComandaCard key={pedido._id} pedido={pedido} />
            ))}
          </div>
        )}
      </div>

      {/* ── Cerradas ────────────────────────────────────── */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          ✅ Cerradas ({cerrados.length})
        </h2>
        {cerrados.length === 0 ? (
          <p className="text-sm text-gray-400">
            No hay pedidos cerrados aún.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cerrados.map((pedido) => (
              <ComandaCard key={pedido._id} pedido={pedido} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
