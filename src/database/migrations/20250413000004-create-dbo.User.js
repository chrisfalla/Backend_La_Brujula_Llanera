// Migration: Create dbo.User table with Role relationship
'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS dbo;');
  await queryInterface.createTable('User', {
    idUser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    names: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastNames: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    hasAceptedTC: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isBlocked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true
    },
    idRoleFk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Role',
          schema: 'dbo'
        },
        key: 'idRole'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    schema: 'dbo',
    timestamps: true
  });

  // Verificar si los índices ya existen antes de crearlos
  try {
    // Agregar índice para búsquedas por email
    await queryInterface.addIndex({
      tableName: 'User',
      schema: 'dbo'
    }, ['email'], {
      name: 'idx_user_email'
    });
  } catch (error) {
    if (!error.message.includes('already exists')) {
      throw error;
    }
    console.log('El índice idx_user_email ya existe, se omite su creación');
  }
  
  try {
    // Agregar índice para búsquedas por rol
    await queryInterface.addIndex({
      tableName: 'User',
      schema: 'dbo'
    }, ['idRoleFk'], {
      name: 'idx_user_role'
    });
  } catch (error) {
    if (!error.message.includes('already exists')) {
      throw error;
    }
    console.log('El índice idx_user_role ya existe, se omite su creación');
  }
};

const down = async (queryInterface) => {
  await queryInterface.dropTable({
    tableName: 'User',
    schema: 'dbo'
  });
};

export { up, down };