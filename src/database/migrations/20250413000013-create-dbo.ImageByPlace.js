// Migration: Create dbo.ImageByPlace table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS dbo;');
  await queryInterface.createTable('ImageByPlace', {
    idImageByPlace: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    urlImage: {
      type: Sequelize.STRING(2000),
      allowNull: false
    },
    idImageCategorieFk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'ImageCategorie',
          schema: 'dbo'
        },
        key: 'idImageCategorie'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    idPlaceFk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Place',
          schema: 'dbo'
        },
        key: 'idPlace'
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
    schema: 'dbo',
    timestamps: true
  });

  // Agregar índices para búsquedas eficientes
  await queryInterface.addIndex({
    tableName: 'ImageByPlace',
    schema: 'dbo'
  }, ['idImageCategorieFk'], {
    name: 'idx_imagebyplace_imagecategorie'
  });

  await queryInterface.addIndex({
    tableName: 'ImageByPlace',
    schema: 'dbo'
  }, ['idPlaceFk'], {
    name: 'idx_imagebyplace_place'
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'ImageByPlace',
    schema: 'dbo'
  });
};

export { up, down };