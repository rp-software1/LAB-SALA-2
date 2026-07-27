import axios from "axios";
import { platosMock } from "../data/platos.mock";
import { mesasMock } from "../data/mesas.mock";

// ────────────────────────────
// Tipos locales (mañana se moverán a types/index.ts)
// ────────────────────────────
type EstadoMesa = "libre" | "ocupada" | "reservada";
type EstadoPedido = "pendiente" | "en_preparacion" | "lista" | "entregada" | "cancelada";

interface Plato {
  _id: string;
  nombre: string;
  precio: number;
}

interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  comensales: number;
}

interface Pedido {
  _id: string;
  estado: EstadoPedido;
  [key: string]: unknown;
}

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
    setTimeout(() => resolve(platosMock), 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.get<Plato[]>("/api/platos");
  // return response.data;
}

// ────────────────────────────
// Mesas (mock — backend no disponible)
// ────────────────────────────
export async function getMesas(): Promise<Mesa[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mesasMock), 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.get<Mesa[]>("/api/mesas");
  // return response.data;
}

export async function getMesasDisponibles(): Promise<Mesa[]> {
  return new Promise((resolve) => {
    const disponibles = mesasMock.filter((mesa) => mesa.estado === "libre");
    setTimeout(() => resolve(disponibles), 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.get<Mesa[]>("/api/mesas?estado=disponible");
  // return response.data;
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

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.post<Pedido>("/api/pedidos", pedidoData);
  // return response.data;
}

export async function getPedido(id: string): Promise<Pedido> {
  return new Promise((resolve, reject) => {
    const pedido = pedidosMock.find((p) => p._id === id);
    setTimeout(() => {
      if (pedido) resolve(pedido);
      else reject(new Error("Pedido no encontrado"));
    }, 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.get<Pedido>(`/api/pedidos/${id}`);
  // return response.data;
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

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.patch<Pedido>(`/api/pedidos/${id}/estado`, { estado });
  // return response.data;
}