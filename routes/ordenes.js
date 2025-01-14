// /routes/ordenes.js

const express = require('express');
const router = express.Router();
const Orden = require('../models/Orden');

// 1. GET /ordenes (Listar todas las órdenes con filtro opcional por estado)
router.get('/', async (req, res) => {
  try {
    const { estado } = req.query; // /ordenes?estado=Pendiente

    let query = {};
    if (estado) {
      query.estado = estado;
    }

    const ordenes = await Orden.find(query);
    return res.status(200).json(ordenes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. GET /ordenes/:id (Obtener una orden por su ID)
router.get('/', async (req, res) => {
    try {
      const { estado } = req.query;
  
      let filtro = {};
      if (estado) {
        filtro.estado = estado;  // Agrega la condición de búsqueda sólo si llega el query param
      }
  
      const ordenes = await Orden.find(filtro);
      return res.status(200).json(ordenes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  

// 3. POST /ordenes (Crear una nueva orden)
router.post('/', async (req, res) => {
  try {
    const { destino, contenido, fecha_creacion, estado } = req.body;

    const nuevaOrden = new Orden({
      destino,
      contenido,
      fecha_creacion,
      estado,
    });

    const ordenGuardada = await nuevaOrden.save();
    return res.status(201).json(ordenGuardada);
  } catch (error) {
    // Posible manejo de error por validaciones de mongoose
    return res.status(400).json({ error: error.message });
  }
});

// 4. PUT /ordenes/:id (Actualizar una orden existente)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { destino, contenido, fecha_creacion, estado } = req.body;

    const ordenActualizada = await Orden.findByIdAndUpdate(
      id,
      { destino, contenido, fecha_creacion, estado },
      { new: true, runValidators: true } // new: true retorna el documento actualizado
    );

    if (!ordenActualizada) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    return res.status(200).json(ordenActualizada);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 5. DELETE /ordenes/:id (Eliminar una orden)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const ordenEliminada = await Orden.findByIdAndDelete(id);
    if (!ordenEliminada) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    return res.status(200).json({ mensaje: 'Orden eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
