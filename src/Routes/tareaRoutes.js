import { Router } from 'express';
import uploadImage from '../middlewares/multerImageUpload.js';
import * as tareaController from '../controllers/tareaController.js';

const router = Router();

// Crear tarea con imagen
router.post('/', uploadImage.single('imagen'), tareaController.createTarea);

// Obtener todas las tareas
router.get('/', tareaController.getTareas);

// Obtener una tarea por ID
router.get('/:id', tareaController.getTareaById);

// Actualizar tarea
router.patch('/:id', uploadImage.single('imagen'), tareaController.updateTarea);

// Eliminar tarea
router.delete('/:id', tareaController.deleteTarea);

export default router;
