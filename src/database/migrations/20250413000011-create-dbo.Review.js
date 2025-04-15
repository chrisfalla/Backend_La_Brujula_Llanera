// Migration: Create dbo.Review table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS dbo;');
  await queryInterface.createTable('Review', {
    idReview: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    ratingValue: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
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
    idUserFk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'User',
          schema: 'dbo'
        },
        key: 'idUser'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    dateTime: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
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
    tableName: 'Review',
    schema: 'dbo'
  }, ['idPlaceFk'], {
    name: 'idx_review_place'
  });
  
  await queryInterface.addIndex({
    tableName: 'Review',
    schema: 'dbo'
  }, ['idUserFk'], {
    name: 'idx_review_user'
  });

  await queryInterface.addIndex({
    tableName: 'Review',
    schema: 'dbo'
  }, ['idPlaceFk', 'idUserFk'], {
    name: 'idx_review_place_user'
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'Review',
    schema: 'dbo'
  });
};

export { up, down };