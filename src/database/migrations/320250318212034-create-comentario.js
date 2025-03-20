'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Comentarios', {
    id_Comentario: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    texto: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    id_Usuario: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id_Usuario'
      },
      allowNull: false
    },
    id_Lugar: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Lugares',
        key: 'id_Lugar'
      },
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('Comentarios');
};
