/**
 * Loading UI — se muestra automáticamente mientras
 * Next.js resuelve el Server Component de la página.
 *
 * Complementa el Suspense manual con un skeleton
 * que indica carga al usuario.
 */
export default function MesaLoading() {
  return (
    <section className="space-y-6 animate-pulse">
      {/* Skeleton del encabezado */}
      <div className="rounded-xl border-2 border-gray-200 bg-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-40 rounded bg-gray-300" />
            <div className="h-4 w-28 rounded bg-gray-300" />
          </div>
          <div className="h-10 w-32 rounded-full bg-gray-300" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="h-4 w-32 rounded bg-gray-300" />
          <div className="h-4 w-16 rounded bg-gray-300" />
        </div>
      </div>

      {/* Skeleton del contenido */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-3 h-6 w-36 rounded bg-gray-200" />
        <div className="space-y-3">
          <div className="h-12 rounded bg-gray-100" />
          <div className="h-12 rounded bg-gray-100" />
        </div>
      </div>

      {/* Skeleton del botón */}
      <div className="h-10 w-44 rounded-lg bg-gray-200" />
    </section>
  );
}
