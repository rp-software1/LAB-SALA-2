import PropTypes from "prop-types";

export default function MesaCard({
  numero,
  capacidad,
  comensales,
  estado,
}) {
  const colores = {
    libre: "#28a745",
    ocupada: "#dc3545",
    reservada: "#ffc107",
  };

  return (
    <div
      style={{
        backgroundColor: colores[estado],
        color: estado === "reservada" ? "black" : "white",
        padding: "15px",
        borderRadius: "10px",
        margin: "10px",
        width: "220px",
      }}
    >
      <h3>Mesa {numero}</h3>

      <p>
        <strong>Capacidad:</strong> {capacidad}
      </p>

      <p>
        <strong>Comensales:</strong> {comensales}
      </p>

      <p>
        <strong>Estado:</strong> {estado}
      </p>
    </div>
  );
}

MesaCard.propTypes = {
  numero: PropTypes.number.isRequired,
  capacidad: PropTypes.number.isRequired,
  comensales: PropTypes.number.isRequired,
  estado: PropTypes.oneOf([
    "libre",
    "ocupada",
    "reservada",
  ]).isRequired,
};