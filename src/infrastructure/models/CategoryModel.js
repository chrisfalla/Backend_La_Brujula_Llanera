import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js'; 

const CategoryModel = sequelize.define('Category', {
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
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, 
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  tableName: 'Category', 
  timestamps: true,
});

export default CategoryModel;