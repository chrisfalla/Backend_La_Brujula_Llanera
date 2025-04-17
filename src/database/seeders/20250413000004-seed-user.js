'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'User',
    schema: 'public'
  }, [
    {
      names: 'Admin',
      lastNames: 'System',
      phone: '+573001234567',
      email: 'admin@brujulallanera.com',
      birthday: '1990-01-01',
      hasAceptedTC: true,
      isBlocked: false,
      avatar: 'https://ui-avatars.com/api/?name=Admin+System',
      idRoleFk: 1, // Administrador
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      names: 'Juan',
      lastNames: 'Pérez',
      phone: '+573002345678',
      email: 'juan@example.com',
      birthday: '1985-05-15',
      hasAceptedTC: true,
      isBlocked: false,
      avatar: 'https://ui-avatars.com/api/?name=Juan+Perez',
      idRoleFk: 2, // Usuario
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      names: 'María',
      lastNames: 'González',
      phone: '+573003456789',
      email: 'maria@example.com',
      birthday: '1992-08-20',
      hasAceptedTC: true,
      isBlocked: false,
      avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez',
      idRoleFk: 2, // Usuario
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      names: 'Carlos',
      lastNames: 'Rodríguez',
      phone: '+573004567890',
      email: 'carlos@business.com',
      birthday: '1980-03-10',
      hasAceptedTC: true,
      isBlocked: false,
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Rodriguez',
      idRoleFk: 2, // Usuario
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      names: 'Laura',
      lastNames: 'Martínez',
      phone: '+573005678901',
      email: 'laura@moderator.com',
      birthday: '1988-11-25',
      hasAceptedTC: true,
      isBlocked: false,
      avatar: 'https://ui-avatars.com/api/?name=Laura+Martinez',
      idRoleFk: 2, // Usuario
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'User',
    schema: 'public'
  }, null, {});
};

export { up, down };
