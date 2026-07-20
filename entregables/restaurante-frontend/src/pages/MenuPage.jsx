import { useState, useEffect } from "react";
import { getPlatos } from "../services/api";
import PlatoCard from "../components/PlatoCard";

export default function MenuPage() {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarMenu() {
      try {
        setLoading(true);
        const data = await getPlatos();
        setPlatos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarMenu();
  }, []);

  if (loading) return <p>Cargando el menú del restaurante...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2>Menú del Restaurante</h2>

      {platos.map((plato) => (
        <PlatoCard
          key={plato._id}
          nombre={plato.nombre}
          categoria={plato.categoria}
          precio={plato.precio}
          stock={plato.stock}
          disponible={plato.disponible}
        />
      ))}
    </section>
  );
}
