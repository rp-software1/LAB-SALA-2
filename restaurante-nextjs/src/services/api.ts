// ============================================================
// src/services/api.ts — Servicio de datos del restaurante
// ============================================================

import { Mesa, MesaResumen, Plato } from "../types";

// ── Base URL configurable ────────────────────────────────────
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// ── Helper: detectar modo mock ───────────────────────────────
export const isMockEnabled = BASE_URL.includes("localhost:3001");

// ── Mock data (simula respuesta de API real) ─────────────────
// Se usa `let` para que el server action pueda mutar el estado en memoria.
const MESAS_MOCK: Mesa[] = [
  {
    id: "1",
    numero: 1,
    capacidad: 4,
    estado: "disponible",
    ubicacion: "Interior - Ventana",
  },
  {
    id: "2",
    numero: 2,
    capacidad: 2,
    estado: "ocupada",
    ubicacion: "Interior - Central",
    pedidoActual: [
      {
        id: "p1",
        nombre: "Lomo saltado",
        precio: 18,
        stock: 5,
        descripcion: "Clásico peruano con papas fritas",
      },
      {
        id: "p2",
        nombre: "Arroz con leche",
        precio: 8,
        stock: 10,
        descripcion: "Postre tradicional",
      },
    ],
  },
  {
    id: "3",
    numero: 3,
    capacidad: 6,
    estado: "reservada",
    ubicacion: "Terraza",
  },
  {
    id: "4",
    numero: 4,
    capacidad: 4,
    estado: "disponible",
    ubicacion: "Interior - Barra",
  },
  {
    id: "5",
    numero: 5,
    capacidad: 8,
    estado: "fuera_servicio",
    ubicacion: "Salón privado",
  },
];

// ── Funciones de servicio ────────────────────────────────────

/**
 * Obtiene todas las mesas (resumen).
 */
export async function getMesas(): Promise<MesaResumen[]> {
  const res = await fetch(`${BASE_URL}/mesas`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Error al obtener mesas: ${res.status}`);
  return res.json();
}

/**
 * Obtiene una mesa por su ID.
 * Maneja 404 con error descriptivo.
 */
export async function getMesaById(id: string): Promise<Mesa> {
  // En desarrollo usamos mock; en producción consume la API real
  if (isMockEnabled) {
    const mesa = MESAS_MOCK.find((m) => m.id === id);
    if (!mesa) throw new Error(`Mesa con ID ${id} no encontrada`);
    return mesa;
  }

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
