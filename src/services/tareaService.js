import db from '../models/index.cjs';

const { Tarea } = db;

export const createTarea = async (data) => {
  return await Tarea.create(data);
};

export const getTareas = async () => {
  return await Tarea.findAll();
};

export const getTareaById = async (id) => {
  return await Tarea.findByPk(id);
};

export const updateTarea = async (id, data) => {
  const tarea = await Tarea.findByPk(id);
  if (!tarea) return null;
  await tarea.update(data);
  return tarea;
};

export const deleteTarea = async (id) => {
  const tarea = await Tarea.findByPk(id);
  if (!tarea) return null;
  await tarea.destroy();
  return true;
};
