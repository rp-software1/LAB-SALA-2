import Link from "next/link";

/**
 * Página principal — lista de mesas con navegación via Link.
 */
export default function HomePage() {
  const mesas = [
    { id: "1", numero: 1, capacidad: 4, estado: "disponible" },
    { id: "2", numero: 2, capacidad: 2, estado: "ocupada" },
    { id: "3", numero: 3, capacidad: 6, estado: "reservada" },
    { id: "4", numero: 4, capacidad: 4, estado: "disponible" },
    { id: "5", numero: 5, capacidad: 8, estado: "mantenimiento" },
  ];

  const estadoColor: Record<string, string> = {
    disponible: "bg-green-100 text-green-800",
    ocupada: "bg-red-100 text-red-800",
    reservada: "bg-yellow-100 text-yellow-800",
    mantenimiento: "bg-gray-200 text-gray-600",
  };

  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold">Mesas del Restaurante</h1>
      <p className="mb-6 text-gray-500">
        Día 4 — DetalleMesa, generateMetadata y Suspense manual
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mesas.map((mesa) => (
          <Link
            key={mesa.id}
            href={`/mesas/${mesa.id}`}
            className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-lg font-semibold">Mesa #{mesa.numero}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${estadoColor[mesa.estado]}`}
              >
                {mesa.estado}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Capacidad: {mesa.capacidad} personas
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
