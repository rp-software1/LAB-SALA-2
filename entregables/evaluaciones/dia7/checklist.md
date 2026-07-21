# Checklist del Proyecto - Sistema de Pedidos

Estado: Completado
Demostración: [Ver video en Loom](https://www.loom.com/share/TU_LINK_AQUI)

---

## Configuración e Integración

- [x] Existe `src/context/PedidoContext.jsx` con `createContext`, `Provider` y `usePedido` custom hook.
- [x] `PedidoProvider` envuelve la app en `main.jsx`.

## Flujo de Pantallas

- [x] Agregar plato en `MenuPage` actualiza el badge sin navegar a `CarritoPage`.
- [x] Navegar a `CarritoPage` muestra los mismos items — sin `useState` local.

## Lógica del Pedido

- [x] Agregar el mismo plato dos veces incrementa cantidad — no crea dos filas.
- [x] El total se calcula correctamente con `precio × cantidad` de cada item.
- [x] `limpiarPedido()` resetea todo al estado inicial.