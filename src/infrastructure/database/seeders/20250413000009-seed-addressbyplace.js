'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'AddressByPlace',
    schema: 'public'
  }, [
    {
      idPlaceFk: 1, // Parque El Resurgimiento
      idAddressFk: 1, // Calle 24 # 21-40
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idPlaceFk: 2, // Catedral San José
      idAddressFk: 2, // Calle 9 # 21-50
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idPlaceFk: 3, // Unicentro Yopal
      idAddressFk: 3, // Carrera 29 # 15-50
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idPlaceFk: 4, // Restaurante El Llanero Real
      idAddressFk: 4, // Calle 10 # 23-30
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idPlaceFk: 5, // Hotel Estelar Yopal
      idAddressFk: 5, // Carrera 21 # 9-18
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'AddressByPlace',
    schema: 'public'
  }, null, {});
};

export { up, down };
