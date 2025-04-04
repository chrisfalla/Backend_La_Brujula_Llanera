'use strict';

export async function up(queryInterface) {
    await queryInterface.bulkInsert('ProductoMasVendido', [
        // Producto para Parque Nacional Sierra Nevada (id_Lugar: 1)
        {
            nombre: 'Tour guiado por los picos nevados',
            precio: 45.99,
            id_Lugar: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Producto para Museo de Arte Contemporáneo (id_Lugar: 2)
        {
            nombre: 'Catálogo ilustrado de arte venezolano',
            precio: 29.50,
            id_Lugar: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Producto para Restaurante El Joropo (id_Lugar: 3)
        {
            nombre: 'Pabellón criollo especial',
            precio: 15.75,
            id_Lugar: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Producto para Terminal de Autobuses Los Llanos (id_Lugar: 4)
        {
            nombre: 'Ticket VIP con asiento reclinable',
            precio: 12.00,
            id_Lugar: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Producto para Hotel Orinoco Sunset (id_Lugar: 5)
        {
            nombre: 'Suite premium con vista al río',
            precio: 120.00,
            id_Lugar: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Producto para Teatro Municipal de San Cristóbal (id_Lugar: 6)
        {
            nombre: 'Entrada preferencial con cóctel',
            precio: 35.00,
            id_Lugar: 6,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Producto para Spa Aguas Termales (id_Lugar: 7)
        {
            nombre: 'Paquete completo de masajes y aguas termales',
            precio: 75.50,
            id_Lugar: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Producto para Centro Comercial Sambil Maracaibo (id_Lugar: 8)
        {
            nombre: 'Tarjeta de regalo Sambil Premium',
            precio: 50.00,
            id_Lugar: 8,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete('ProductoMasVendido', null, {});
}
