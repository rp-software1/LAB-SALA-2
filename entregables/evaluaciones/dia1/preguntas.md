=========================================
REGLA 1 — UN SOLO ELEMENTO RAÍZ
=========================================

Pregunta:
¿Por qué JSX necesita un solo elemento raíz? ¿Qué es un Fragment (<> </>) y cuándo conviene usarlo en vez de un <div>?

Respuesta:
JSX necesita un solo elemento raíz porque React solo puede devolver un elemento principal por componente. Si queremos mostrar varios elementos sin agregar un <div>, usamos un Fragment (<> </>). Conviene usarlo cuando no queremos crear etiquetas innecesarias en el HTML.


=========================================
REGLA 2 — className EN VEZ DE class
=========================================

Pregunta:
¿Qué ocurre si escribimos <li class="plato-agotado">? ¿Cuál es la diferencia entre un error y un warning en React?

Respuesta:
React muestra un warning indicando que debemos usar className en lugar de class. Un error impide que el código funcione, mientras que un warning solo avisa que hay una práctica incorrecta, pero la aplicación normalmente sigue ejecutándose.


=========================================
REGLA 3 — LAS LLAVES {} SON PARA EXPRESIONES
=========================================

Pregunta:
¿Por qué if no funciona dentro de JSX pero el operador ternario sí? ¿Cuál es la diferencia entre una expresión y una sentencia en JavaScript?

Respuesta:
if no funciona porque es una sentencia, y JSX solo permite colocar expresiones dentro de las llaves {}. El operador ternario sí es una expresión y devuelve un valor, por eso puede usarse para mostrar contenido de forma condicional.

Ejemplo:

{plato.disponible ? "✅ Disponible" : "❌ No disponible"}


=========================================
REGLA 4 — KEY EN LISTAS
=========================================

Pregunta:
¿Por qué React necesita la propiedad key al renderizar listas? ¿Qué le permite hacer al Virtual DOM?

Respuesta:
React necesita key para identificar cada elemento de una lista. De esta forma el Virtual DOM sabe cuál elemento cambió, cuál se agregó o cuál se eliminó, y solo actualiza esa parte de la interfaz en lugar de volver a renderizar toda la lista. Esto hace que la aplicación sea más rápida y eficiente.