import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menú",
  description:
    "Carta completa del restaurante: platos, precios y disponibilidad.",
};

// ── Datos estáticos (server-side) ────────────────────────────
const PLATOS = [
  { id: "p1", nombre: "Lomo saltado", precio: 18, stock: 5, descripcion: "Clásico peruano con papas fritas" },
  { id: "p2", nombre: "Arroz con leche", precio: 8, stock: 10, descripcion: "Postre tradicional" },
  { id: "p3", nombre: "Sopa criolla", precio: 12, stock: 8, descripcion: "Sopa con leche y fideo" },
  { id: "p4", nombre: "Ceviche de pescado", precio: 22, stock: 6, descripcion: "Pescado fresco marinado en limón" },
  { id: "p5", nombre: "Pollo a la brasa", precio: 20, stock: 4, descripcion: "Pollo entero con papas y ensalada" },
  { id: "p6", nombre: "Ají de gallina", precio: 16, stock: 7, descripcion: "Tradicional guiso cremoso" },
  { id: "p7", nombre: "Causa limeña", precio: 14, stock: 9, descripcion: "Terrina de papa con pollo y palta" },
  { id: "p8", nombre: "Pisco sour", precio: 15, stock: 20, descripcion: "Cóctel peruano clásico" },
];

/**
 * DÍA 6 — /menu — Server Component con metadata estática.
 * El title "Menú" se renderiza como "Menú — Sistema de Restaurante"
 * gracias al title.template del layout.
 */
export default function MenuPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Menú</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {PLATOS.map((plato) => (
          <div
            key={plato.id}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{plato.nombre}</h2>
              <span className="text-lg font-bold text-amber-700">
                S/ {plato.precio.toFixed(2)}
              </span>
            </div>
            <p className="mb-2 text-sm text-gray-500">{plato.descripcion}</p>
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                plato.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              Stock: {plato.stock}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
