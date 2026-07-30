// src/pages/MenuPage.tsx
import { useState, useEffect } from "react";
import type { Plato } from "../types";
import { getPlatos } from "../services/api";
import { usePedido } from "../context/PedidoContext";

export default function MenuPage() {
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");

  const { pedido, agregarPlato } = usePedido();

  const totalItems = pedido.items.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  useEffect(() => {
    const cargarMenu = async (): Promise<void> => {
      try {
        const data: Plato[] = await getPlatos();
        setPlatos(data);
      } catch (err: unknown) {
        console.error(err);
        setError("No se pudo cargar el menú.");
      } finally {
        setLoading(false);
      }
    };

    cargarMenu();
  }, []);

  const platosFiltrados = platos.filter((plato: Plato) =>
    plato.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return <p>Cargando menú...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Carta del Restaurante</h1>

      <p>Estos son los platos disponibles para nuestros clientes.</p>

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
          platosFiltrados.map((plato: Plato) => (
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