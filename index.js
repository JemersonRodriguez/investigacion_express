import "dotenv/config"; //Carga por medio de la libreria dotenv las variables de entorno definidas en el .env del proyecto
import express from "express"; // Importa el framework express para crear el servidor web

const PORT = process.env.PORT || 3000; // Define el puerto en el que el servidor escuchará,
//tomando el valor de la variable de entorno PORT o 3000 por defecto

const app = express(); // Crea una instancia de la aplicación express

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
}); // Inicia el servidor y muestra un mensaje en la consola indicando que está corriendo en el puerto especificado
