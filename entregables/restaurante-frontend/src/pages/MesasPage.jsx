import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMesas } from "../services/api";
import { usePedido } from "../context/PedidoContext";

export default function MesasPage() {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { asignarMesa } = usePedido();
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarMesas() {
      try {
        setLoading(true);
        const data = await getMesas();
        setMesas(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las mesas.");
      } finally {
        setLoading(false);
      }
    }
    cargarMesas();
  }, []);

  if (loading) {
    return <p>Cargando mesas...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Mesas del Restaurante</h1>
      <section>
        {mesas.map((mesa) => (
          <div
            key={mesa.id}
            style={{
              background:
                mesa.estado === "libre"
                  ? "green"
                  : mesa.estado === "ocupada"
                  ? "red"
                  : "orange",
              color: "white",
              padding: "15px",
              margin: "10px",
              borderRadius: "8px",
              width: "220px",
            }}
          >
            <strong>Mesa {mesa.numero}</strong>
            <br />
            Capacidad: {mesa.capacidad}
            <br />
            Estado: {mesa.estado}
            <br />
            Comensales: {mesa.comensales}
            <br />
            <br />
            <button
              onClick={() => {
                asignarMesa(mesa.id);
                navigate("/carrito");
              }}
              disabled={mesa.estado !== "libre"}
            >
              Seleccionar mesa
            </button>
            <br />
            <br />
            <Link to={`/mesas/${mesa.id}`} style={{ color: "white" }}>
              Ver detalle
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
