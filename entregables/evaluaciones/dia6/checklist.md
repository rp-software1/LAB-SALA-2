---
alumno: MathiasAlexander y AngelMauricio
sala: LAB-SALA-2
curso: React
dia: 5
estado: completado
loom: (No requerido)
---

## Secciones
- [x] `src/services/api.js` existe con `getPlatos()` usando Axios e `import.meta.env.VITE_API_URL`
- [x] MenuPage muestra correctamente los estados: **loading → datos → error**
- [x] CarritoPage carga los platos desde Axios sin usar mocks ni `setTimeout`
- [x] Todas las referencias a `plato.id` fueron corregidas a `plato._id` en CarritoPage
- [x] `.env.local` está incluido en `.gitignore` y `VITE_API_URL` no está hardcodeada
- [x] La pestaña **Network** muestra la petición `GET /api/platos` con estado **200** (captura incluida)
- [x] El video evidencia la secuencia completa, incluyendo el manejo del estado de error