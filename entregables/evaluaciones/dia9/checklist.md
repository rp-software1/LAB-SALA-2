---
alumno: MathiasAlexander
sala: LAB-SALA-2
curso: React
dia: 9
estado: completado
loom: (No requerido)
---

## Secciones
- [x] `api.js` contiene las funciones `getMesas()`, `crearPedido()` y `cambiarEstadoPedido()`
- [x] MesasPage muestra las mesas reales obtenidas desde el backend con colores según su estado
- [x] Las mesas ocupadas no muestran el botón **Seleccionar**
- [x] Al seleccionar una mesa se navega a CarritoPage con `mesaId` almacenado en el Context
- [x] El botón **Enviar comanda** muestra un estado de carga mientras espera la respuesta del servidor
- [x] Un `POST` exitoso muestra la confirmación con el `_id` del pedido y limpia el Context
- [x] Thunder Client confirma que el pedido fue almacenado correctamente en MongoDB
- [x] `checklist.md` contiene todas las secciones marcadas con `[x]` y `estado: completado`