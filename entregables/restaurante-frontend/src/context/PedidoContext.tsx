// src/context/PedidoContext.tsx
import { createContext, useContext, useState } from "react";
import type {
  ReactNode,
} from "react";
import type {
  Plato,
  TipoPedido,
  ItemPedido,
  EstadoPedidoContext,
  PedidoContextType,
} from "../types";

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

const estadoInicial: EstadoPedidoContext = {
  mesaId: null,
  tipo: "mesa",
  estado: "pendiente",
  items: [],
  total: 0,
};

interface PedidoProviderProps {
  children: ReactNode;
}

export function PedidoProvider({ children }: PedidoProviderProps) {
  const [pedido, setPedido] = useState<EstadoPedidoContext>(estadoInicial);

  const calcularTotal = (items: ItemPedido[]): number => {
    return items.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );
  };

  const agregarPlato = (plato: Plato): void => {
    setPedido((prev) => {
      const existe = prev.items.find((item) => item.platoId === plato._id);

      let nuevosItems: ItemPedido[];

      if (existe) {
        nuevosItems = prev.items.map((item) =>
          item.platoId === plato._id
            ? { ...item, cantidad: item.cantidad + 1 }
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

  const quitarPlato = (platoId: string): void => {
    setPedido((prev) => {
      const nuevosItems = prev.items
        .map((item) =>
          item.platoId === platoId
            ? { ...item, cantidad: item.cantidad - 1 }
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

  const cambiarTipo = (tipo: TipoPedido): void => {
    setPedido((prev) => ({
      ...prev,
      tipo,
      mesaId: tipo === "para_llevar" ? null : prev.mesaId,
    }));
  };

  const asignarMesa = (mesaId: string): void => {
    setPedido((prev) => ({
      ...prev,
      mesaId,
    }));
  };

  const limpiarPedido = (): void => {
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

export function usePedido(): PedidoContextType {
  const context = useContext(PedidoContext);

  if (!context) {
    throw new Error("usePedido debe usarse dentro de PedidoProvider");
  }

  return context;
}