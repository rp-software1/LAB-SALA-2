export default function NavBar({ cambiarPagina }) {
  const estilos = {
    header: {
      backgroundColor: "#222",
      color: "white",
      padding: "20px",
      textAlign: "center",
    },
    nav: {
      backgroundColor: "#333",
      padding: "10px",
      textAlign: "center",
    },
    button: {
      margin: "0 10px",
      padding: "10px 20px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  const paginas = [
    { nombre: "Inicio", ruta: "home" },
    { nombre: "Carta", ruta: "menu" },
    { nombre: "Mesas", ruta: "mesas" },
    { nombre: "Comandas", ruta: "carrito" },
  ];

  return (
    <>
      <header style={estilos.header}>
        <h1>🍽 Restaurante SENATI</h1>
      </header>

      <nav style={estilos.nav}>
        {paginas.map((pagina) => (
          <button
            key={pagina.ruta}
            style={estilos.button}
            onClick={() => cambiarPagina(pagina.ruta)}
          >
            {pagina.nombre}
          </button>
        ))}
      </nav>
    </>
  );
}