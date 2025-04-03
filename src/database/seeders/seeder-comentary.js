'use strict';

export async function up(queryInterface) {
    await queryInterface.bulkInsert('Comentarios', [
        // Comentario para Parque Nacional Sierra Nevada (id_Lugar: 1)
        {
            texto: 'Un lugar mágico para conectar con la naturaleza. El aire puro y las vistas panorámicas son impresionantes. Volveré pronto con toda mi familia.',
            id_Usuario: 1, // Christofer Falla
            id_Lugar: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Comentario para Museo de Arte Contemporáneo (id_Lugar: 2)
        {
            texto: 'Excelente exposición de arte venezolano. La colección permanente es muy completa y las exposiciones temporales siempre sorprenden.',
            id_Usuario: 2, // Leymar Urbano
            id_Lugar: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Comentario para Restaurante El Joropo (id_Lugar: 3)
        {
            texto: 'La mejor comida llanera que he probado. El cachapa con queso de mano y la carne en vara son espectaculares. Además el ambiente con música en vivo es muy auténtico.',
            id_Usuario: 3, // Steven Balaguera
            id_Lugar: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Comentario para Terminal de Autobuses Los Llanos (id_Lugar: 4)
        {
            texto: 'Terminal limpia y bien organizada. Los horarios son puntuales y el personal es amable. Recomendado para viajar a cualquier parte del país.',
            id_Usuario: 4, // Damian Caro
            id_Lugar: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Comentario para Hotel Orinoco Sunset (id_Lugar: 5)
        {
            texto: 'Hermosas vistas al río Orinoco. Las habitaciones son amplias y el servicio es excelente. El desayuno buffet es muy completo y delicioso.',
            id_Usuario: 1, // Christofer Falla
            id_Lugar: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Comentario para Teatro Municipal de San Cristóbal (id_Lugar: 6)
        {
            texto: 'Asistí a un concierto y la acústica es fantástica. El edificio es histórico y tiene un encanto especial. La programación cultural es muy variada.',
            id_Usuario: 2, // Leymar Urbano
            id_Lugar: 6,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Comentario para Spa Aguas Termales (id_Lugar: 7)
        {
            texto: 'Un oasis de tranquilidad. El masaje con aceites esenciales fue relajante y terapéutico. Las aguas termales ayudaron mucho a mi dolor de espalda.',
            id_Usuario: 3, // Steven Balaguera
            id_Lugar: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Comentario para Centro Comercial Sambil Maracaibo (id_Lugar: 8)
        {
            texto: 'El mejor centro comercial de la región. Tiene todas las tiendas que puedas necesitar y una amplia zona de comidas. El cine es muy moderno.',
            id_Usuario: 4, // Damian Caro
            id_Lugar: 8,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete('Comentarios', null, {});
}
