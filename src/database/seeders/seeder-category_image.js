'use strict';

export async function up(queryInterface) {
    await queryInterface.bulkInsert('CategoriaImagen', [
        {
            nombre_Categoria_Imagen: 'Imágenes de Ecoturismo',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_Categoria_Imagen: 'Imágenes de Cultura',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_Categoria_Imagen: 'Imágenes de Gastronomía',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_Categoria_Imagen: 'Imágenes de Movilidad',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_Categoria_Imagen: 'Imágenes de Alojamiento',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_Categoria_Imagen: 'Imágenes de Entretenimiento',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_Categoria_Imagen: 'Imágenes de Bienestar y Salud',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre_Categoria_Imagen: 'Imágenes de Comercio',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete('CategoriaImagen', null, {});
}
