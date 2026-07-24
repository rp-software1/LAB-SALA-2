import PropTypes from "prop-types";

export default function PlatoCard({
  nombre,
  precio,
  disponible,
  onAgregar,
}) {
  const estilos = {
    card: {
      width: "250px",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px",
      margin: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
    },

    titulo: {
      fontSize: "22px",
      marginBottom: "10px",
    },

    precio: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#16a34a",
    },

    estado: {
      margin: "10px 0",
      fontWeight: "bold",
      color: disponible ? "green" : "red",
    },

    boton: {
      backgroundColor: disponible ? "#2563eb" : "#999",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "10px 18px",
      cursor: disponible ? "pointer" : "not-allowed",
      width: "100%",
    },
  };

  return (
    <div style={estilos.card}>
      <h3 style={estilos.titulo}>{nombre}</h3>

      <p style={estilos.precio}>S/ {precio}</p>

      <p style={estilos.estado}>
        {disponible ? "✅ Disponible" : "❌ Agotado"}
      </p>

      <button
        style={estilos.boton}
        onClick={onAgregar}
        disabled={!disponible}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

PlatoCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  disponible: PropTypes.bool.isRequired,
  onAgregar: PropTypes.func,
};

PlatoCard.defaultProps = {
  onAgregar: () => {},
};