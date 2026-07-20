Aquí tienes las respuestas explicadas de forma directa y con tus propias palabras:

1. ¿Por qué setCarrito y no push?
React necesita detectar cuando algo cambia para volver a dibujar la pantalla (renderizar). Si haces push directamente, el array sigue siendo el mismo objeto en memoria y React no se entera de que cambió. Al usar setCarrito, le pasas un nuevo array; esto le avisa a React: "Oye, esto es nuevo, actualiza la interfaz". El mecanismo se llama inmutabilidad.

2. useEffect hoy vs. Axios mañana

Lo que cambia: Dentro del useEffect, ya no cargarás los datos del mock estático, sino que harás la llamada a la API usando axios.get('/api/platos'). También tendrás que manejar el estado de carga (loading) y posibles errores.

Lo que se queda igual: La estructura del useEffect (el "gancho" que ejecuta la acción al cargar) y el estado donde guardas los platos seguirán siendo básicamente los mismos.

3. for loop vs. .reduce()
Sí, son equivalentes porque ambos sirven para recorrer y sumar.

.reduce(): Es mucho más limpio y profesional para "reducir" un array a un solo valor (la suma total).

for loop: Es más tradicional y básico; lo usarías solo si necesitas una lógica de control más compleja dentro del recorrido que un reduce haría difícil de leer.

4. ¿Dónde viviría el estado del carrito compartido?
Tendría que vivir en un componente "padre común" a ambos, o mejor aún, en un Context.

¿Por qué? Porque si el estado vive en uno de los hijos, el otro componente no tiene cómo acceder a esa información. Al subirlo a un Context, el estado queda "por encima" de toda la aplicación y cualquier componente puede preguntar qué hay en el carrito sin importar dónde esté ubicado.