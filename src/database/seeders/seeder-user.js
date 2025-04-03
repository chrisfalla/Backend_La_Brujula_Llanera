'use strict';
import bcrypt from 'bcrypt';

export async function up(queryInterface) {
    const saltRounds = 10;

    const password1 = await bcrypt.hash('password123', saltRounds);
    const password2 = await bcrypt.hash('securepass456', saltRounds);
    const password3 = await bcrypt.hash('userpass789', saltRounds);
    const password4 = await bcrypt.hash('adminpass321', saltRounds);

    await queryInterface.bulkInsert('Usuarios', [
        {
            nombre: 'Christofer Falla',
            correo: 'christoferfalla@example.com',
            contrasena: password1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'Leymar Urbano',
            correo: 'leymarurbano@example.com',
            contrasena: password2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'Steven Balaguera',
            correo: 'stevenbalaguera@example.com',
            contrasena: password3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'Damian Caro',
            correo: 'damiancaro@example.com',
            contrasena: password4,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete('Usuarios', null, {});
}