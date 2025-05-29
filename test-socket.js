const io = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("newTask", (task) => {
  console.log("Nueva Tarea Recibida:", task);
});

socket.on("fetchTasks", () => {
  console.log("Tareas obtenidas");
});

socket.on("taskUpdated", (data) => {
  console.log("Tarea Actualizada:", data);
});

socket.on("taskDeleted", (data) => {
  console.log("Tarea Eliminada:", data);
});
