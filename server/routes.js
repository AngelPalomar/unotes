// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();

const tareasData = [{ nombreTarea: 'Tarea inicial', completada: false }];

// Get mensajes
router.get('/', function (req, res) {
  res.json(tareasData);
});

//Post mensajes
router.post('/create-tarea', function (req, res) {
  const newTareaValue = {
    nombreTarea: req.body.nombreTarea,
    completada: false,
  };

  tareasData.push(newTareaValue);

  res.json({
    ok: true,
    tareas: tareasData,
  });
});

router.put('/complete-tarea', function (req, res) {
  tareasData[req.body.id].completada = true;
  newTareaValue = tareasData[req.body.id];

  res.json({
    ok: true,
    tareas: tareasData,
  });
});

router.delete('/delete-tarea', function (req, res) {
  tareaId = req.body.id;
  tareaToDelete = tareasData[req.body.id];

  tareasData.splice(tareaId, 1);

  res.json({
    ok: true,
    tareas: tareasData,
  });
});

module.exports = router;
