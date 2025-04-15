// Migration: Create dbo.Review table
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS public;');
  await queryInterface.createTable('Review', {
    idReview: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false
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
          schema: 'public'
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
          schema: 'public'
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
    schema: 'public',
    timestamps: true
  });

  // Agregar índices para búsquedas eficientes
  await queryInterface.addIndex({
    tableName: 'Review',
    schema: 'public'
  }, ['idPlaceFk'], {
    name: 'idx_review_place'
  });
  
  await queryInterface.addIndex({
    tableName: 'Review',
    schema: 'public'
  }, ['idUserFk'], {
    name: 'idx_review_user'
  });

  await queryInterface.addIndex({
    tableName: 'Review',
    schema: 'public'
  }, ['idPlaceFk', 'idUserFk'], {
    name: 'idx_review_place_user'
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'Review',
    schema: 'public'
  });
};

export { up, down };