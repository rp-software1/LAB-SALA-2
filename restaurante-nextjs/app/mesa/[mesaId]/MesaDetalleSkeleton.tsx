/**
 * DÍA 4 — MesaDetalleSkeleton
 *
 * Skeleton animado con `animate-pulse` que se muestra
 * mientras el Server Component resuelve los datos de la mesa.
 */
export default function MesaDetalleSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Skeleton de encabezado */}
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-40 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
          </div>
          <div className="h-10 w-36 rounded-full bg-gray-200" />
        </div>
        <div className="mt-4">
          <div className="h-4 w-48 rounded bg-gray-200" />
        </div>
      </div>

      {/* Skeleton de botones */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 h-6 w-52 rounded bg-gray-200" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="h-14 rounded-lg bg-gray-200" />
          <div className="h-14 rounded-lg bg-gray-200" />
          <div className="h-14 rounded-lg bg-gray-200" />
          <div className="h-14 rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* Skeleton de info técnica */}
      <div className="h-16 rounded-lg bg-gray-100" />
    </div>
  );
}
