'use strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import process from 'node:process';
import configFile from '../../config/config.js'; // ✅ Ruta correcta al archivo de configuración

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

async function initializeModels() {
  const files = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 && // Excluye archivos ocultos
        file !== basename && // Excluye este archivo (index.js)
        file.slice(-3) === '.js' // Solo incluye archivos .js
      );
    });

  for (const file of files) {
    console.log(`Cargando modelo desde archivo: ${file}`);
    const modelPath = path.join(__dirname, file);
    const model = (await import(`file://${modelPath}`)).default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

await initializeModels();

if (!db.Categorie) {
  console.error("❌ El modelo 'Categorie' no se cargó correctamente. Verifica su definición en 'categorie.js'.");
} else {
  console.log("✅ Modelo 'Categorie' cargado correctamente.");
}

export default db;
