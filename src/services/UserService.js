import db from '../models/index.cjs';
import { hashPassword } from '../utils/hash.js';
const { Usuario } = db;

export const findAllUsuarios = async () => {
  return await Usuario.findAll({ include: ['tareas'] }); // opcional: incluir tareas
};

export const findUsuarioById = async (id) => {
  return await Usuario.findByPk(id, { include: ['tareas'] });
};

export const createUsuario = async (data) => {
  data.password = await hashPassword(data.password); // Hash de la contraseña
  return await Usuario.create(data);
};

export const updateUsuario = async (id, data) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  return await usuario.update(data);
};

export const deleteUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  await usuario.destroy();
  return true;
};
