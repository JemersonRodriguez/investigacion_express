import { Router } from 'express';
import * as UserController from '../controllers/userController.js'; // Importa el controlador de usuarios

const router = Router();

router.get('/', UserController.getAllUsuarios);
router.get('/:id', UserController.getUsuarioById);
router.post('/', UserController.createUsuario);
router.patch('/:id', UserController.updateUsuario);
router.delete('/:id', UserController.deleteUsuario);

export default router;
