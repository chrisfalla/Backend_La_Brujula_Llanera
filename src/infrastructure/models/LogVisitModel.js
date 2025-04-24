import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js'; 

export const LogVisitModel = sequelize.define('LogVisit', {
    idLogVisit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idLogVisit',
    },
    idDeviceDateTime: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    idPlaceFk: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    idUserFk: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    visitDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
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
    tableName: 'LogVisit', 
    timestamps: true,
    });