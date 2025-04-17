'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'LogVisit',
    schema: 'public'
  }, [
    {
      deviceDateTime: new Date('2025-04-01T10:15:00'),
      idDeviceInfoFk: 1, // Samsung Galaxy S21
      idPlaceFk: 1, // Parque El Resurgimiento
      idUserFk: 1, // Admin
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceDateTime: new Date('2025-04-02T14:30:00'),
      idDeviceInfoFk: 2, // iPhone 13
      idPlaceFk: 2, // Catedral San José
      idUserFk: 2, // Usuario
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceDateTime: new Date('2025-04-03T09:45:00'),
      idDeviceInfoFk: 3, // Xiaomi Redmi Note 10
      idPlaceFk: 3, // Centro Comercial Unicentro
      idUserFk: 1, // Admin
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceDateTime: new Date('2025-04-04T16:20:00'),
      idDeviceInfoFk: 4, // iPad Pro
      idPlaceFk: 4, // Restaurante El Llanero Real
      idUserFk: 2, // Usuario
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceDateTime: new Date('2025-04-05T11:10:00'),
      idDeviceInfoFk: 5, // Google Pixel 6
      idPlaceFk: 5, // Hotel Estelar Yopal
      idUserFk: null, // Usuario anónimo
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceDateTime: new Date('2025-04-06T19:30:00'),
      idDeviceInfoFk: 1, // Samsung Galaxy S21
      idPlaceFk: 1, // Parque El Resurgimiento
      idUserFk: 2, // Usuario
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceDateTime: new Date('2025-04-07T12:45:00'),
      idDeviceInfoFk: 2, // iPhone 13
      idPlaceFk: 2, // Catedral San José
      idUserFk: 1, // Admin
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceDateTime: new Date('2025-04-08T15:15:00'),
      idDeviceInfoFk: 3, // Xiaomi Redmi Note 10
      idPlaceFk: 3, // Centro Comercial Unicentro
      idUserFk: null, // Usuario anónimo
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceDateTime: new Date('2025-04-09T10:30:00'),
      idDeviceInfoFk: 4, // iPad Pro
      idPlaceFk: 4, // Restaurante El Llanero Real
      idUserFk: 2, // Usuario
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceDateTime: new Date('2025-04-10T13:45:00'),
      idDeviceInfoFk: 5, // Google Pixel 6
      idPlaceFk: 5, // Hotel Estelar Yopal
      idUserFk: 1, // Admin
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'LogVisit',
    schema: 'public'
  }, null, {});
};

export { up, down };
