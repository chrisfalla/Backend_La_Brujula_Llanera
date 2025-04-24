'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'Address',
    schema: 'public'
  }, [
    {
      latitud: 5.3496,
      longintude: -72.4105,
      description: 'Parque El Resurgimiento, Calle 24 # 21-40, Yopal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      latitud: 5.3372,
      longintude: -72.3954,
      description: 'Catedral San José, Calle 9 # 21-50, Yopal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      latitud: 5.3377,
      longintude: -72.3976,
      description: 'Unicentro Yopal, Carrera 29 # 15-50, Yopal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      latitud: 5.3379,
      longintude: -72.3971,
      description: 'Restaurante El Llanero Real, Calle 10 # 23-30, Yopal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      latitud: 5.3371,
      longintude: -72.3957,
      description: 'Hotel Estelar Yopal, Carrera 21 # 9-18, Yopal',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'Address',
    schema: 'public'
  }, null, {});
};

export { up, down };
