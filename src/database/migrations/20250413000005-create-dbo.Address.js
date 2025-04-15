// Migration: Create dbo.Address table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS dbo;');
  await queryInterface.createTable('Address', {
    idAddress: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    latitud: {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: false
    },
    longintude: {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
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
    schema: 'dbo',
    timestamps: true
  });

  // Agregar índice para búsquedas geográficas
  try {
    await queryInterface.addIndex({
      tableName: 'Address',
      schema: 'dbo'
    }, ['latitud', 'longintude'], {
      name: 'idx_address_coordinates'
    });
  } catch (error) {
    if (!error.message.includes('already exists')) {
      throw error;
    }
    console.log('El índice idx_address_coordinates ya existe, se omite su creación');
  }
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'Address',
    schema: 'dbo'
  });
};

export { up, down };