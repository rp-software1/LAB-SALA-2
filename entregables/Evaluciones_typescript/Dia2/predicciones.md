Archivos con tipos duplicados: api.ts, MesaCard.tsx, PlatoCard.tsx
Tipos que se repiten: EstadoMesa, Mesa, Plato, EstadoPedido

Hallazgo extra: Plato tiene DOS formas distintas y no coinciden:
  - api.ts / platosMock.js → solo {_id, nombre, precio}
  - PlatoCard.tsx → espera {_id, nombre, descripcion, precio, categoria, disponible}
  El mock nunca fue actualizado cuando PlatoCard creció. Bug latente sin detectar
  porque las interfaces nunca se comparan entre sí al estar duplicadas.
  
  
Cantidad de declaraciones duplicadas que vas a eliminar: 5
  (type EstadoMesa, type EstadoPedido, interface Plato, interface Mesa, interface Pedido — en api.ts)
  + interface Mesa y type EstadoMesa en MesaCard.tsx
  + interface Plato en PlatoCard.tsx

Tipos que se van a eliminar de api.ts: EstadoMesa, EstadoPedido, Plato, Mesa, Pedido 