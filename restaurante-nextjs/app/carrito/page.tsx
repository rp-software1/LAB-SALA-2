"use client";

import { useState, useEffect } from "react";

// ============================================================
// DÍA 6 — /carrito — Client Component
//
// - useState para manejar items del carrito
// - useEffect para actualizar document.title dinámicamente
//   según la cantidad de items
// ============================================================

interface ItemCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

/**
 * Página del carrito de compras.
 * Actualiza <title> dinámicamente:
 *   - "Carrito (N) — Sistema de Restaurante" si hay items
 *   - "Carrito — Sistema de Restaurante" si está vacío
 */
export default function CarritoPage() {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  // ── DÍA 6: useEffect para document.title dinámico ─────────
  useEffect(() => {
    const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
    document.title =
      totalItems > 0
        ? `Carrito (${totalItems}) — Sistema de Restaurante`
        : "Carrito — Sistema de Restaurante";
  }, [items]);

  // ── Demo: items de ejemplo ─────────────────────────────────
  useEffect(() => {
    setItems([
      { id: "p4", nombre: "Ceviche de pescado", precio: 22, cantidad: 2 },
      { id: "p8", nombre: "Pisco sour", precio: 15, cantidad: 2 },
    ]);
  }, []);

  function incrementar(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  }

  function decrementar(id: string) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">
        Carrito
        {totalItems > 0 && (
          <span className="ml-2 text-lg text-gray-400">({totalItems})</span>
        )}
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-400">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-5 py-4"
              >
                <div>
                  <p className="font-medium">{item.nombre}</p>
                  <p className="text-sm text-gray-400">
                    S/ {item.precio.toFixed(2)} c/u
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => decrementar(item.id)}
                    className="h-8 w-8 rounded-full border border-gray-300 text-sm font-medium transition hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">
                    {item.cantidad}
                  </span>
                  <button
                    type="button"
                    onClick={() => incrementar(item.id)}
                    className="h-8 w-8 rounded-full border border-gray-300 text-sm font-medium transition hover:bg-gray-100"
                  >
                    +
                  </button>
                  <span className="ml-2 w-20 text-right font-semibold text-amber-700">
                    S/ {(item.precio * item.cantidad).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4">
            <span className="text-lg font-medium">Total</span>
            <span className="text-2xl font-bold text-amber-700">
              S/ {total.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </section>
  );
}
