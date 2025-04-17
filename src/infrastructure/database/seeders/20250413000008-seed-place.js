'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'Place',
    schema: 'public'
  }, [
    {
      name: 'Parque El Resurgimiento',
      description: 'El parque principal de Yopal, ideal para eventos y actividades al aire libre.',
      phoneNumber: null,
      idCategorie: 1, // Ecoturismo
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Catedral San José',
      description: 'La catedral más importante de Yopal, ubicada en el centro de la ciudad.',
      phoneNumber: null,
      idCategorie: 2, // Cultura
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Centro Comercial Unicentro Yopal',
      description: 'Centro comercial con tiendas, restaurantes y entretenimiento.',
      phoneNumber: '+57 8 634 0000',
      idCategorie: 6, // Entretenimiento
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Restaurante El Llanero Real',
      description: 'Restaurante típico llanero con la mejor carne a la llanera.',
      phoneNumber: '+57 8 634 1111',
      idCategorie: 3, // Gastronomía
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Hotel Estelar Yopal',
      description: 'Hotel moderno con todas las comodidades para tu estadía en Yopal.',
      phoneNumber: '+57 8 634 2222',
      idCategorie: 5, // Alojamiento
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'Place',
    schema: 'public'
  }, null, {});
};

export { up, down };
