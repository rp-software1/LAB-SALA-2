1. El problema real que resolvieron los Hooks
La reutilización de lógica.
Antes, para compartir lógica de estado (ej. saber si el usuario está conectado a internet), tenías que usar patrones horribles que llenaban tu código de componentes "envoltorios" vacíos (wrapper hell). Con los Hooks, esa misma lógica la metes en una función (useOnlineStatus) y la usas en una sola línea donde quieras.

2. ¿Setters separados o un solo objeto?
Un solo objeto para formularios grandes.
Escribir un setter individual para un formulario de 10 campos es una tortura de código repetitivo. Es mucho más limpio tener un objeto y actualizarlo con una sola función usando el operador spread:

setForm(prev => ({ ...prev, [name]: value })).

(Para variables que no tienen nada que ver entre sí, como cargando y mensaje, sí es mejor dejarlas separadas).

3. ES6 Classes vs. React.Component
En qué se parecen: Usan la misma sintaxis de JavaScript (el constructor, extends y super(props)).

Qué agrega React: Le mete "superpoderes" para interactuar con la pantalla: this.setState (para avisarle a React que redibuje la UI) y los métodos de ciclo de vida (como componentDidMount).

4. La pregunta para mañana
"Si llamamos a varios useState seguidos sin ponerles un nombre o ID, ¿cómo sabe React qué estado le pertenece a qué variable cuando el componente se vuelve a ejecutar?"

(Spoiler: Depende 100% del orden en que los escribes. Por eso no puedes meter un Hook dentro de un if).