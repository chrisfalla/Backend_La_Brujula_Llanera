import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js'; 

const LogVisitModel = sequelize.define('LogVisit', {
    idLogVisit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idLogVisit',
    },
    deviceDateTime: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: DataTypes.NOW,
    },
    idDeviceInfoFk: {
        type: DataTypes.INTEGER,
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

export default LogVisitModel;