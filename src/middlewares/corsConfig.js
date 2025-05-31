import cors from 'cors';

const originList = ['http://127.0.0.1:5500']; // Para agregar mas dominios sin tocar el codigo de la configuracion

const corsConfig = cors({
    origin: originList,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    //Para recinir cookies o enviar desde el servidor
    //credentials: true
});

export default corsConfig; // Exporta la configuración de CORS para que pueda ser utilizada en otras partes de la aplicación