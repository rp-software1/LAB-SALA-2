import { useParams, useNavigate } from "react-router-dom";
import { mesasMock } from "../data/mesas.mock";

export default function DetalleMesa() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar la mesa por ID
  const mesa = mesasMock.find((m) => m.id === Number(id));

  // Si no existe
  if (!mesa) {
    return (
      <div className="card">
        <h1>❌ Mesa no encontrada</h1>

        <p>
          No existe una mesa con el ID <strong>{id}</strong>.
        </p>

        <button onClick={() => navigate("/mesas")}>
          Volver a Mesas
        </button>
      </div>
    );
  }

  // Si existe
  return (
    <div className="card">
      <h1>🍽 Mesa {mesa.numero}</h1>

      <hr />

      <p>
        <strong>ID:</strong> {mesa.id}
      </p>

      <p>
        <strong>Capacidad:</strong> {mesa.capacidad} personas
      </p>

      <p>
        <strong>Comensales:</strong> {mesa.comensales}
      </p>

      <p>
        <strong>Estado:</strong>{" "}
        <span
          style={{
            color:
              mesa.estado === "libre"
                ? "green"
                : mesa.estado === "ocupada"
                ? "red"
                : "orange",
            fontWeight: "bold",
          }}
        >
          {mesa.estado.toUpperCase()}
        </span>
      </p>

      <br />

      <button onClick={() => navigate("/mesas")}>
        ← Volver
      </button>
    </div>
  );
}