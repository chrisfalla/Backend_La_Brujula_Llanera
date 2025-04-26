import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

export const AddressByPlaceModel = sequelize.define('AddressByPlace', {
    idAddressByPlace: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idAddressByPlace',
    },
    idPlaceFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idPlaceFk',
    },
    idAddressFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idAddressFk',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    }, {
    tableName: 'AddressByPlace',
    timestamps: true,
    });