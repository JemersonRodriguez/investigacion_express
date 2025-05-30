import { comparePassword } from '../utils/hash.js'; 
import { generarToken } from '../utils/jwt.js';
import db from '../models/index.cjs';

const { Usuario } = db;

export const loginService = async ({ email, password }) => {
  const user = await Usuario.findOne({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Contraseña incorrecta');

  const payload = { id: user.id, rol: user.rol };
  const token = generarToken(payload);

  return {
    token,
    usuario: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    }
  };
};
