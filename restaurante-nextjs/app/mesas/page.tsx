import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mesas",
  description:
    "Listado de mesas del restaurante con estado, capacidad y ubicación.",
};

// ── Datos estáticos (server-side) ────────────────────────────
const MESAS = [
  { id: "1", numero: 1, capacidad: 4, estado: "disponible", ubicacion: "Interior - Ventana" },
  { id: "2", numero: 2, capacidad: 2, estado: "ocupada", ubicacion: "Interior - Central" },
  { id: "3", numero: 3, capacidad: 6, estado: "reservada", ubicacion: "Terraza" },
  { id: "4", numero: 4, capacidad: 4, estado: "disponible", ubicacion: "Interior - Barra" },
  { id: "5", numero: 5, capacidad: 8, estado: "fuera_servicio", ubicacion: "Salón privado" },
];

const ESTADO_COLOR: Record<string, string> = {
  disponible: "bg-green-100 text-green-800",
  ocupada: "bg-red-100 text-red-800",
  reservada: "bg-yellow-100 text-yellow-800",
  fuera_servicio: "bg-gray-200 text-gray-600",
};

/**
 * DÍA 6 — /mesas — Server Component con metadata estática.
 * El title "Mesas" se renderiza como "Mesas — Sistema de Restaurante"
 * gracias al title.template del layout.
 */
export default function MesasPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Mesas</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MESAS.map((mesa) => (
          <Link
            key={mesa.id}
            href={`/mesa/${mesa.id}`}
            className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-lg font-semibold">Mesa #{mesa.numero}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${ESTADO_COLOR[mesa.estado]}`}
              >
                {mesa.estado.replace("_", " ")}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              📍 {mesa.ubicacion} · {mesa.capacidad} personas
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
