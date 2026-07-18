import { useState, useEffect } from "react";
import { platosMock } from "../data/platos.mock";

export default function CarritoPage() {
  // Estados
  const [platos, setPlatos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar menú
  useEffect(() => {
    setTimeout(() => {
      setPlatos(platosMock);
      setLoading(false);
    }, 800);
  }, []);

  // Agregar plato
  function agregarPlato(plato) {
    const existe = carrito.find(item => item._id === plato._id);

    if (existe) {
      setCarrito(
        carrito.map(item =>
          item._id === plato._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          ...plato,
          cantidad: 1,
        },
      ]);
    }
  }

  // Quitar plato
  function quitarPlato(id) {
    setCarrito(carrito.filter(item => item._id !== id));
  }

  // Total
  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  if (loading) {
    return <p>Cargando menú...</p>;
  }

  return (
    <div>
      <h2>Armar Comanda</h2>

      <h3>Menú</h3>

      {platos.map(plato => (
        <div key={plato._id}>
          <span>
            {plato.nombre} - S/ {plato.precio}
          </span>

          <button onClick={() => agregarPlato(plato)}>
            Agregar
          </button>
        </div>
      ))}

      <hr />

      <h3>Comanda</h3>

      {carrito.length === 0 ? (
        <p>No hay platos en la comanda.</p>
      ) : (
        carrito.map(item => (
          <div key={item._id}>
            <span>
              {item.nombre} | Cantidad: {item.cantidad} | Subtotal: S/{" "}
              {item.precio * item.cantidad}
            </span>

            <button onClick={() => quitarPlato(item._id)}>
              Quitar
            </button>
          </div>
        ))
      )}

      <hr />

      <h3>Total: S/ {total}</h3>

      <button onClick={() => setCarrito([])}>
        Limpiar comanda
      </button>
    </div>
  );git
}