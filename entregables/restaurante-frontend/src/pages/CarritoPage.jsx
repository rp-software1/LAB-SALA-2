import { useState, useEffect } from "react";
import { platosMock } from "../data/platos.mock";

export default function CarritoPage() {
  // Estado del menú
  const [platos, setPlatos] = useState([]);

  // Estado del carrito
  const [carrito, setCarrito] = useState([]);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Cargar el menú al montar el componente
  useEffect(() => {
    setTimeout(() => {
      setPlatos(platosMock);
      setLoading(false);
    }, 800);
  }, []);

  // Agregar un plato al carrito
  function agregarPlato(plato) {
    setCarrito([...carrito, plato]);
  }

  // Quitar un plato del carrito
  function quitarPlato(id) {
    setCarrito(carrito.filter(item => item._id !== id));
  }

  // Mostrar mensaje mientras carga
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
            {plato.nombre} — S/ {plato.precio}
          </span>

          <button onClick={() => agregarPlato(plato)}>
            Agregar
          </button>
        </div>
      ))}

      <hr />

      <h3>Comanda ({carrito.length} ítems)</h3>

      {carrito.length === 0 ? (
        <p>No hay platos en la comanda.</p>
      ) : (
        carrito.map((item, index) => (
          <div key={index}>
            <span>{item.nombre}</span>

            <button onClick={() => quitarPlato(item._id)}>
              Quitar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

