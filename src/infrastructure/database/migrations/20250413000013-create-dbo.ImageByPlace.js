// Migration: Create dbo.ImageByPlace table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS public;');
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
          schema: 'public'
        },
        key: 'idImageCategorie'
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
    tableName: 'ImageByPlace',
    schema: 'public'
  }, ['idImageCategorieFk'], {
    name: 'idx_imagebyplace_imagecategorie'
  });

  await queryInterface.addIndex({
    tableName: 'ImageByPlace',
    schema: 'public'
  }, ['idPlaceFk'], {
    name: 'idx_imagebyplace_place'
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'ImageByPlace',
    schema: 'public'
  });
};

export { up, down };