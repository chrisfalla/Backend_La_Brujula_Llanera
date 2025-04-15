import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

// Usar las mismas credenciales que en config.js
const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: console.log
});

async function checkTables() {
  try {
    // Verificar conexión
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
    
    // Consultar todos los esquemas
    const [schemas] = await sequelize.query(
      "SELECT schema_name FROM information_schema.schemata;"
    );
    console.log('Esquemas disponibles:', schemas);
    
    // Consultar todas las tablas en el esquema dbo
    const [dboTables] = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'dbo';"
    );
    console.log('Tablas en esquema dbo:', dboTables);
    
    // Consultar todas las tablas en el esquema public
    const [publicTables] = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    console.log('Tablas en esquema public:', publicTables);
    
  } catch (error) {
    console.error('Error al verificar las tablas:', error);
  } finally {
    await sequelize.close();
  }
}

checkTables();
