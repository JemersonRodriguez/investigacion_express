import { Router } from 'express';
import uploadImage from '../middlewares/multerImageUpload.js';
import * as tareaController from '../controllers/tareaController.js';
import autenticar from '../middlewares/autenticarUser.js';
import authorizeRoles from '../middlewares/verificarUser.js';

const router = Router();

// Crear tarea con imagen
router.post('/', autenticar, authorizeRoles('admin'), uploadImage.single('imagen'), tareaController.createTarea);

// Obtener todas las tareas
router.get('/', autenticar, authorizeRoles('ADMIN', 'USER'), tareaController.getTareas);

// Obtener una tarea por ID
router.get('/:id', autenticar, authorizeRoles('admin', 'user'), tareaController.getTareaById);

// Actualizar tarea
router.patch('/:id', autenticar, authorizeRoles('admin' , 'user'), uploadImage.single('imagen'), tareaController.updateTarea);

// Eliminar tarea
router.delete('/:id', autenticar, authorizeRoles('admin'), tareaController.deleteTarea);

export default router;
