import { Suspense } from "react";
import type { Metadata } from "next";
import { getMesaById } from "@/src/services/api";
import DetalleMesa from "@/components/DetalleMesa";

// ── Props de la página (params es Promise en Next.js 15) ─────
interface PageProps {
  params: Promise<{ id: string }>;
}

// ============================================================
// DÍA 4 — generateMetadata (Server Component)
//
// Next.js ejecuta esta función en el servidor para generar
// <head> dinámico basado en los datos de la mesa.
// ============================================================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const mesa = await getMesaById(id);
    return {
      title: `Mesa #${mesa.numero} — ${mesa.estado} | Restaurante App`,
      description: `Detalle de la mesa #${mesa.numero} con capacidad para ${mesa.capacidad} personas. Estado: ${mesa.estado}.`,
      openGraph: {
        title: `Mesa #${mesa.numero}`,
        description: `Estado: ${mesa.estado} · Capacidad: ${mesa.capacidad} personas`,
      },
    };
  } catch {
    return {
      title: "Mesa no encontrada | Restaurante App",
      description: "La mesa solicitada no fue encontrada.",
    };
  }
}

// ============================================================
// DÍA 4 — Página con Suspense manual
//
// 1. Await params + datos (server-side)
// 2. Renderiza <DetalleMesa> dentro de <Suspense>
//    con un fallback UI explícito.
// ============================================================
export default async function MesaDetallePage({ params }: PageProps) {
  const { id } = await params;
  const mesa = await getMesaById(id);

  return (
    <section>
      <Suspense fallback={<MesaSkeleton />}>
        <DetalleMesa mesa={mesa} />
      </Suspense>
    </section>
  );
}

// ── Skeleton manual para Suspense fallback ───────────────────
function MesaSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-40 rounded-xl bg-gray-200" />
      <div className="h-32 rounded-xl bg-gray-200" />
      <div className="h-10 w-40 rounded-lg bg-gray-200" />
    </div>
  );
}
