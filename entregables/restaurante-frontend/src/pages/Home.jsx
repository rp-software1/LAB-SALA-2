export default function Home() {
  return (
    <div className="container">
      <h1 className="title">🍽 Restaurante SENATI</h1>

      <p className="subtitle">
        Bienvenido al sistema de gestión del restaurante.
      </p>

      <div className="grid">
        <div className="card">
          <h2>📖 Carta</h2>

          <p>
            Consulta todos los platos disponibles y sus precios.
          </p>
        </div>

        <div className="card">
          <h2>🪑 Mesas</h2>

          <p>
            Administra el estado de las mesas del restaurante.
          </p>
        </div>

        <div className="card">
          <h2>📋 Comandas</h2>

          <p>
            Gestiona las comandas de cada mesa y registra los pedidos del cliente.
          </p>
        </div>

        <div className="card">
          <h2>🛒 Carrito</h2>

          <p>
            Visualiza el pedido antes de enviarlo a la cocina.
          </p>
        </div>
      </div>
    </div>
  );
}