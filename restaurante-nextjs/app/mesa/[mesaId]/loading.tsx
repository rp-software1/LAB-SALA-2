import MesaDetalleSkeleton from "./MesaDetalleSkeleton";

/**
 * DÍA 4 — loading.tsx
 *
 * Next.js muestra este componente automáticamente mientras
 * resuelve el Server Component de la página.
 * Reutiliza el skeleton de MesaDetalleSkeleton.
 */
export default function MesaLoading() {
  return (
    <section>
      <MesaDetalleSkeleton />
    </section>
  );
}
