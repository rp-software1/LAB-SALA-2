// src/pages/CarritoPage.jsx

import { useState, useEffect } from "react";
import { getPlatos } from "../services/api";

export default function CarritoPage() {
  const [platos, setPlatos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarPlatos() {
      try {
        const datos = await getPlatos();
        setPlatos(datos);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el menú.");
      } finally {
        setLoading(false);
      }
    }

    cargarPlatos();
  }, []);

  function agregarPlato(plato) {
    const existe = carrito.find((item) => item._id === plato._id);

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item._id === plato._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...plato, cantidad: 1 }]);
    }
  }

  function quitarPlato(id) {
    setCarrito(carrito.filter((item) => item._id !== id));
  }

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  if (loading) return <h2>Cargando menú...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>🛒 Carrito de Compras</h1>
      <p>Selecciona los platos que deseas pedir.</p>

      <hr />

      <h2>Menú</h2>

      {platos.map((plato) => (
        <div
          key={plato._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <div>
            <strong>{plato.nombre}</strong>
            <br />
            S/ {plato.precio}
          </div>

          <button onClick={() => agregarPlato(plato)}>
            Agregar
          </button>
        </div>
      ))}

      <hr />

      <h2>Pedido</h2>

      {carrito.length === 0 ? (
        <p>No hay productos agregados.</p>
      ) : (
        carrito.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div>
              <strong>{item.nombre}</strong>

              <br />

              Cantidad: {item.cantidad}
            </div>

            <button onClick={() => quitarPlato(item._id)}>
              Quitar
            </button>
          </div>
        ))
      )}

      <hr />

      <h2>Total: S/ {total.toFixed(2)}</h2>

      <button
        onClick={() => setCarrito([])}
        disabled={carrito.length === 0}
      >
        Vaciar carrito
      </button>
    </div>
  );
}