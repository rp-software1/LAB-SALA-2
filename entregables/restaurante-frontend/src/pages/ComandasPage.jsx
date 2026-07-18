// pages/ComandasPage.jsx
import React, { useState } from "react";
import OrderForm from "../components/OrderForm";
// Importamos el mock de mesas del proyecto
import { mesas } from "../data/mesas.mock"; 

function ComandasPage() {
  // Inicializamos el estado con el id o número de la primera mesa disponible
  const [mesaSeleccionada, setMesaSeleccionada] = useState(
    mesas && mesas.length > 0 ? mesas[0].numero : ""
  );

  const handleMesaChange = (event) => {
    setMesaSeleccionada(event.target.value);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Módulo de Comandas</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="mesa-select" style={{ marginRight: "10px", fontWeight: "bold" }}>
          Selecciona una mesa:
        </label>
        <select
          id="mesa-select"
          value={mesaSeleccionada}
          onChange={handleMesaChange}
          style={{ padding: "8px", borderRadius: "4px", fontSize: "16px" }}
        >
          {mesas.map((mesa) => (
            // Usamos una propiedad id o numero según esté declarada en su archivo mock
            <option key={mesa.id || mesa.numero} value={mesa.numero}>
              Mesa {mesa.numero} {mesa.capacidad ? `(${mesa.capacidad} personas)` : ""}
            </option>
          ))}
        </select>
      </div>

      <hr style={{ margin: "20px 0", borderColor: "#eee" }} />

      {/* Renderizado de nuestro formulario migrado */}
      {mesaSeleccionada ? (
        <OrderForm mesaNumero={mesaSeleccionada} />
      ) : (
        <p>Por favor, selecciona una mesa para empezar la comanda.</p>
      )}
    </div>
  );
}

export default ComandasPage;