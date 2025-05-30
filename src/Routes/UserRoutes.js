import { Router } from 'express';
import * as UserController from '../controllers/userController.js'; // Importa el controlador de usuarios
import autenticar from '../middlewares/autenticarUser.js';
import authorizeRoles from '../middlewares/verificarUser.js';

const router = Router();

router.get('/', autenticar, authorizeRoles('admin'), UserController.getAllUsuarios);
router.get('/:id', autenticar, authorizeRoles('admin'), UserController.getUsuarioById);
router.post('/', autenticar, authorizeRoles('admin', 'user'), UserController.createUsuario);
router.patch('/:id', autenticar, authorizeRoles('admin', 'user'), UserController.updateUsuario);
router.delete('/:id', autenticar, authorizeRoles('admin', 'user'), UserController.deleteUsuario);

export default router;
