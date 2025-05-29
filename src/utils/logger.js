import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // niveles: error, warn, info, verbose, debug, silly
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(), // muestra en consola
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // errores
    new winston.transports.File({ filename: 'logs/combined.log' }) // todos
  ],
});

export default logger;
