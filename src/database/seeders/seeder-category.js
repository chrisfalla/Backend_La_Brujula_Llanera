'use strict';

export async function up(queryInterface) {
    await queryInterface.bulkInsert('Categorias', [
        {
            nombre_categoria: 'Ecoturismo',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_categoria: 'Cultura',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_categoria: 'Gastronomía',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_categoria: 'Movilidad',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_categoria: 'Alojamiento',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_categoria: 'Entretenimiento',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_categoria: 'Bienestar y Salud',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_categoria: 'Comercio',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete('Categorias', null, {});
}
