// Migration: Create dbo.TagByPlace table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS public;');
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
          schema: 'public'
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
          schema: 'public'
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
    schema: 'public',
    timestamps: true
  });

  // Agregar índice compuesto para búsquedas eficientes
  await queryInterface.addIndex({
    tableName: 'TagByPlace',
    schema: 'public'
  }, ['idPlaceFk', 'idTagFk'], {
    name: 'idx_tagbyplace_place_tag'
  });

  // Agregar restricción de unicidad
  await queryInterface.addConstraint({
    tableName: 'TagByPlace',
    schema: 'public'
  }, {
    fields: ['idPlaceFk', 'idTagFk'],
    type: 'unique',
    name: 'unique_place_tag'
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'TagByPlace',
    schema: 'public'
  });
};

export { up, down };