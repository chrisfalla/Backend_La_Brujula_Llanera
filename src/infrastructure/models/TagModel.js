import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js'; 

export const TagModel = sequelize.define('Tag', {
    idTag: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idTag',
    },
    name: {
        type: DataTypes.STRING,
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
    tableName: 'Tag', 
    timestamps: true,
})