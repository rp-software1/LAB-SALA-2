import { useState, useEffect } from "react";
import { getPlatos } from "../services/api";

export default function MenuPage() {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // 1. Carga de datos al montar el componente
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

  // 2. Estado derivado: filtrado dinámico según la búsqueda
  const platosFiltrados = platos.filter((plato) =>
    plato.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 3. Estados de carga y error
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

  // 4. Renderizado principal
  return (
    <div className="container">
      <h1 className="title">Carta del Restaurante</h1>
      <p className="subtitle">
        Estos son los platos disponibles para nuestros clientes.
      </p>

      {/* Input de búsqueda */}
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

      {/* Grilla de platos filtrados */}
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

              <button className="btn">Agregar al carrito</button>
            </div>
          ))
        ) : (
          <p>No se encontraron platos que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
}