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

server.js es la porcion de codigo que inicializa express, la base de datos y socket.io
tecnicamente es la base del backend, al iniciar carga un frontend basico que demuestra las
funcionalidades de la API REST al momento de ingresar datos, actualizarlos, seleccionarlos y
Eliminarlos.

Decidi separar la api en rutas que es contactado desde el server.js, la api "v1" como le llame
redirige a routes.js el cual es el centro de redireccion para tasks.js, ademas de usarlo como
redireccionador tome este metodo ya que quise ejemplificar una metodologia escalable, pero en este caso solo redirecciona la api a "tasks.js" que es el que tiene las funciones basicas de la API.

en tasks.js tenemos las funciones principales descritas en la seccion "Pruebas de la API", la cual tiene una funcion POST para crear las tareas validando que ningun campo este vacio o se pase del limite de caracteres, tenemos un metodo GET para obtener los valores que estan actualmente guardados en la tabla y ademas poblar nuestra tabla del front end, un metodo PUT para actualizar el estado de la tarea y por ultimo un DELETE para eliminar la tarea o mejor dicho la columna en la base de datos.

Añadi tests antes de programar el front end para probar las funcionalidades al momento de realizarlas.
