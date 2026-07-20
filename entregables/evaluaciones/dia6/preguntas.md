1. El mock del Día 5 y la API del Día 6 devuelven platos con la misma forma. ¿Qué ventaja tiene eso?

La ventaja es que no tuve que cambiar casi nada del componente. Solo cambié la forma de obtener los datos (del mock a Axios), pero el resto del código siguió fungicionando porque ambos usan los mismos campos. Si la API hubiera devuelto una estructura diferente, habría tenido que modificar las referencias a los datos dentro del componente.

------------------------------------------------------------

2. Explica el patrón loading/error/data con tus propias palabras. ¿Por qué los tres estados son necesarios?

Loading sirve para avisar al usuario que la información se está cargando. Error muestra un mensaje si ocurre algún problema con la petición. Data contiene los datos cuando todo sale bien. Los tres son importantes porque sin loading el usuario pensaría que la página está congelada, sin error no sabría qué pasó si falla la carga y sin data no habría información para mostrar.

------------------------------------------------------------

3. El jueves comienza la integración cruzada con el Grupo A. ¿Qué preguntas concretas tienes sobre el backend?

- ¿Cuál es la URL correcta del servidor?
- ¿Qué rutas están disponibles además de /api/platos?
- ¿Qué datos devuelve exactamente cada endpoint?
- ¿Cómo manejan los errores del servidor?
- ¿Será necesario enviar un token JWT para acceder a las rutas?

------------------------------------------------------------

4. Describe con tus palabras qué es un JWT y cómo fluye entre frontend y backend.

Un JWT es un token que sirve para identificar a un usuario después de iniciar sesión. El backend lo genera cuando el usuario ingresa correctamente y el frontend lo guarda para enviarlo en las siguientes peticiones. El backend verifica ese token y, si es válido, permite acceder a los recursos protegidos. Todavía necesito practicar un poco más cómo se valida el token internamente en el servidor.