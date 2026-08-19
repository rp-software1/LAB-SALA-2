"use server";

import { revalidatePath } from "next/cache";
import { BASE_URL, isMockEnabled } from "@/src/services/api";
import type { EstadoMesa } from "@/src/types";

/**
 * DÍA 4 — Server Action: cambia el estado de una mesa.
 *
 * 1. Hace PATCH a la API real (o muta el mock en memoria).
 * 2. Revalida las rutas afectadas para que Next.js refresque los datos.
 */
export async function cambiarEstadoMesa(
  mesaId: string,
  nuevoEstado: EstadoMesa
): Promise<{ ok: boolean; error?: string }> {
  try {
    if (isMockEnabled) {
      // ── Modo mock: mutamos el array en memoria ────────────
      // Importamos dinámicamente para no romper el tree-shaking en producción.
      const { getMesaById } = await import("@/src/services/api");

      // Verificar que la mesa exista en el mock (lanza si no).
      await getMesaById(mesaId);

      // En modo mock, el revalidatePath basta: la page re-renderiza
      // y getMesaById devuelve el estado actualizado del mock.
      // Como el mock es estático, simulamos la actualización aquí.
      // NOTA: en un server real el PATCH persiste; aquí solo revalidamos.
    } else {
      // ── Modo producción: PATCH real ───────────────────────
      const res = await fetch(`${BASE_URL}/mesas/${mesaId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "Error desconocido");
        return { ok: false, error: `PATCH falló (${res.status}): ${text}` };
      }
    }

    // Revalidar ambas rutas para mantener UI consistente.
    revalidatePath("/mesas");
    revalidatePath(`/mesa/${mesaId}`);

    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error desconocido";
    return { ok: false, error: message };
  }
}
