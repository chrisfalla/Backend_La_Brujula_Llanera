// Migration: Create dbo.Tag table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS public;');
  await queryInterface.createTable('Tag', {
    idTag: {
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
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'Tag',
    schema: 'public'
  });
};

export { up, down };