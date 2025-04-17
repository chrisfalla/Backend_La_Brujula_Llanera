// Migration: Create Categorie table
'use strict';

const up = async (queryInterface, Sequelize) => {
  // Crear el esquema public si no existe
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS public;');

  // Luego crear la tabla en el esquema public
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
    schema: 'public'
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'Categorie',
    schema: 'public'
  });

  // Opcionalmente eliminar el esquema si está vacío
  // await queryInterface.sequelize.query('DROP SCHEMA IF EXISTS public CASCADE;');
};

export { up, down };