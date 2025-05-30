import { Router } from "express";
import { loginController } from '../controllers/authController.js'; // Importa el controlador de autenticación

const router = Router();

router.post('/login', loginController);

export default router;