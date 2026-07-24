// src/components/PlatoCard.tsx
import type { CSSProperties } from "react";

// 1. Declara la interface del modelo Plato
interface Plato {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  disponible: boolean;
}

// 2. Declara las props del componente
interface PlatoCardProps {
  plato: Plato;
  onAgregar?: (plato: Plato) => void;
}

// 3. Tipea el componente
export default function PlatoCard({
  plato,
  onAgregar = () => {},
}: PlatoCardProps) {
  const { nombre, precio, disponible } = plato;

  const estilos: { [key: string]: CSSProperties } = {
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
        onClick={() => onAgregar(plato)}
        disabled={!disponible}
      >
        Agregar al carrito
      </button>
    </div>
  );
}