import * as tareaService from '../services/tareaService.js';

export const createTarea = async (req, res) => {
  try {
    const { body, file } = req;

    const nuevaTarea = await tareaService.createTarea({
      ...body,
      imagen_ruta: file ? file.filename : null
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTareas = async (req, res) => {
  try {
    const tareas = await tareaService.getTareas();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTareaById = async (req, res) => {
  try {
    const tarea = await tareaService.getTareaById(req.params.id);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTarea = async (req, res) => {
  try {
    const { body, file } = req;

    const actualizada = await tareaService.updateTarea(req.params.id, {
      ...body,
      imagen_ruta: file ? file.filename : undefined // No reemplazar si no hay imagen nueva
    });

    if (!actualizada) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTarea = async (req, res) => {
  try {
    const eliminada = await tareaService.deleteTarea(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

    res.json({ mensaje: 'Tarea eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
