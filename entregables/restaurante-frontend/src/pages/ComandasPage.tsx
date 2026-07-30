// pages/ComandasPage.tsx
import { useState } from "react";
import OrderForm from "../components/OrderForm";
import { mesasMock as mesas } from "../data/mesas.mock";

function ComandasPage() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState<string>(
    mesas && mesas.length > 0 ? String(mesas[0].numero) : ""
  );

  const handleMesaChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
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
            <option key={mesa.id || mesa.numero} value={mesa.numero}>
              Mesa {mesa.numero} {mesa.capacidad ? `(${mesa.capacidad} personas)` : ""}
            </option>
          ))}
        </select>
      </div>

      <hr style={{ margin: "20px 0", borderColor: "#eee" }} />

      {mesaSeleccionada ? (
        <OrderForm mesaNumero={Number(mesaSeleccionada)} />
      ) : (
        <p>Por favor, selecciona una mesa para empezar la comanda.</p>
      )}
    </div>
  );
}

export default ComandasPage;