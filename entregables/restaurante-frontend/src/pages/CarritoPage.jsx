// src/pages/CarritoPage.jsx
import { useState } from "react";
import { crearPedido } from "../services/api";
import { usePedido } from "../context/PedidoContext";

export default function CarritoPage() {
  const { pedido, quitarPlato, cambiarTipo, limpiarPedido } = usePedido();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const [pedidoCreado, setPedidoCreado] = useState(null);

  const handleEnviarComanda = async () => {
    if (pedido.items.length === 0) return;
    setEnviando(true);
    setError(null);
    try {
      const nuevoPedido = await crearPedido({
        mesaId: pedido.mesaId,
        tipo: pedido.tipo,
        items: pedido.items,
      });
      setPedidoCreado(nuevoPedido);
      limpiarPedido();
    } catch (err) {
      console.error(err);
      setError("No se pudo crear el pedido. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  // Si el pedido ya fue creado, mostrar confirmación
  if (pedidoCreado) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>✅ Comanda enviada</h1>
        <p>
          <strong>Pedido:</strong> #{pedidoCreado._id}
        </p>
        <p>
          <strong>Estado:</strong> {pedidoCreado.estado}
        </p>
        <p>El pedido fue enviado correctamente a la cocina.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Comanda activa</h1>
      <p>
        <strong>Tipo:</strong> {pedido.tipo}
      </p>
      <hr />
      {pedido.items.length === 0 ? (
        <p>No hay productos agregados.</p>
      ) : (
        pedido.items.map((item) => (
          <div
            key={item.platoId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <div>
              <strong>{item.nombre}</strong>
              <br />
              Cantidad: {item.cantidad}
              <br />
              Subtotal: S/ {(item.precioUnitario * item.cantidad).toFixed(2)}
            </div>
            <button onClick={() => quitarPlato(item.platoId)}>Quitar</button>
          </div>
        ))
      )}
      <hr />
      <h2>Total: S/ {pedido.total.toFixed(2)}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => cambiarTipo("mesa")} style={{ marginRight: "10px" }}>
          Pedido Mesa
        </button>
        <button onClick={() => cambiarTipo("para_llevar")} style={{ marginRight: "10px" }}>
          Para llevar
        </button>
        <button onClick={limpiarPedido} style={{ marginRight: "10px" }}>
          Vaciar carrito
        </button>
        <button
          onClick={handleEnviarComanda}
          disabled={enviando || pedido.items.length === 0}
        >
          {enviando ? "Enviando comanda..." : "Enviar comanda"}
        </button>
      </div>
    </div>
  );
}