import "dotenv/config"; //Carga por medio de la libreria dotenv las variables de entorno definidas en el .env del proyecto
import express from "express"; // Importa el framework express para crear el servidor web
import userRoutes from "./src/routes/userRoutes.js"; // Importa las rutas de usuario definidas en userRoutes.js
import tareaRoutes from "./src/routes/tareaRoutes.js"; // Importa las rutas de tareas definidas en tareaRoutes.js
import authRoutes from "./src/routes/authRoutes.js"; // Importa las rutas de autenticación definidas en authRoutes.js
import logger from "./src/utils/logger.js"; // Importa el logger para manejar los logs de la aplicación

const PORT = process.env.PORT || 3000; // Define el puerto en el que el servidor escuchará,
//tomando el valor de la variable de entorno PORT o 3000 por defecto

const app = express(); // Crea una instancia de la aplicación express
app.use(express.json()); // Configura la aplicación para que pueda parsear JSON en las solicitudes entrantes

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
}); // Middleware para registrar las solicitudes entrantes en la consola

//Rutas Base
app.use('/api/usuarios', userRoutes);
app.use('/api/tareas' , tareaRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
}); // Inicia el servidor y muestra un mensaje en la consola indicando que está corriendo en el puerto especificado
