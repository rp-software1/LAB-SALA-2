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

/** Estado posible de una comanda / pedido */
export type EstadoPedido =
  | "pendiente"
  | "en_preparacion"
  | "lista"
  | "entregada"
  | "cancelada"
  | "cerrada";

/** Ítem dentro de una comanda */
export interface PedidoItem {
  platoId: string;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
}

/** Una comanda / pedido del restaurante */
export interface Pedido {
  _id: string;
  mesaId?: number;
  tipo: "mesa" | "para_llevar";
  estado: EstadoPedido;
  items: PedidoItem[];
  total: number;
  creadoEn: string;
}