import PropTypes from "prop-types";

export default function PlatoCard({
  nombre,
  categoria,
  precio,
  stock,
  disponible,
}) {
  const estilos = {
    card: {
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "15px",
      backgroundColor: "#fff",
    },
    disponible: {
      color: "green",
      fontWeight: "bold",
    },
    agotado: {
      color: "red",
      fontWeight: "bold",
    },
  };

  return (
    <div style={estilos.card}>
      <h3>{nombre}</h3>

      <p>
        <strong>Categoría:</strong> {categoria}
      </p>

      <p>
        <strong>Precio:</strong> S/ {precio}
      </p>

      <p>
        <strong>Stock:</strong> {stock}
      </p>

      <p style={disponible ? estilos.disponible : estilos.agotado}>
        {disponible ? "✅ Disponible" : "❌ Agotado"}
      </p>
    </div>
  );
}

PlatoCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  disponible: PropTypes.bool.isRequired,
};