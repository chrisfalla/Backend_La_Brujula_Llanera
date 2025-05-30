// Migration: Create dbo.AddressByPlace table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS public;');
  await queryInterface.createTable('AddressByPlace', {
    idAddressByPlace: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idPlaceFk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Place',
          schema: 'public'
        },
        key: 'idPlace'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    idAddressFk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Address',
          schema: 'public'
        },
        key: 'idAddress'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    schema: 'public',
    timestamps: true
  });

  // Agregar índice compuesto para búsquedas eficientes
  try {
    await queryInterface.addIndex({
      tableName: 'AddressByPlace',
      schema: 'public'
    }, ['idPlaceFk', 'idAddressFk'], {
      name: 'idx_addressbyplace_place_address'
    });
  } catch (error) {
    if (!error.message.includes('already exists')) {
      throw error;
    }
    console.log('El índice idx_addressbyplace_place_address ya existe, se omite su creación');
  }

  // Agregar restricción de unicidad
  try {
    await queryInterface.addConstraint({
      tableName: 'AddressByPlace',
      schema: 'public'
    }, {
      fields: ['idPlaceFk', 'idAddressFk'],
      type: 'unique',
      name: 'unique_place_address'
    });
  } catch (error) {
    if (!error.message.includes('already exists')) {
      throw error;
    }
    console.log('La restricción unique_place_address ya existe, se omite su creación');
  }
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'AddressByPlace',
    schema: 'public'
  });
};

export { up, down };