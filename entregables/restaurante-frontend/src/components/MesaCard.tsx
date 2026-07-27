import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import type { EstadoMesa } from "../types";

interface MesaCardProps {
  id: number;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  comensales: number;
}

export default function MesaCard({
  id,
  numero,
  capacidad,
  estado,
  comensales,
}: MesaCardProps) {
  const obtenerColor = () => {
    switch (estado) {
      case "libre":
        return "#22c55e";
      case "ocupada":
        return "#ef4444";
      case "reservada":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const estilos: { [key: string]: CSSProperties } = {
    card: {
      width: "250px",
      backgroundColor: "#fff",
      border: `3px solid ${obtenerColor()}`,
      borderRadius: "12px",
      padding: "18px",
      margin: "15px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
      textAlign: "center",
    },
    titulo: { marginBottom: "10px", color: "#1f2937" },
    estado: { fontWeight: "bold", color: obtenerColor(), margin: "10px 0" },
    boton: {
      display: "inline-block",
      marginTop: "12px",
      padding: "10px 16px",
      backgroundColor: "#2563eb",
      color: "white",
      textDecoration: "none",
      borderRadius: "6px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={estilos.card}>
      <h2 style={estilos.titulo}>🪑 Mesa {numero}</h2>
      <p><strong>Capacidad:</strong> {capacidad} personas</p>
      <p><strong>Comensales:</strong> {comensales}</p>
      <p style={estilos.estado}>Estado: {estado.toUpperCase()}</p>
      <Link to={`/mesas/${id}`} style={estilos.boton}>Ver detalle</Link>
    </div>
  );
}