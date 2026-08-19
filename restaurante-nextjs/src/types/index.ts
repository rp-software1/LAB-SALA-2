// ============================================================
// src/types/index.ts — Tipos del dominio restaurante
// ============================================================

/** Un plato del menú */
export interface Plato {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  descripcion?: string;
  imagen?: string;
}

/** Estado posible de una mesa */
export type EstadoMesa =
  | "disponible"
  | "ocupada"
  | "reservada"
  | "fuera_servicio";

/** Una mesa del restaurante */
export interface Mesa {
  id: string;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  ubicacion?: string;
  pedidoActual?: Plato[];
}

/** Resumen de mesa para listados */
export interface MesaResumen {
  id: string;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
}
