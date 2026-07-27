import axios from "axios";
import { platosMock } from "../data/platos.mock";
import { mesasMock } from "../data/mesas.mock";
import type { Mesa, Plato, Pedido, EstadoPedido } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la petición:", error);
    return Promise.reject(error);
  }
);

// ────────────────────────────
// Platos (mock — backend no disponible)
// ────────────────────────────
export async function getPlatos(): Promise<Plato[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(platosMock as Plato[]), 300);
  });
}

// ────────────────────────────
// Mesas (mock — backend no disponible)
// ────────────────────────────
export async function getMesas(): Promise<Mesa[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mesasMock as Mesa[]), 300);
  });
}

export async function getMesasDisponibles(): Promise<Mesa[]> {
  return new Promise((resolve) => {
    const disponibles = (mesasMock as Mesa[]).filter((mesa) => mesa.estado === "libre");
    setTimeout(() => resolve(disponibles), 300);
  });
}

// ────────────────────────────
// Pedidos (mock — backend no disponible)
// ────────────────────────────
let pedidosMock: Pedido[] = [];
let nextPedidoId = 1;

export async function crearPedido(pedidoData: Partial<Pedido>): Promise<Pedido> {
  return new Promise((resolve) => {
    const nuevoPedido: Pedido = {
      ...pedidoData,
      _id: String(nextPedidoId++),
      estado: "pendiente",
    };
    pedidosMock.push(nuevoPedido);
    setTimeout(() => resolve(nuevoPedido), 300);
  });
}

export async function getPedido(id: string): Promise<Pedido> {
  return new Promise((resolve, reject) => {
    const pedido = pedidosMock.find((p) => p._id === id);
    setTimeout(() => {
      if (pedido) resolve(pedido);
      else reject(new Error("Pedido no encontrado"));
    }, 300);
  });
}

export async function cambiarEstadoPedido(
  id: string,
  estado: EstadoPedido
): Promise<Pedido> {
  return new Promise((resolve, reject) => {
    const pedido = pedidosMock.find((p) => p._id === id);
    if (pedido) pedido.estado = estado;
    setTimeout(() => {
      if (pedido) resolve(pedido);
      else reject(new Error("Pedido no encontrado"));
    }, 300);
  });
}