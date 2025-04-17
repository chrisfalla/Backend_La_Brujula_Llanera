'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'ImageCategorie',
    schema: 'public'
  }, [
    {
      name: 'Principal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Galeru00eda',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Menu00fa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Instalaciones',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Productos',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'ImageCategorie',
    schema: 'public'
  }, null, {});
};

export { up, down };
