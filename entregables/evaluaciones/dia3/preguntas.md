1. Diferencia entre props y estado (MesaCard)

Props: Son datos que le llegan al componente desde afuera (el padre). Ejemplo: el número de mesa o la capacidad; la mesa no decide eso, alguien más se lo dice.

Estado: Es la información que el componente maneja por sí mismo y que puede cambiar. Ejemplo: el estado de la mesa (si está "ocupada" o "libre"). En el futuro, la mesa misma cambiará ese valor según lo que pase.

2. ¿Por qué las props son de solo lectura?
Porque si el hijo pudiera cambiar las props, se volvería un caos. El padre perdería el control de la información y no sabría qué está pasando. Si MesaCard modificara su número de mesa por su cuenta, el padre seguiría pensando que es la mesa anterior y la aplicación se volvería inconsistente.

3. ¿Qué cambia en NavBar en el Día 7?
Lo que cambia: Vas a quitar el texto plano y poner componentes de navegación (como Link o NavLink) para que al hacer clic realmente te muevas entre páginas.

Lo que NO tocas: La estructura visual o el diseño del NavBar, porque eso ya está definido; solo cambias la forma en que los botones reaccionan al clic.

4. ¿Cómo revisar props en DevTools?
Es fácil: vas a la pestaña Components en las herramientas de desarrollador, seleccionas el componente que quieres revisar y ahí te sale una sección llamada "props". Te muestra exactamente qué datos está recibiendo ese componente en tiempo real, sin tener que mirar ni una línea del código del padre.