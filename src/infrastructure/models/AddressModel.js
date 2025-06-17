import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const AddressModel = sequelize.define('Address', {
    idAddress: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idAddress',
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'description',
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
}, {
    tableName: 'Address',
    timestamps: true,
});

export default AddressModel;