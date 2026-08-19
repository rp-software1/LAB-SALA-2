// ===================================================
// src/services/api.ts – Servicio de datos del restaurante
// ===================================================

import type { Mesa, Plato, Pedido } from "../types";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const isMockEnabled = BASE_URL.includes("localhost:3001");

/**
 * Obtiene todas las mesas.
 */
export async function getMesas(): Promise<Mesa[]> {
  const res = await fetch(`${BASE_URL}/mesas`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Error al obtener mesas: ${res.status}`);
  return res.json();
}

/**
 * Obtiene una mesa por su ID.
 */
export async function getMesaById(id: string): Promise<Mesa> {
  const res = await fetch(`${BASE_URL}/mesas/${id}`, { cache: "no-store" });
  if (res.status === 404) {
    throw new Error(`Mesa con ID ${id} no encontrada`);
  }
  if (!res.ok) throw new Error(`Error al obtener mesa: ${res.status}`);
  return res.json();
}

/**
 * Obtiene el menú completo.
 */
export async function getMenu(): Promise<Plato[]> {
  const res = await fetch(`${BASE_URL}/menu`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Error al obtener menú: ${res.status}`);
  return res.json();
}

/**
 * Obtiene todas las comandas / pedidos.
 */
export async function getPedidos(): Promise<Pedido[]> {
  const res = await fetch(`${BASE_URL}/pedidos`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Error al obtener pedidos: ${res.status}`);
  return res.json();
}