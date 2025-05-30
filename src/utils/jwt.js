import jwt from 'jsonwebtoken';

// Puedes poner esta clave en variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

/**
 * Genera un token JWT con datos personalizados.
 * @param {Object} payload - Información que irá en el token.
 * @param {String} expiresIn - Tiempo de expiración (ej: '1h', '7d').
 */
export const generarToken = (payload, expiresIn = JWT_EXPIRATION) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

/**
 * Verifica un token JWT.
 * @param {String} token - Token a validar.
 * @returns {Object} - Datos decodificados si es válido.
 * @throws {Error} - Si el token es inválido o expiró.
 */
export const verificarToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
