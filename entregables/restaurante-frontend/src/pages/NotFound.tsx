import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        textAlign: "center",
        marginTop: "80px",
      }}
    >
      <h1 style={{ fontSize: "70px", marginBottom: "10px" }}>
        404
      </h1>

      <h2>Página no encontrada</h2>

      <p>
        La página que intentas visitar no existe.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Volver al inicio
      </button>
    </section>
  );
}