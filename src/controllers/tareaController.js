import * as tareaService from '../services/tareaService.js';

export const createTarea = async (req, res) => {
  try {
    const { body, file } = req;

    // Normalizar estado_tarea a mayúsculas si viene en el body
    if (body.estado_tarea) {
      body.estado_tarea = body.estado_tarea.toUpperCase();
    }

    const nuevaTarea = await tareaService.createTarea({
      ...body,
      imagen_ruta: file ? file.filename : null
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTarea = async (req, res) => {
  try {
    const { rol, id: userId } = req.user;
    const tareaId = req.params.id;
    let data = req.body;

    // Normalizar estado_tarea a mayúsculas si viene en el body
    if (data.estado_tarea) {
      data.estado_tarea = data.estado_tarea.toUpperCase();
    }

    if (rol === 'USER') {
      // Solo puede actualizar el estado_tarea y solo su propia tarea
      const tarea = await tareaService.getTareaById(tareaId);
      if (!tarea || tarea.usuarioId !== userId) {
        return res.status(403).json({ error: 'No autorizado' });
      }
      // Solo permitir actualizar estado_tarea
      data = { estado_tarea: data.estado_tarea };
    }

    const tareaActualizada = await tareaService.updateTarea(tareaId, data);
    if (!tareaActualizada) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTareas = async (req, res) => {
  try {
    let tareas;
    if (req.user.rol === 'ADMIN') {
      tareas = await tareaService.getTareas();
    } else if (req.user.rol === 'USER') {
      tareas = await tareaService.getTareaByUsuarioId(req.user.id);
    } else {
      return res.status(403).json({ error: 'Rol no autorizado' });
    }
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTareaById = async (req, res) => {
  try {
    let tarea;
    if (req.params.id) {
      // Buscar por id de tarea
      tarea = await tareaService.getTareaById(req.params.id);
      if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    } else {
      // Buscar por id de usuario autenticado
      tarea = await tareaService.getTareaByUsuarioId(req.user.id);
      if (!tarea) return res.status(404).json({ mensaje: 'No tienes tareas asignadas' });
    }
    res.json(tarea);
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
