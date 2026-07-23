import axios from "axios";
import { platosMock } from "../data/platos.mock";
import { mesasMock } from "../data/mesas.mock";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor de request
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

// Interceptor de response
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
export async function getPlatos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(platosMock), 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.get("/api/platos");
  // return response.data;
}

// ────────────────────────────
// Mesas (mock — backend no disponible)
// ────────────────────────────
export async function getMesas() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mesasMock), 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.get("/api/mesas");
  // return response.data;
}

export async function getMesasDisponibles() {
  return new Promise((resolve) => {
    const disponibles = mesasMock.filter((mesa) => mesa.estado === "libre");
    setTimeout(() => resolve(disponibles), 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.get("/api/mesas?estado=disponible");
  // return response.data;
}

// ────────────────────────────
// Pedidos (mock — backend no disponible)
// ────────────────────────────
let pedidosMock = [];
let nextPedidoId = 1;

export async function crearPedido(pedidoData) {
  return new Promise((resolve) => {
    const nuevoPedido = {
      _id: String(nextPedidoId++),
      ...pedidoData,
      estado: "pendiente",
    };
    pedidosMock.push(nuevoPedido);
    setTimeout(() => resolve(nuevoPedido), 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.post("/api/pedidos", pedidoData);
  // return response.data;
}

export async function getPedido(id) {
  return new Promise((resolve, reject) => {
    const pedido = pedidosMock.find((p) => p._id === id);
    setTimeout(() => {
      if (pedido) resolve(pedido);
      else reject(new Error("Pedido no encontrado"));
    }, 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.get(`/api/pedidos/${id}`);
  // return response.data;
}

export async function cambiarEstadoPedido(id, estado) {
  return new Promise((resolve, reject) => {
    const pedido = pedidosMock.find((p) => p._id === id);
    if (pedido) pedido.estado = estado;
    setTimeout(() => {
      if (pedido) resolve(pedido);
      else reject(new Error("Pedido no encontrado"));
    }, 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await api.patch(`/api/pedidos/${id}/estado`, { estado });
  // return response.data;
}