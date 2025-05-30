// Middleware que valida si el usuario tiene alguno de los roles permitidos
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Usuario no autenticado' });

    // Normaliza los roles a minúsculas para comparar sin importar mayúsculas/minúsculas
    //console.log("Rol de usuario: " , req.user.rol);
    const userRole = req.user.rol ? req.user.rol.toLowerCase() : '';
    const allowed = allowedRoles.map(rol => rol.toLowerCase());

    if (!allowed.includes(userRole)) {
      
      //console.log("Roles permitidos: ", allowed);
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
}

export default authorizeRoles;