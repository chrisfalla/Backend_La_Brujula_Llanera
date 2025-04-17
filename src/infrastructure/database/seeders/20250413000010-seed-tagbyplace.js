'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'TagByPlace',
    schema: 'public'
  }, [
    // Parque El Resurgimiento - Naturaleza, Parque
    { idPlaceFk: 1, idTagFk: 1, createdAt: new Date(), updatedAt: new Date() },
    { idPlaceFk: 1, idTagFk: 18, createdAt: new Date(), updatedAt: new Date() },
    
    // Catedral San José - Religioso, Cultura
    { idPlaceFk: 2, idTagFk: 5, createdAt: new Date(), updatedAt: new Date() },
    { idPlaceFk: 2, idTagFk: 2, createdAt: new Date(), updatedAt: new Date() },
    
    // Centro Comercial Unicentro Yopal - Centro Comercial, Compras
    { idPlaceFk: 3, idTagFk: 19, createdAt: new Date(), updatedAt: new Date() },
    { idPlaceFk: 3, idTagFk: 7, createdAt: new Date(), updatedAt: new Date() },
    
    // Restaurante El Llanero Real - Restaurante, Gastronomía
    { idPlaceFk: 4, idTagFk: 8, createdAt: new Date(), updatedAt: new Date() },
    { idPlaceFk: 4, idTagFk: 12, createdAt: new Date(), updatedAt: new Date() },
    
    // Hotel Estelar Yopal - Hotel, Alojamiento
    { idPlaceFk: 5, idTagFk: 13, createdAt: new Date(), updatedAt: new Date() },
    { idPlaceFk: 5, idTagFk: 16, createdAt: new Date(), updatedAt: new Date() }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'TagByPlace',
    schema: 'public'
  }, null, {});
};

export { up, down };
