import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import process from 'node:process'; // Asegúrate de importar process si es necesario

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa con la base de datos.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
  } finally {
    await sequelize.close();
  }
})();
