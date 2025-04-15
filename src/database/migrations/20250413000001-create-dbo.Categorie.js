// Migration: Create Categorie table
'use strict';

const up = async (queryInterface, Sequelize) => {
  // Crear el esquema dbo si no existe
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS dbo;');

  // Luego crear la tabla en el esquema dbo
  await queryInterface.createTable('Categorie', {
    idCategorie: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    schema: 'dbo'
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'Categorie',
    schema: 'dbo'
  });

  // Opcionalmente eliminar el esquema si está vacío
  // await queryInterface.sequelize.query('DROP SCHEMA IF EXISTS dbo CASCADE;');
};

export { up, down };