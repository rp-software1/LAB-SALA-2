1. ¿Qué hace main.jsx? ¿Qué pasa si lo borro?
Es el archivo que conecta React con el HTML. Si lo borras, la app muere; el navegador ya no sabrá dónde cargar tus componentes y la pantalla se quedará en blanco.

2. ¿Por qué PlatoCard está en components/ y Home en pages/?

components/: Son las piezas pequeñas y reutilizables (como los bloques de construcción).

pages/: Es donde armas la pantalla completa organizando esas piezas.

3. ¿Por qué el import funciona con Vite y no antes?
Antes, con el CDN, el navegador no entendía cómo conectar archivos JS entre sí. Vite actúa como un traductor que empaqueta todo el código para que el navegador pueda leer los archivos correctamente.

4. ¿Qué va en hooks/, services/ y context/?

hooks/: Lógica para reutilizar funciones entre varios componentes.

services/: Las llamadas a la API para traer datos reales.

context/: Información global (como un carrito) que varios componentes necesitan compartir.

Se empezarán a usar apenas el proyecto crezca y necesitemos dejar de manejar todo desde los componentes principales.