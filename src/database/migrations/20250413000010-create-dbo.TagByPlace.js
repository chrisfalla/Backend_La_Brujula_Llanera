// Migration: Create dbo.TagByPlace table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS dbo;');
  await queryInterface.createTable('TagByPlace', {
    idTagByPlace: {
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
          schema: 'dbo'
        },
        key: 'idPlace'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    idTagFk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Tag',
          schema: 'dbo'
        },
        key: 'idTag'
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

  // Agregar índice compuesto para búsquedas eficientes
  await queryInterface.addIndex({
    tableName: 'TagByPlace',
    schema: 'dbo'
  }, ['idPlaceFk', 'idTagFk'], {
    name: 'idx_tagbyplace_place_tag'
  });

  // Agregar restricción de unicidad
  await queryInterface.addConstraint({
    tableName: 'TagByPlace',
    schema: 'dbo'
  }, {
    fields: ['idPlaceFk', 'idTagFk'],
    type: 'unique',
    name: 'unique_place_tag'
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'TagByPlace',
    schema: 'dbo'
  });
};

export { up, down };