// src/pages/MesasPage.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Mesa } from "../types";
import { getMesas } from "../services/api";
import { usePedido } from "../context/PedidoContext";

export default function MesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { asignarMesa } = usePedido();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarMesas = async (): Promise<void> => {
      try {
        setLoading(true);
        const data: Mesa[] = await getMesas();
        setMesas(data);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError("No se pudieron cargar las mesas.");
      } finally {
        setLoading(false);
      }
    };
    cargarMesas();
  }, []);

  const handleSeleccionarMesa = (mesa: Mesa): void => {
    asignarMesa(String(mesa.id));
    navigate("/carrito");
  };

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
        {mesas.map((mesa: Mesa) => (
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
              onClick={() => handleSeleccionarMesa(mesa)}
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