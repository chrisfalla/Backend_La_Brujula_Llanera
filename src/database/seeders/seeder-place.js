'use strict';

export async function up(queryInterface) {
    await queryInterface.bulkInsert('Lugares', [
        // Ecoturismo (1)
        {
            nombre_Lugar: 'Parque Nacional Sierra Nevada',
            descripcion: 'Impresionante parque nacional con ecosistemas diversos y vistas panorámicas de los Andes venezolanos.',
            direccion: 'Mérida, Estado Mérida',
            estrellas: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Cultura (2)
        {
            nombre_Lugar: 'Museo de Arte Contemporáneo',
            descripcion: 'Espacio cultural que alberga exposiciones de artistas venezolanos reconocidos internacionalmente.',
            direccion: 'Av. Principal La Floresta, Caracas',
            estrellas: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Gastronomía (3)
        {
            nombre_Lugar: 'Restaurante El Joropo',
            descripcion: 'Auténtica cocina llanera con los mejores platos tradicionales y música folclórica en vivo.',
            direccion: 'Calle Principal, San Fernando de Apure',
            estrellas: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Movilidad (4)
        {
            nombre_Lugar: 'Terminal de Autobuses Los Llanos',
            descripcion: 'Terminal moderna con salidas regulares a todos los destinos principales del país.',
            direccion: 'Av. Libertador, Barinas',
            estrellas: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Alojamiento (5)
        {
            nombre_Lugar: 'Hotel Orinoco Sunset',
            descripcion: 'Hotel boutique con vistas impresionantes al río Orinoco y habitaciones de lujo inspiradas en la cultura local.',
            direccion: 'Paseo Orinoco, Ciudad Bolívar',
            estrellas: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Entretenimiento (6)
        {
            nombre_Lugar: 'Teatro Municipal de San Cristóbal',
            descripcion: 'Espacio escénico con una programación variada de espectáculos locales e internacionales.',
            direccion: 'Centro Histórico, San Cristóbal',
            estrellas: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Bienestar y Salud (7)
        {
            nombre_Lugar: 'Spa Aguas Termales',
            descripcion: 'Centro de bienestar que aprovecha las aguas termales naturales para tratamientos terapéuticos.',
            direccion: 'Vía a Las Trincheras, Valencia',
            estrellas: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Comercio (8)
        {
            nombre_Lugar: 'Centro Comercial Sambil Maracaibo',
            descripcion: 'El mayor centro comercial de la región con tiendas nacionales e internacionales.',
            direccion: 'Circunvalación 2, Maracaibo',
            estrellas: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete('Lugares', null, {});
}
