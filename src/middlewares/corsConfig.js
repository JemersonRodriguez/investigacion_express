import cors from 'cors';

originList = ['http://localhost:5500/view/index.html']; // Para agregar mas dominios sin tocar el codigo de la configuracion

export default corsConfig = cors({
    origin: originList,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    //Para recinir cookies o enviar desde el servidor
    //credentials: true
});