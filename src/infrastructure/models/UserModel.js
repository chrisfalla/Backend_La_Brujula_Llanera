import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js'; 

const UserModel = sequelize.define('User', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idUser',
    },
    names: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'names',
    },
    lastNames: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'lastNames',
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: 'phone',
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'email',
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'birthday',
    },
    hasAceptedTC: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'hasAceptedTC',
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'isBlocked',
    },
    avatar:{
      type : DataTypes.STRING(500),
      allowNull : true
    },
    idRoleFk:{
      type : DataTypes.INTEGER,
      allowNull : false
    },  
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
        field: 'createdAt',
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
        field: 'updatedAt',
    },
    password: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: 'password',
    }  
}, {
    tableName: 'User', 
});

export default UserModel;