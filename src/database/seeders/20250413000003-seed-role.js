'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert({
    tableName: 'Role',
    schema: 'public'
  }, [
    {
      name: 'Administrador',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Usuario',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete({
    tableName: 'Role',
    schema: 'public'
  }, null, {});
};

export { up, down };
