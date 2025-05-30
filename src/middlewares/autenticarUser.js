import { verificarToken } from '../utils/jwt.js'; // Asegúrate de que la ruta sea correcta

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization; //Se extrae el header de autorización
  const token = authHeader && authHeader.split(' ')[1]; //Se obtiene el token del header, si existe

  // Si no hay token, se retorna un error 401
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  // Verifica el token usando la función de verificación
  const payload = verificarToken(token);
  //console.log('Payload:', payload); // Para depuración, puedes eliminarlo en producción
  // Si el token es inválido o expiró, se retorna un error 403
  if (!payload) return res.status(403).json({ message: 'Token inválido' });

  // Pasa a la request el payload decodificado
  req.user = payload;
  // Continúa con el siguiente middleware o ruta
  next();
}

export default autenticar;
