'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';
import { usePedido } from '../../src/context/PedidoProvider';

interface NavBarProps {
  nombreRestaurante: string;
}

export default function NavBar({ nombreRestaurante }: NavBarProps) {
  const pathname = usePathname();
  const { pedido } = usePedido();

  const totalItems = pedido.items.reduce((acc, item) => acc + item.cantidad, 0);

  const estilos: { [key: string]: CSSProperties } = {
    header: {
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      backgroundColor: '#374151',
      padding: '15px',
      marginBottom: '25px',
      alignItems: 'center',
    },
    badge: {
      marginLeft: '6px',
      backgroundColor: '#ef4444',
      color: 'white',
      fontSize: '12px',
      borderRadius: '9999px',
      padding: '2px 8px',
    },
  };

  const estiloLink = (ruta: string): CSSProperties => {
    const isActive = pathname === ruta;
    return {
      textDecoration: 'none',
      color: isActive ? '#facc15' : 'white',
      fontWeight: isActive ? 'bold' : 'normal',
      borderBottom: isActive ? '3px solid #facc15' : 'none',
      paddingBottom: '5px',
      transition: '0.3s',
    };
  };

  return (
    <>
      <header style={estilos.header}>{nombreRestaurante}</header>

      <nav style={estilos.nav}>
        <Link href="/" style={estiloLink('/')}>Inicio</Link>
        <Link href="/menu" style={estiloLink('/menu')}>Carta</Link>
        <Link href="/mesas" style={estiloLink('/mesas')}>Mesas</Link>
        <Link href="/comandas" style={estiloLink('/comandas')}>Comandas</Link>
        <Link href="/carrito" style={estiloLink('/carrito')}>
          Carrito
          {totalItems > 0 && <span style={estilos.badge}>{totalItems}</span>}
        </Link>
      </nav>
    </>
  );
}