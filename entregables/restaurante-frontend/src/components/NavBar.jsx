import { NavLink } from "react-router-dom";

export default function NavBar({ nombreRestaurante }) {
  const estilos = {
    header: {
      backgroundColor: "#1f2937",
      color: "white",
      padding: "20px",
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
    },

    nav: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      backgroundColor: "#374151",
      padding: "15px",
      marginBottom: "25px",
    },
  };

  const estiloLink = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#facc15" : "white",
    fontWeight: isActive ? "bold" : "normal",
    borderBottom: isActive ? "3px solid #facc15" : "none",
    paddingBottom: "5px",
    transition: "0.3s",
  });

  return (
    <>
      <header style={estilos.header}>
        {nombreRestaurante}
      </header>

      <nav style={estilos.nav}>
        <NavLink to="/" style={estiloLink}>
          Inicio
        </NavLink>

        <NavLink to="/menu" style={estiloLink}>
          Carta
        </NavLink>

        <NavLink to="/mesas" style={estiloLink}>
          Mesas
        </NavLink>

        <NavLink to="/comandas" style={estiloLink}>
          Comandas
        </NavLink>

        <NavLink to="/carrito" style={estiloLink}>
          Carrito
        </NavLink>
      </nav>
    </>
  );
}