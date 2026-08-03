'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';

interface NavBarProps {
  nombreRestaurante: string;
}

export default function NavBar({ nombreRestaurante }: NavBarProps) {
  const pathname = usePathname();

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
        <Link href="/carrito" style={estiloLink('/carrito')}>Carrito</Link>
      </nav>
    </>
  );
}