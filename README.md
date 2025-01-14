# **API de Gestión de Órdenes de Logística**

Este proyecto provee una API para crear, leer, actualizar y eliminar órdenes de logística, así como para aplicar filtros por estado.  
Está construido con **Node.js**, **Express** y **Mongoose** para conectarse a una base de datos **MongoDB**.

---

## **Índice**
1. [Funcionalidad de la API](#funcionalidad-de-la-api)  
2. [Estructura de Directorios](#estructura-de-directorios)  
3. [Endpoints Disponibles](#endpoints-disponibles)  
4. [Middlewares](#middlewares)  
5. [Restricciones de la Base de Datos y Validaciones](#restricciones-de-la-base-de-datos-y-validaciones)  
6. [Mensajes de Error](#mensajes-de-error)  
7. [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)  
8. [Aclaración sobre `.env`](#aclaración-sobre-env)

---

## **Funcionalidad de la API**

Esta API permite llevar un control sobre las órdenes de logística, con campos como:

- **destino**: Dirección de entrega de la orden.  
- **contenido**: Descripción del contenido de la orden.  
- **fecha_creacion**: Fecha de creación de la orden (por defecto, la fecha actual).  
- **estado**: Estado en el que se encuentra la orden, con valores restringidos a `Pendiente`, `En tránsito` o `Entregado`.

Además:
- Se pueden **filtrar** órdenes por su estado.
- Se **validan** campos para evitar inconsistencias en la base de datos.

---

## **Estructura de Directorios**

```bash
mi-proyecto
├── app.js               # Configuración principal del servidor
├── /models              # Modelos de datos (MongoDB)
│   └── Orden.js
├── /routes              # Rutas de la API
│   └── ordenes.js
├── /config              # Configuración de la base de datos
│   └── db.js
├── .env                 # Variables de entorno (MONGO_URI, etc.)
└── package.json         # Dependencias y scripts
```

---

## **Endpoints Disponibles**

1. **Listar Órdenes**  
   - **GET** `/ordenes`  
     - Retorna todas las órdenes existentes.  
     - Permite filtrar por estado usando un query param, por ejemplo:  
       - `GET /ordenes?estado=Pendiente`

2. **Obtener Orden por ID**  
   - **GET** `/ordenes/:id`  
     - Devuelve la orden que coincida con el `:id` especificado.

3. **Crear Orden**  
   - **POST** `/ordenes`  
     - Crea una nueva orden con los campos:
       ```json
       {
         "destino": "Dirección",
         "contenido": "Descripción del contenido",
         "estado": "Pendiente"
       }
       ```
     - Campos válidos para `estado`: `Pendiente`, `En tránsito`, `Entregado`.

4. **Actualizar Orden**  
   - **PUT** `/ordenes/:id`  
     - Actualiza la orden que coincida con `:id`.  
     - Incluye validaciones al momento de actualizar (p.e., el `destino` debe tener al menos 5 caracteres).

5. **Eliminar Orden**  
   - **DELETE** `/ordenes/:id`  
     - Elimina la orden cuyo `:id` coincida.

---

## **Middlewares**

En este proyecto se utilizan los siguientes **middlewares** de Express:

1. **`express.json()`**  
   - Permite parsear automáticamente el body en formato JSON.

2. **Manejo de Errores**  
   - Se utiliza `try...catch` en cada endpoint para capturar errores (validaciones de Mongoose, errores de conexión, etc.) y retornar una respuesta acorde.

> No se han configurado middlewares adicionales de seguridad (como **helmet**, **cors**, etc.) por defecto, pero pueden añadirse fácilmente de ser necesario.

---

## **Restricciones de la Base de Datos y Validaciones**

En el modelo `/models/Orden.js`, se han definido validaciones con **Mongoose**:

- **`destino`**:
  - `required`: Campo obligatorio.  
  - `minlength`: Debe tener al menos 5 caracteres.  
  - Mensaje en caso de error: `"La dirección debe tener al menos 5 caracteres"`.

- **`contenido`**:
  - `required`: Campo obligatorio.  
  - Mensaje en caso de error: `"El contenido es obligatorio"`.

- **`fecha_creacion`**:
  - `default`: Se asigna automáticamente la fecha actual (`Date.now`).

- **`estado`**:
  - `required`: Campo obligatorio.  
  - `enum`: Solo acepta `"Pendiente"`, `"En tránsito"`, `"Entregado"`.  
  - Mensaje en caso de error: `"El estado debe ser Pendiente, En tránsito o Entregado"`.

---

## **Mensajes de Error**

Si envías datos que no cumplen con las validaciones, Mongoose generará un **ValidationError**.  
En las rutas, se captura el error y se retorna un mensaje con código de estado **400 (Bad Request)**. Por ejemplo:

```json
{
  "error": "Orden validation failed: destino: La dirección debe tener al menos 5 caracteres"
}
```

Si se intenta eliminar o actualizar una orden que no existe, se devuelve un **404 (Not Found)** con un mensaje como:  
```json
{
  "error": "Orden no encontrada"
}
```

---

## **Cómo Ejecutar el Proyecto**

1. **Clona** este repositorio o descárgalo en tu máquina local.  
2. **Instala las dependencias**:
   ```bash
   npm install
   ```
3. **Configura el archivo `.env`** (ver el apartado [Aclaración sobre `.env`](#aclaración-sobre-env)).  
4. **Inicia el servidor**:
   ```bash
   npm start
   ```
   o, si prefieres usar `nodemon` para recarga automática:
   ```bash
   npm run dev
   ```
5. Verifica el mensaje en la consola que indica que el servidor está corriendo y luego podrás acceder a la API en `http://localhost:<PUERTO>` (por defecto, 3000).

---

## **Aclaración sobre `.env`**

Para **no exponer** credenciales sensibles en tu repositorio, se emplea la librería `dotenv`.  
Deberás crear un archivo `.env` en la raíz del proyecto