'use strict';

const up = async (queryInterface, Sequelize) => {
  // Ejemplo: usuarios 1, 2, 3 y lugares 1, 2, 3, 4, 5
  await queryInterface.bulkInsert({
    tableName: 'Favorites',
    schema: 'public'
  }, [
    {
      idUserFk: 1,
      idPlaceFk: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idUserFk: 1,
      idPlaceFk: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idUserFk: 2,
      idPlaceFk: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idUserFk: 2,
      idPlaceFk: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idUserFk: 3,
      idPlaceFk: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idUserFk: 3,
      idPlaceFk: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'Favorites',
    schema: 'public'
  }, null, {});
};

export { up, down };
