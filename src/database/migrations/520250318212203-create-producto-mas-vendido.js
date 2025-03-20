'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('ProductoMasVendido', {
    id_Producto_Mas_Vendido: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    precio: {
      type: Sequelize.FLOAT,
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
  await queryInterface.dropTable('ProductoMasVendido');
};
