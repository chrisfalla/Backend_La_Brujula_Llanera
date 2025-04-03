import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, // Host de la base de datos desde .env
    dialect: 'postgres',
    logging: false, // Desactiva el logging para evitar ruido en la consola
});

(async () => {
    try {
        // Probar la conexión
        await sequelize.authenticate();
        console.log('Conexión exitosa con la base de datos.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    } finally {
        // Cerrar la conexión
        await sequelize.close();
    }
})();
