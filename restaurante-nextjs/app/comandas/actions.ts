"use server";

import { revalidatePath } from "next/cache";
import { BASE_URL } from "@/src/services/api";
import type { EstadoPedido } from "@/src/types";

/**
 * DÍA 5 — Server Action: avanza el estado de un pedido.
 *
 * Secuencia válida: pendiente → en_preparacion → lista → entregada
 *
 * 1. Hace PATCH a la API.
 * 2. Revalida /comandas para que la lista se refresque.
 */
export async function avanzarEstadoPedido(
  pedidoId: string,
  nuevoEstado: EstadoPedido
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/pedidos/${pedidoId}/estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "Error desconocido");
      return { ok: false, error: `PATCH falló (${res.status}): ${text}` };
    }

    revalidatePath("/comandas");
    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error desconocido";
    return { ok: false, error: message };
  }
}
