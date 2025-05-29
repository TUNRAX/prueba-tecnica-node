const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const sqlite3 = require("sqlite3").verbose();
const routes = require("./routes/routes");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.json());

// Hacer que io esté disponible en las rutas
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Conectar a la base de datos
const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite.");
  }
});

// Servir el frontend
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Redirigir solicitudes /v1 al enrutador
app.use("/v1", routes);

// Escuchar conexiones de Socket.io
io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado:", socket.id);
  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado:", socket.id);
  });
});

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Cierra la base de datos al apagar el servidor
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) console.error("Error al cerrar la base de datos:", err.message);
    console.log("Base de datos cerrada.");
    process.exit(0);
  });
});
