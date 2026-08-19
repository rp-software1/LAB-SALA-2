import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMesaById } from "@/src/services/api";
import MesaDetalle from "./MesaDetalle";
import MesaDetalleSkeleton from "./MesaDetalleSkeleton";

// ── Props (Next.js 15: params es Promise) ────────────────────
interface PageProps {
  params: Promise<{ mesaId: string }>;
}

// ============================================================
// DÍA 4 — generateMetadata
//
// Genera <title> dinámico basado en los datos de la mesa.
// Next.js ejecuta esto en el servidor para cada petición.
// ============================================================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { mesaId } = await params;

  try {
    const mesa = await getMesaById(mesaId);
    return {
      title: `Mesa ${mesa.numero} — Restaurante`,
      description: `Detalle de la mesa #${mesa.numero}. Estado: ${mesa.estado}. Capacidad: ${mesa.capacidad} personas.`,
    };
  } catch {
    return {
      title: "Mesa no encontrada — Restaurante",
    };
  }
}

// ============================================================
// DÍA 4 — Página con Suspense manual
//
// 1. Await params + datos en el server
// 2. Si no existe → notFound()
// 3. Renderiza <MesaDetalle> envuelto en <Suspense>
// ============================================================
export default async function MesaPage({ params }: PageProps) {
  const { mesaId } = await params;

  let mesa;
  try {
    mesa = await getMesaById(mesaId);
  } catch {
    notFound();
  }

  return (
    <section>
      <Suspense fallback={<MesaDetalleSkeleton />}>
        <MesaDetalle
          id={mesa.id}
          numero={mesa.numero}
          capacidad={mesa.capacidad}
          estado={mesa.estado}
          ubicacion={mesa.ubicacion}
        />
      </Suspense>
    </section>
  );
}
