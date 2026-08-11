# Predicciones — Día 2

## Predicción A — Tipos y variables de entorno

**¿Qué prefijo necesitan las variables de entorno de Next.js para ser accesibles en el browser? ¿Y si solo necesitan estar en el servidor?**

- Prefijo para variables accesibles en el browser: `NEXT_PUBLIC_`
- Prefijo para variables solo del servidor: *(sin prefijo — ninguno)*

---

## Predicción B — MesasPage Server Component

**MesasPage llama a getMesas() con await. Si el backend tarda 2 segundos en responder, ¿qué ve el usuario durante esos 2 segundos?**

- El usuario ve durante el fetch: el skeleton de `loading.tsx` (no pantalla en blanco, el layout con NavBar sí se muestra porque no depende del fetch)
- ¿Quién muestra el loading — MesasPage o loading.tsx?: `loading.tsx` — Next.js lo usa como fallback de Suspense mientras `MesasPage` hace el `await`.

---

## Predicción C — loading.tsx y error.tsx

**¿error.tsx captura errores de JavaScript (como un error de sintaxis en el código) o solo errores del fetch (como un 500 del backend)?**

- error.tsx captura: cualquier excepción lanzada durante el render del Server Component en esa ruta — no solo errores de fetch, sino cualquier `throw` (incluyendo errores de sintaxis en runtime, aunque errores de sintaxis reales se detectan antes, en build/compile).
- ¿Qué pasa si getMesas() lanza un Error con mensaje "503"?: `error.tsx` recibe ese error como prop y muestra `error.message` ("503") en pantalla, con el botón "Reintentar" para volver a ejecutar el Server Component.

---

## Predicción D — MenuPage y PlatoCard

**¿MenuPage va a necesitar loading.tsx y error.tsx también?**

- ¿Crear loading.tsx en /menu? **SÍ** — razón: `/menu` también hace un `await` a un fetch externo (`getPlatos()`), por lo tanto necesita su propio fallback de carga, igual que `/mesas`.
- ¿Crear error.tsx en /menu? **SÍ** — razón: el mismo fetch puede fallar (backend apagado, 500, etc.), y cada ruta necesita su propio manejo de error porque `error.tsx` funciona a nivel de segmento de ruta, no global.