import Link from "next/link";

/**
 * NavBar extraído del layout para reutilización.
 * Día 5 — Agrega link a Comandas.
 */
export default function NavBar() {
  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-amber-700">
          🍽️ Restaurante App
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/" className="hover:text-amber-700 transition-colors">
            Inicio
          </Link>
          <Link
            href="/mesas"
            className="hover:text-amber-700 transition-colors"
          >
            Mesas
          </Link>
          <Link
            href="/menu"
            className="hover:text-amber-700 transition-colors"
          >
            Menú
          </Link>
          <Link
            href="/comandas"
            className="hover:text-amber-700 transition-colors"
          >
            Comandas
          </Link>
          <Link
            href="/carrito"
            className="hover:text-amber-700 transition-colors"
          >
            Carrito
          </Link>
        </div>
      </div>
    </nav>
  );
}
