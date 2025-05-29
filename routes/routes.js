const express = require("express");
const tasksRoutes = require("./tasks");

//** Las rutas estan pensadas para agregar a futuro
// nuevas rutas y ordenarlas para facil mantenibilidad de
// endpoints y segmentar funciones futuras
// este es un ejemplo de como realizo segmentacion de endpoints */

const router = express.Router();

router.use("/tasks", tasksRoutes);

module.exports = router;
