# 📋 Predicciones - React + TypeScript

## 1. Antes de ejecutar

### ¿Qué archivo generará el comando de instalación además de actualizar `package.json`?

**Respuesta:**

El comando también generará el archivo **`package-lock.json`**, que guarda las versiones exactas de todas las dependencias instaladas para mantener un entorno consistente.

### ¿Qué opciones del `tsconfig.json` son específicas para React con JSX?

**Respuesta:**

Las principales opciones son:

- `"jsx": "react-jsx"`
- `"jsxImportSource"` (cuando se utiliza)
- Configuraciones relacionadas con React y JSX.

---

## 2. Antes de ejecutar

### ¿Cuántos archivos vas a renombrar en total? Lista sus nombres.

**Respuesta:**

Voy a renombrar los archivos JavaScript para convertirlos a TypeScript.

- `App.jsx` → `App.tsx`
- `main.jsx` → `main.tsx`
- `PlatoCard.jsx` → `PlatoCard.tsx`
- `MesaCard.jsx` → `MesaCard.tsx`
- `NavBar.jsx` → `NavBar.tsx`
- `MenuPage.jsx` → `MenuPage.tsx`
- `MesasPage.jsx` → `MesasPage.tsx`
- `CarritoPage.jsx` → `CarritoPage.tsx`
- `DetalleMesa.jsx` → `DetalleMesa.tsx`

> *(Si tu proyecto tiene más o menos archivos, ajusta la lista.)*

### ¿En qué tipo de líneas crees que aparecerá el primer error de TypeScript?

**Respuesta:**

Probablemente aparecerá en las líneas donde faltan tipos para las props, parámetros de funciones, estados (`useState`) o datos que llegan desde la API.

---

## 3. Antes de modificar `PlatoCard.tsx`

### ¿Qué propiedades tiene un plato según el modelo de datos del sistema?

| Propiedad | Tipo |
|-----------|------|
| `_id` | `string` |
| `nombre` | `string` |
| `precio` | `number` |
| `categoria` | `string` |
| `disponible` | `boolean` |

---

## 4. Antes de modificar `MesaCard.tsx`

### ¿Qué props recibe `MesaCard`?

**Respuesta:**

Recibe una prop llamada `mesa`, que contiene información como:

- `id`
- `numero`
- `capacidad`
- `estado`
- `comensales`

### ¿TypeScript puede inferir el tipo de retorno de una función que retorna JSX sin declararlo?

**Respuesta:**

Sí. TypeScript puede inferir automáticamente que la función devuelve JSX, por lo que normalmente no es necesario declarar el tipo de retorno.

---

## 5. Antes de modificar `api.ts`

### Si `getMesas()` retorna `Promise<Mesa[]>`, ¿qué tipo tiene `mesas` en este código?

```ts
const mesas = await getMesas();
```

**Respuesta:**

```ts
Mesa[]
```

Porque `await` espera a que la promesa se resuelva y devuelve directamente el arreglo de mesas, no la promesa.