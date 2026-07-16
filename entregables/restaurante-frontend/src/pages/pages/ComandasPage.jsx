// pages/ComandasPage.jsx
import React, { useState } from "react";
import OrderForm from "../components/OrderForm"; // Asegúrense de que apunte a la versión funcional (.jsx)

const MESAS_MOCK = ["1", "2", "3", "4", "5"];

function ComandasPage() {
  // Estado local para recordar qué mesa está seleccionada
  const [mesaSeleccionada, setMesaSeleccionada] = useState(MESAS_MOCK[0]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Comandas</h1>
      
      <label htmlFor="selector-mesa" style={{ marginRight: "10px" }}>
        Seleccionar Mesa:
      </label>
      <select
        id="selector-mesa"
        value={mesaSeleccionada}
        onChange={(e) => setMesaSeleccionada(e.target.value)}
        style={{ padding: "5px", marginBottom: "20px" }}
      >
        {MESAS_MOCK.map((mesa) => (
          <option key={mesa} value={mesa}>
            Mesa {mesa}
          </option>
        ))}
      </select>

      <hr />

      {/* Renderizamos el OrderForm funcional pasándole la mesa activa */}
      <OrderForm mesaNumero={mesaSeleccionada} />
    </div>
  );
}

export default ComandasPage;