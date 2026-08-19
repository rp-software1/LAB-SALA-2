"use client";

import { useTransition } from "react";
import { avanzarEstadoPedido } from "./actions";
import type { EstadoPedido, Pedido, PedidoItem } from "@/src/types";

// ── Secuencia de avance ──────────────────────────────────────
const SECUENCIA: EstadoPedido[] = [
  "pendiente",
  "en_preparacion",
  "lista",
  "entregada",
];

function siguienteEstado(actual: EstadoPedido): EstadoPedido | null {
  const idx = SECUENCIA.indexOf(actual);
  return idx >= 0 && idx < SECUENCIA.length - 1 ? SECUENCIA[idx + 1] : null;
}

// ── Colores por estado ───────────────────────────────────────
const ESTADO_COLORS: Record<EstadoPedido, string> = {
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
  en_preparacion: "bg-blue-100 text-blue-800 border-blue-300",
  lista: "bg-green-100 text-green-800 border-green-300",
  entregada: "bg-gray-100 text-gray-600 border-gray-300",
  cancelada: "bg-red-100 text-red-700 border-red-300",
  cerrada: "bg-gray-200 text-gray-500 border-gray-400",
};

const ESTADO_LABELS: Record<EstadoPedido, string> = {
  pendiente: "Pendiente",
  en_preparacion: "En preparación",
  lista: "Lista",
  entregada: "Entregada",
  cancelada: "Cancelada",
  cerrada: "Cerrada",
};

const BOTON_COLORS: Record<EstadoPedido, string> = {
  pendiente: "bg-blue-600 hover:bg-blue-700",
  en_preparacion: "bg-green-600 hover:bg-green-700",
  lista: "bg-amber-600 hover:bg-amber-700",
  entregada: "",
  cancelada: "",
  cerrada: "",
};

// ── Props ────────────────────────────────────────────────────
interface ComandaCardProps {
  pedido: Pedido;
}

/**
 * DÍA 5 — Client Component: tarjeta de una comanda.
 *
 * - Muestra resumen de ítems, total, hora.
 * - Botón para avanzar estado según la secuencia.
 * - `useTransition` para no bloquear la UI durante el PATCH.
 */
export default function ComandaCard({ pedido }: ComandaCardProps) {
  const [isPending, startTransition] = useTransition();

  const siguiente = siguienteEstado(pedido.estado);

  function handleAvanzar() {
    if (!siguiente) return;

    startTransition(async () => {
      await avanzarEstadoPedido(pedido._id, siguiente);
    });
  }

  const fecha = new Date(pedido.creadoEn);
  const hora = fecha.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* ── Encabezado ──────────────────────────────────── */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">
            {pedido.tipo === "mesa"
              ? `Mesa #${pedido.mesaId ?? "?"}`
              : "Para llevar"}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">{hora}</span>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${ESTADO_COLORS[pedido.estado]}`}
        >
          {ESTADO_LABELS[pedido.estado]}
        </span>
      </div>

      {/* ── Lista de ítems ──────────────────────────────── */}
      <ul className="mb-3 divide-y divide-gray-100 text-sm">
        {pedido.items.map((item: PedidoItem, idx: number) => (
          <li
            key={`${pedido._id}-item-${idx}`}
            className="flex justify-between py-1.5"
          >
            <span>
              {item.nombre} × {item.cantidad}
            </span>
            <span className="font-medium text-gray-700">
              S/ {(item.precioUnitario * item.cantidad).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      {/* ── Total ───────────────────────────────────────── */}
      <div className="mb-4 flex items-center justify-between border-t border-gray-100 pt-2">
        <span className="text-sm text-gray-500">Total</span>
        <span className="text-lg font-bold text-amber-700">
          S/ {pedido.total.toFixed(2)}
        </span>
      </div>

      {/* ── Botón de avance ─────────────────────────────── */}
      {siguiente && (
        <button
          type="button"
          disabled={isPending}
          onClick={handleAvanzar}
          className={`w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition
            disabled:cursor-not-allowed disabled:opacity-50
            ${BOTON_COLORS[pedido.estado]}`}
        >
          {isPending
            ? "Actualizando..."
            : `Marcar como "${ESTADO_LABELS[siguiente]}"`}
        </button>
      )}
    </div>
  );
}
