/**
 * DÍA 5 — loading.tsx para /comandas
 *
 * Skeleton animado que Next.js muestra automáticamente
 * mientras el Server Component resuelve los datos.
 */
export default function ComandasLoading() {
  return (
    <section className="space-y-8 animate-pulse">
      <div className="h-10 w-40 rounded bg-gray-200" />

      {/* Skeleton de sección activas */}
      <div>
        <div className="mb-4 h-7 w-48 rounded bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`skel-active-${i}`}
              className="h-56 rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="mb-3 flex justify-between">
                <div className="h-5 w-28 rounded bg-gray-200" />
                <div className="h-6 w-24 rounded-full bg-gray-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-3/4 rounded bg-gray-100" />
                <div className="h-4 w-5/6 rounded bg-gray-100" />
              </div>
              <div className="mt-4 h-10 w-full rounded-lg bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton de sección cerradas */}
      <div>
        <div className="mb-4 h-7 w-48 rounded bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`skel-closed-${i}`}
              className="h-48 rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="mb-3 flex justify-between">
                <div className="h-5 w-28 rounded bg-gray-200" />
                <div className="h-6 w-24 rounded-full bg-gray-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-2/3 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
