'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable({
    tableName: 'Favorites',
    schema: 'public'
  }, {
    idFavorites: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    }
  });
  // Índice único para evitar duplicados
  await queryInterface.addConstraint({
    tableName: 'Favorites',
    schema: 'public'
  }, {
    fields: ['idUserFk', 'idPlaceFk'],
    type: 'unique',
    name: 'unique_favorite_per_user_place'
  });
}

export async function down(queryInterface, Sequelize) {
  // Elimina el constraint único si existe
  await queryInterface.removeConstraint(
    { tableName: 'Favorites', schema: 'public' },
    'unique_favorite_per_user_place'
  );
  // Luego elimina la tabla
  await queryInterface.dropTable({
    tableName: 'Favorites',
    schema: 'public'
  });
}
