# API de Gestión de Tareas Test Tecnico

## Modulos a instalar

- para correr backend nescesitamos las siguientes dependencias: `npm install express sqlite3 socket.io`
- para pruebas de websockets: `npm install socket.io-client`
- o tambien se puede instalar las dependencias con `npm install`

## Ejecución

- Inicia el servidor: `node server.js`.
- Accede en navegador a: `http://localhost:3000`.

## Pruebas de la API

- Usa Postman o curl para probar:
  - `POST /v1/tasks`: Crear tarea.
  - `GET /v1/tasks`: Obtener las tareas creadas.
  - `PUT /v1/tasks/:id`: Actualiza el estado de la tarea señalada.
  - `DELETE /v1/tasks/:id`: Elimina la tarea señalada.

## Pruebas de WebSockets

1. Ejecuta el script de prueba en una terminal aparte: `node test-socket.js`.
2. Realiza acciones en la API y observa los eventos en la consola (sea por front end o llamando a la api en postman).
3. Los tests deberian mostrarse en consola.

## Explicacion codigo

server.js es la parte del código que inicializa Express, la base de datos y Socket.IO. Técnicamente, constituye la base del backend. Al iniciarse, carga un frontend básico que demuestra las funcionalidades de la API REST, permitiendo ingresar, actualizar, seleccionar y eliminar datos.

Decidí separar la API en rutas que se gestionan desde server.js. La API, a la que denominé "v1", redirige a routes.js, que actúa como el centro de redirección hacia tasks.js. Opté por este método para ejemplificar una metodología escalable. En este caso, routes.js solo redirige la API a tasks.js, donde se encuentran las funciones básicas de la API.

En tasks.js se implementan las funciones principales descritas en la sección "Pruebas de la API". Incluye un método POST para crear tareas, validando que ningún campo esté vacío o exceda el límite de caracteres; un método GET para obtener los datos almacenados en la tabla y poblar la tabla del frontend; un método PUT para actualizar el estado de una tarea; y un método DELETE para eliminar una tarea, es decir, la correspondiente columna en la base de datos.

Antes de desarrollar el frontend, añadí pruebas para verificar las funcionalidades al implementarlas.
