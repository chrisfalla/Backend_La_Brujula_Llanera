'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Imagenes', {
    id_Imagen: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    url_Imagen: {
      type: Sequelize.STRING,
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
    id_Categoria_Imagen: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categorias',
        key: 'id_Categoria'
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
  await queryInterface.dropTable('Imagenes');
};
