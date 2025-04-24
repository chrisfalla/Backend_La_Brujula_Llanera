import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js'; 

export const TagByPlaceModel = sequelize.define('TagByPlace', {
    idTagByPlace: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idTagByPlace',
    },
    idPlaceFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idPlaceFk',
    },
    idTagFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'idTagFk',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
    }
}, {
    tableName: 'TagByPlace', 
    timestamps: true,
});