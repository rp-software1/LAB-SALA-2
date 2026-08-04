// src/types/index.ts
// Archivo central de tipos del restaurante-frontend
// Todos los tipos se exportan desde aquí — no declarar en otros archivos

// ─── Union types de estados ─────────────────────────────────────────────
export type EstadoMesa = 'libre' | 'ocupada' | 'reservada';

export type TipoPedido = 'mesa' | 'para_llevar';

export type EstadoPedido =
  'pendiente' | 'en_preparacion' | 'lista' | 'entregada' | 'cancelada';

// ─── Interfaces de entidades ────────────────────────────────────────────
export interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  comensales: number;
}

export interface Plato {
  _id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria?: string;
  disponible?: boolean;
  stock?: number;
}

export interface ItemPedido {
  platoId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Pedido {
  _id: string;
  estado: EstadoPedido;
  [key: string]: unknown;
}

// ─── Tipos del Context (para el Bloque C) ──────────────────────────────
export interface EstadoPedidoContext {
  mesaId: string | null;
  tipo: TipoPedido;
  estado: EstadoPedido;
  items: ItemPedido[];
  total: number;
}

export interface PedidoContextType {
  pedido: EstadoPedidoContext;
  agregarPlato: (plato: Plato) => void;
  quitarPlato: (platoId: string) => void;
  cambiarTipo: (tipo: TipoPedido) => void;
  asignarMesa: (mesaId: string) => void;
  limpiarPedido: () => void;
}