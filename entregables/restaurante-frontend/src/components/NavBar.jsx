export default function NavBar({ cambiarPagina }) {
  const estilos = {
    header: {
      backgroundColor: '#222',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
    },
    nav: {
      backgroundColor: '#333',
      padding: '10px',
      textAlign: 'center',
    },
    button: {
      margin: '0 10px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  };

  return (
    <>
      <header style={estilos.header}>
        <h1>🍽 Restaurante SENATI</h1>
      </header>

      <nav style={estilos.nav}>
        <button style={estilos.button} onClick={() => cambiarPagina('home')}>
          Inicio
        </button>
        <button style={estilos.button} onClick={() => cambiarPagina('menu')}>
          Carta
        </button>
        <button style={estilos.button} onClick={() => cambiarPagina('mesas')}>
          Mesas
        </button>
        <button style={estilos.button} onClick={() => cambiarPagina('carrito')}>
          Comandas
        </button>
      </nav>
    </>
  );
}