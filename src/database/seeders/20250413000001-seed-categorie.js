'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'Categorie',
    schema: 'public'
  }, [
    { name: 'Ecoturismo', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Cultura', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Gastronomía', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Servicios', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Alojamiento', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Entretenimiento', createdAt: new Date(), updatedAt: new Date() }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'Categorie',
    schema: 'public'
  }, null, {});
};

export { up, down };
