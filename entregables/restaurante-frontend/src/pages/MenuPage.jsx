import { useState, useEffect } from "react";
import { getPlatos } from "../services/api";
import { usePedido } from "../context/PedidoContext";

export default function MenuPage() {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const { pedido, agregarPlato } = usePedido();

  const totalItems = pedido.items.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  useEffect(() => {
    async function cargarMenu() {
      try {
        const data = await getPlatos();
        setPlatos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el menú.");
      } finally {
        setLoading(false);
      }
    }
    cargarMenu();
  }, []);

  const platosFiltrados = platos.filter((plato) =>
    plato.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container">
        <h2>Cargando menú...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Carta del Restaurante</h1>
      <p className="subtitle">
        Estos son los platos disponibles para nuestros clientes.
      </p>

      <input
        type="text"
        placeholder="Buscar un plato..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "25px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <div className="grid">
        {platosFiltrados.length > 0 ? (
          platosFiltrados.map((plato) => (
            <div className="card" key={plato._id}>
              <h2>{plato.nombre}</h2>
              <p>
                <strong>Precio:</strong> S/ {plato.precio}
              </p>
              {plato.descripcion && <p>{plato.descripcion}</p>}
              {plato.stock !== undefined && (
                <p>
                  <strong>Stock:</strong> {plato.stock}
                </p>
              )}
              <button className="btn" onClick={() => agregarPlato(plato)}>
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron platos que coincidan con la búsqueda.</p>
        )}
      </div>

      {totalItems > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#facc15",
            color: "#000",
            padding: "12px 20px",
            borderRadius: "30px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,.3)",
          }}
        >
          🍽 Comanda: {totalItems} items
        </div>
      )}
    </div>
  );
}
