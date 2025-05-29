const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Conexión a la base de datos
const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) console.error("Error connecting to the database:", err.message);
});

// Crear una nueva tarea
router.post("/", (req, res) => {
  const { titulo, descripcion } = req.body;
  if (!titulo || titulo.length > 100) {
    return res.status(400).json({
      error: "El título es obligatorio y debe tener máximo 100 caracteres",
    });
  }
  if (descripcion && descripcion.length > 500) {
    return res
      .status(400)
      .json({ error: "La descripción debe tener máximo 500 caracteres" });
  }
  const sql = `INSERT INTO tasks (titulo, descripcion, status, fechaCreacion, fechaActualizacion) 
                 VALUES (?, ?, 'pendiente', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
  db.run(sql, [titulo, descripcion || ""], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const newTask = {
      id: this.lastID,
      titulo,
      descripcion,
      status: "pendiente",
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
    };
    req.io.emit("newTask", newTask);
    res.status(201).json(newTask);
  });
});

// Actualizar el estado de una tarea
router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: "El estado es obligatorio" });
  }
  const sql = `UPDATE tasks SET status = ?, fechaActualizacion = CURRENT_TIMESTAMP WHERE id = ?`;
  db.run(sql, [status, taskId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    req.io.emit("taskUpdated", { id: taskId, status });
    res.status(200).json({ message: "Tarea actualizada" });
  });
});

// Obtener todas las tareas
router.get("/", (req, res) => {
  const sql = `SELECT * FROM tasks`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    req.io.emit("fetchTasks");
    res.status(200).json(rows);
  });
});

// Eliminar una tarea
router.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  const sql = `DELETE FROM tasks WHERE id = ?`;
  db.run(sql, [taskId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    req.io.emit("taskDeleted", { id: taskId });
    res.status(200).json({ message: "Tarea eliminada" });
  });
});

module.exports = router;
