// Migration: Create dbo.Place table
'use strict';

const up = async (queryInterface, Sequelize) => {
  // Crear el esquema public si no existe
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS public;');
  
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
          schema: 'public'
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
    schema: 'public'
  });

  // Agregar índice para búsquedas por categoría
  try {
    await queryInterface.addIndex({
      tableName: 'Place',
      schema: 'public'
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
    schema: 'public'
  });
};

export { up, down };