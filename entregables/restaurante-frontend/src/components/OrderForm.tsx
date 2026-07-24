// components/OrderForm.jsx
// VERSIÓN MODERNA — Componente Funcional con Hooks
import React, { useState, useEffect } from "react";

function OrderForm({ mesaNumero }) {
  // ==========================================
  // PRIMERO: El Estado (useState)
  // ==========================================
  const [plato, setPlato] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // ==========================================
  // SEGUNDO: El Ciclo de Vida (useEffect)
  // ==========================================
  useEffect(() => {
    console.log("OrderForm montado — mesa disponible:", mesaNumero);
  }, []); // El array vacío [] asegura que solo se ejecute al montar

  // ==========================================
  // TERCERO: Los Handlers
  // ==========================================
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Traducimos el [name]: value dinámico usando los setters independientes
    if (name === "plato") setPlato(value);
    if (name === "cantidad") setCantidad(Number(value)); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEnviando(true);
    setMensaje("");

    // Simulación de API idéntica a la legacy
    setTimeout(() => {
      setEnviando(false);
      setMensaje(`Comanda enviada: ${plato} x${cantidad}`);
      // Reseteamos el formulario mediante sus hooks correspondientes
      setPlato("");
      setCantidad(1);
    }, 1500);
  };

  // ==========================================
  // CUARTO: El Return (Sin render())
  // ==========================================
  return (
    <form onSubmit={handleSubmit}>
      <h2>Comanda — Mesa {mesaNumero}</h2>

      <input
        name="plato"
        value={plato}
        onChange={handleChange}
        placeholder="Nombre del plato"
      />

      <input
        type="number"
        name="cantidad"
        value={cantidad}
        onChange={handleChange}
        min="1"
      />

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Agregar a comanda"}
      </button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}

export default OrderForm;