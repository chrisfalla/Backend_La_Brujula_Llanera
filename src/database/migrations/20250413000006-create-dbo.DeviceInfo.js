// Migration: Create dbo.DeviceInfo table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS dbo;');
  await queryInterface.createTable('DeviceInfo', {
    idDeviceInfo: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    deviceModel: {
      type: Sequelize.STRING,
      allowNull: false
    },
    deviceSo: {
      type: Sequelize.STRING,
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
    schema: 'dbo',
    timestamps: true
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'DeviceInfo',
    schema: 'dbo'
  });
};

export { up, down };