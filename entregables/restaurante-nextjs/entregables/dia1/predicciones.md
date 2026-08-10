Aquí tienes un ejemplo de predicciones.md con respuestas plausibles para los 4 bloques, basado en lo que realmente hicimos hoy:

predicciones.md
Predicción A — Antes de crear el proyecto

¿Qué estructura de carpetas genera create-next-app?
Carpetas que esperas ver: app/, public/, node_modules/

¿Existe un archivo de rutas tipo App.tsx?
No — Next.js usa el sistema de archivos como configuración de rutas, no un archivo centralizado como React Router.

Predicción B — Antes de migrar el NavBar

¿El NavLink de React Router funciona en Next.js sin cambios?
No — NavLink viene de react-router-dom, que no existe en Next.js.

¿Qué import cambia?
NavLink de react-router-dom → Link de next/link. Para detectar la ruta activa (que antes hacía NavLink automáticamente con isActive), hay que usar el hook usePathname() de next/navigation y compararlo manualmente.

Predicción C — Antes de crear las carpetas de rutas

¿Cuántas carpetas vas a crear?
3 — mesas/, menu/, carrito/

Archivos page.tsx a crear:
app/mesas/page.tsx, app/menu/page.tsx, app/carrito/page.tsx

Predicción D — Antes de la ruta dinámica

¿Cómo llega el parámetro mesaId al componente?
Como prop, no como hook — a diferencia de React donde se usaba useParams(). En Next.js App Router, params llega directo al componente de la página.

¿Es string o puede ser number?
Siempre string. Next.js no convierte automáticamente el valor del segmento dinámico a número, aunque en la URL parezca un número.