// Migration: Create dbo.LogVisit table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS public;');
  await queryInterface.createTable('LogVisit', {
    idLogVisit: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    deviceDateTime: {
      type: Sequelize.DATE,
      allowNull: false
    },
    idDeviceInfoFk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'DeviceInfo',
          schema: 'public'
        },
        key: 'idDeviceInfo'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    idUserFk: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'User',
          schema: 'public'
        },
        key: 'idUser'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
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

  // Agregar índices para búsquedas eficientes
  await queryInterface.addIndex({
    tableName: 'LogVisit',
    schema: 'public'
  }, ['idDeviceInfoFk'], {
    name: 'idx_logvisit_deviceinfo'
  });
  
  await queryInterface.addIndex({
    tableName: 'LogVisit',
    schema: 'public'
  }, ['idPlaceFk'], {
    name: 'idx_logvisit_place'
  });
  
  await queryInterface.addIndex({
    tableName: 'LogVisit',
    schema: 'public'
  }, ['idUserFk'], {
    name: 'idx_logvisit_user'
  });
  
  await queryInterface.addIndex({
    tableName: 'LogVisit',
    schema: 'public'
  }, ['deviceDateTime'], {
    name: 'idx_logvisit_datetime'
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'LogVisit',
    schema: 'public'
  });
};

export { up, down };