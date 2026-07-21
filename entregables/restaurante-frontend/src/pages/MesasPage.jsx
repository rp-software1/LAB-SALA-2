import { Link } from "react-router-dom";
import { mesasMock } from "../data/mesas.mock";

export default function MesasPage() {
  return (
    <section>
      <h2>Mesas del Restaurante</h2>

      {mesasMock.map((mesa) => (
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

          <Link
            to={`/mesas/${mesa.id}`}
            style={{ color: "white" }}
          >
            Ver detalle
          </Link>
        </div>
      ))}
    </section>
  );
}