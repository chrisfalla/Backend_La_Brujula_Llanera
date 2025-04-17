'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'Tag',
    schema: 'public'
  }, [
    { name: 'Naturaleza', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Cultura', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Senderismo', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Eventos', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Religioso', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Museos', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Compras', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Restaurante', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Bar', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Discoteca', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Café', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Gastronomía', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Hotel', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Piscina', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Camping', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Alojamiento', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Turismo', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Parque', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Centro Comercial', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Supermercados', createdAt: new Date(), updatedAt: new Date() }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'Tag',
    schema: 'public'
  }, null, {});
};

export { up, down };
