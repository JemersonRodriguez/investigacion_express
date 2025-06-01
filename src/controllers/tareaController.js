import * as tareaService from '../services/tareaService.js';
import models from '../models/index.cjs';
const { Usuario } = models;

export const createTarea = async (req, res) => {
  try {
    const { body, file } = req;

    // Validar que usuarioId exista y no sea ADMIN
    if (!body.usuarioId) {
      return res.status(400).json({ error: "usuarioId es requerido" });
    }

    const usuario = await Usuario.findByPk(body.usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (usuario.rol === "ADMIN") {
      return res.status(400).json({ error: "No se puede asignar tareas a un usuario ADMIN" });
    }

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

    const tarea = await tareaService.getTareaById(tareaId);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (rol === 'USER') {
      // Solo puede actualizar el estado_tarea y solo su propia tarea
      if (tarea.usuarioId !== userId) {
        return res.status(403).json({ error: 'No autorizado' });
      }
      // Solo permitir actualizar estado_tarea
      data = { estado_tarea: data.estado_tarea };
    } else if (rol === 'ADMIN') {
      // El admin NO puede editar si la tarea está INICIADA o TERMINADA
      if (tarea.estado_tarea === 'INICIADA' || tarea.estado_tarea === 'TERMINADA') {
        return res.status(403).json({ error: 'No se puede editar una tarea iniciada o terminada' });
      }
      // El admin puede actualizar cualquier campo
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
    const tarea = await tareaService.getTareaById(req.params.id);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

    // Solo se puede eliminar si está en estado ASIGNADA
    if (tarea.estado_tarea !== 'ASIGNADA') {
      return res.status(403).json({ error: 'Solo se pueden eliminar tareas en estado ASIGNADA' });
    }

    await tareaService.deleteTarea(req.params.id);
    res.json({ mensaje: 'Tarea eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};