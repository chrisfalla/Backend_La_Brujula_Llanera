import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js'; 

export const CategoryModel = sequelize.define('Category', {
  idCategory: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idCategory',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, 
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
  tableName: 'categories', 
  timestamps: true,
});
