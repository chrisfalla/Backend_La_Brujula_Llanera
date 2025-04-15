// Migration: Create dbo.Place table
'use strict';

const up = async (queryInterface, Sequelize) => {
  // Crear el esquema dbo si no existe
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS dbo;');
  
  await queryInterface.createTable('Place', {
    idPlace: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    idCategorie: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Categorie',
          schema: 'dbo'
        },
        key: 'idCategorie'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
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

  // Agregar índice para búsquedas por categoría
  try {
    await queryInterface.addIndex({
      tableName: 'Place',
      schema: 'dbo'
    }, ['idCategorie'], {
      name: 'idx_place_categorie'
    });
  } catch (error) {
    if (!error.message.includes('already exists')) {
      throw error;
    }
    console.log('El índice idx_place_categorie ya existe, se omite su creación');
  }
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'Place',
    schema: 'dbo'
  });
};

export { up, down };