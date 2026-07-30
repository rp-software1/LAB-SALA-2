// components/OrderForm.tsx
import { useState, useEffect } from "react";

interface OrderFormProps {
  mesaNumero: number;
}

function OrderForm({ mesaNumero }: OrderFormProps) {
  const [plato, setPlato] = useState<string>("");
  const [cantidad, setCantidad] = useState<number>(1);
  const [enviando, setEnviando] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>("");

  useEffect(() => {
    console.log("OrderForm montado — mesa disponible:", mesaNumero);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "plato") setPlato(value);
    if (name === "cantidad") setCantidad(Number(value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setEnviando(true);
    setMensaje("");

    setTimeout(() => {
      setEnviando(false);
      setMensaje(`Comanda enviada: ${plato} x${cantidad}`);
      setPlato("");
      setCantidad(1);
    }, 1500);
  };

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