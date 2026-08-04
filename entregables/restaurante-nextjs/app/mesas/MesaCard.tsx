'use client';

import { useRouter } from 'next/navigation';
import type { Mesa } from '../../src/types';

interface MesaCardProps {
  mesa: Mesa;
}

const colorPorEstado: Record<Mesa["estado"], string> = {
  libre:     'bg-green-100 border-green-400 hover:bg-green-200',
  ocupada:   'bg-red-100   border-red-400   hover:bg-red-200',
  reservada: 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200',
};

export default function MesaCard({ mesa }: MesaCardProps) {
  const router = useRouter();

  const handleClick = (): void => {
    router.push(`/mesa/${mesa.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`border-2 rounded-lg p-4 text-left w-full cursor-pointer ${colorPorEstado[mesa.estado]}`}
    >
      <p className="font-bold text-lg">Mesa {mesa.numero}</p>
      <p className="text-sm text-gray-600">Cap: {mesa.capacidad}</p>
      <p className="text-sm capitalize">{mesa.estado}</p>
    </button>
  );
}