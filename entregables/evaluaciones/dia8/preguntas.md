Pregunta 1: El PedidoContext tiene la misma forma que el modelo Pedido en NestJS. ¿Por qué crees que se diseñó así? ¿Qué ventaja da cuando llegue el momento de conectar el frontend con la API real?

Respuesta 1:
Se diseñó así para mantener simetría entre el frontend y el backend. La ventaja es que evitas transformar o mapear datos: la información que devuelve la API entra tal cual al contexto, y lo que envías al servidor sale directamente con la misma estructura (DTO). Esto reduce errores de integración y hace el código fácil de mantener.

Pregunta 2: Describe la diferencia entre createContext, Provider y useContext. ¿Cuándo se usa cada uno? ¿Quién crea el estado, quién lo comparte y quién lo lee?

Respuesta 2:

    createContext: Define la estructura o el canal por donde viajarán los datos. Se usa una sola vez al declarar el archivo del contexto.

    Provider: Crea y comparte el estado. Es el componente que contiene la lógica (useState, funciones) y envuelve a la app para poner la información disponible a los componentes hijos.

    useContext: Lee el estado. Es el hook que utiliza cualquier componente secundario para extraer los datos o funciones que necesita.