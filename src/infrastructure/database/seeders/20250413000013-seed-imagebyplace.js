'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'ImageByPlace',
    schema: 'public'
  }, [
    {
      urlImage: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b',
      idImageCategorieFk: 1, // Principal
      idPlaceFk: 1, // Parque El Resurgimiento
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      urlImage: 'https://images.unsplash.com/photo-1552083375-1447ce886485',
      idImageCategorieFk: 2, // Galería
      idPlaceFk: 1, // Parque El Resurgimiento
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      urlImage: 'https://images.unsplash.com/photo-1544919982-b61982e3c3d8',
      idImageCategorieFk: 1, // Principal
      idPlaceFk: 2, // Catedral San José
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      urlImage: 'https://images.unsplash.com/photo-1530076886461-ce58ea8abe24',
      idImageCategorieFk: 2, // Galería
      idPlaceFk: 2, // Catedral San José
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      urlImage: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2',
      idImageCategorieFk: 1, // Principal
      idPlaceFk: 3, // Centro Comercial Unicentro Yopal
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      urlImage: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be',
      idImageCategorieFk: 2, // Galería
      idPlaceFk: 3, // Centro Comercial Unicentro Yopal
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      urlImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      idImageCategorieFk: 1, // Principal
      idPlaceFk: 4, // Restaurante El Llanero Real
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      urlImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
      idImageCategorieFk: 3, // Menú
      idPlaceFk: 4, // Restaurante El Llanero Real
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      urlImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      idImageCategorieFk: 1, // Principal
      idPlaceFk: 5, // Hotel Estelar Yopal
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      urlImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      idImageCategorieFk: 4, // Instalaciones
      idPlaceFk: 5, // Hotel Estelar Yopal
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'ImageByPlace',
    schema: 'public'
  }, null, {});
};

export { up, down };
