'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'Review',
    schema: 'public'
  }, [
    {
      comment: 'Un parque hermoso y muy bien cuidado. Ideal para pasear en familia.',
      ratingValue: 5,
      idPlaceFk: 1, // Parque El Resurgimiento
      idUserFk: 1, // Admin
      dateTime: new Date('2025-04-01T14:30:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      comment: 'Excelente lugar para hacer ejercicio y disfrutar del aire libre.',
      ratingValue: 4,
      idPlaceFk: 1, // Parque El Resurgimiento
      idUserFk: 2, // Usuario
      dateTime: new Date('2025-04-02T19:15:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      comment: 'La catedral es impresionante, un lugar de paz y recogimiento.',
      ratingValue: 5,
      idPlaceFk: 2, // Catedral San José
      idUserFk: 1, // Admin
      dateTime: new Date('2025-04-03T10:45:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      comment: 'Hermosa arquitectura y ambiente muy tranquilo.',
      ratingValue: 5,
      idPlaceFk: 2, // Catedral San José
      idUserFk: 2, // Usuario
      dateTime: new Date('2025-04-04T16:20:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      comment: 'El centro comercial tiene de todo, muy completo y moderno.',
      ratingValue: 4,
      idPlaceFk: 3, // Centro Comercial Unicentro
      idUserFk: 1, // Admin
      dateTime: new Date('2025-04-05T11:10:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      comment: 'Buen lugar para compras, aunque los fines de semana está muy lleno.',
      ratingValue: 4,
      idPlaceFk: 3, // Centro Comercial Unicentro
      idUserFk: 2, // Usuario
      dateTime: new Date('2025-04-06T09:30:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      comment: 'La mejor carne a la llanera de Yopal, sabor auténtico.',
      ratingValue: 5,
      idPlaceFk: 4, // Restaurante El Llanero Real
      idUserFk: 1, // Admin
      dateTime: new Date('2025-04-07T20:45:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      comment: 'Excelente servicio y comida deliciosa. Precios razonables.',
      ratingValue: 5,
      idPlaceFk: 4, // Restaurante El Llanero Real
      idUserFk: 2, // Usuario
      dateTime: new Date('2025-04-08T08:15:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      comment: 'Hotel con excelentes instalaciones y personal muy amable.',
      ratingValue: 5,
      idPlaceFk: 5, // Hotel Estelar Yopal
      idUserFk: 1, // Admin
      dateTime: new Date('2025-04-09T13:30:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      comment: 'Habitaciones cómodas y limpias. El desayuno buffet es muy completo.',
      ratingValue: 4,
      idPlaceFk: 5, // Hotel Estelar Yopal
      idUserFk: 2, // Usuario
      dateTime: new Date('2025-04-10T19:45:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'Review',
    schema: 'public'
  }, null, {});
};

export { up, down };
