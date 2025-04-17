'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'DeviceInfo',
    schema: 'public'
  }, [
    {
      deviceModel: 'Samsung Galaxy S21',
      deviceSo: 'Android 12',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceModel: 'iPhone 13',
      deviceSo: 'iOS 15.4',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceModel: 'Xiaomi Redmi Note 10',
      deviceSo: 'Android 11',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceModel: 'iPad Pro',
      deviceSo: 'iOS 15.3',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      deviceModel: 'Google Pixel 6',
      deviceSo: 'Android 12',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'DeviceInfo',
    schema: 'public'
  }, null, {});
};

export { up, down };
