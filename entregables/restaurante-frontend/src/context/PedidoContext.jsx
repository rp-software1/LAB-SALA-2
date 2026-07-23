import { createContext, useContext, useState } from "react";

const PedidoContext = createContext(null);

const estadoInicial = {
  mesaId: null,
  tipo: "mesa",
  estado: "pendiente",
  items: [],
  total: 0,
};

export function PedidoProvider({ children }) {
  const [pedido, setPedido] = useState(estadoInicial);

  // Calcula el total
  const calcularTotal = (items) => {
    return items.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );
  };

  // Agregar plato
  const agregarPlato = (plato) => {
    setPedido((prev) => {
      const existe = prev.items.find(
        (item) => item.platoId === plato._id
      );

      let nuevosItems;

      if (existe) {
        nuevosItems = prev.items.map((item) =>
          item.platoId === plato._id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      } else {
        nuevosItems = [
          ...prev.items,
          {
            platoId: plato._id,
            nombre: plato.nombre,
            cantidad: 1,
            precioUnitario: plato.precio,
          },
        ];
      }

      return {
        ...prev,
        items: nuevosItems,
        total: calcularTotal(nuevosItems),
      };
    });
  };

  // Quitar plato
  const quitarPlato = (platoId) => {
    setPedido((prev) => {
      const nuevosItems = prev.items
        .map((item) =>
          item.platoId === platoId
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter((item) => item.cantidad > 0);

      return {
        ...prev,
        items: nuevosItems,
        total: calcularTotal(nuevosItems),
      };
    });
  };

  // Cambiar tipo
  const cambiarTipo = (tipo) => {
    setPedido((prev) => ({
      ...prev,
      tipo,
      mesaId: tipo === "para_llevar" ? null : prev.mesaId,
    }));
  };

  const asignarMesa = (mesaId) => {
  setPedido((prev) => ({
    ...prev,
    mesaId,
    }));
  };

  // Limpiar pedido
  const limpiarPedido = () => {
    setPedido(estadoInicial);
  };

  return (
    <PedidoContext.Provider
      value={{
        pedido,
        agregarPlato,
        quitarPlato,
        cambiarTipo,
        limpiarPedido,
        asignarMesa,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  const context = useContext(PedidoContext);

  if (!context) {
    throw new Error(
      "usePedido debe usarse dentro de PedidoProvider"
    );
  }

  return context;
}