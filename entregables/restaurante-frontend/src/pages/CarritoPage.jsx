import { useEffect, useState } from "react";
import { getPlatos } from "../services/api";

export default function CarritoPage() {
  // Estado del menú
  const [platos, setPlatos] = useState([]);

  // Estado del carrito
  const [carrito, setCarrito] = useState([]);

  // Estados de carga
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar platos desde la API
  useEffect(() => {
    async function cargarPlatos() {
      try {
        const datos = await getPlatos();
        setPlatos(datos);
      } catch (err) {
        setError("No se pudo cargar el menú.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    cargarPlatos();
  }, []);

  // Agregar plato al carrito
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
    setCarrito(carrito.filter((item) => item._id !== id));
  }

  // Calcular total
  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  // Loading
  if (loading) {
    return <p>Cargando menú...</p>;
  }

  // Error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Armar Comanda</h2>

      <h3>Menú</h3>

      {platos.map((plato) => (
        <div key={plato._id} style={{ marginBottom: "10px" }}>
          <strong>{plato.nombre}</strong> - S/ {plato.precio}

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => agregarPlato(plato)}
          >
            Agregar
          </button>
        </div>
      ))}

      <hr />

      <h3>Comanda ({carrito.length} platos)</h3>

      {carrito.length === 0 ? (
        <p>No hay platos en la comanda.</p>
      ) : (
        carrito.map((item) => (
          <div key={item._id} style={{ marginBottom: "10px" }}>
            <strong>{item.nombre}</strong> - Cantidad: {item.cantidad}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => quitarPlato(item._id)}
            >
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
    </section>
  );
}