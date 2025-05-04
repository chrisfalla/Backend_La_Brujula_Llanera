import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js'; 

const PlaceModel = sequelize.define('Place', {
  idPlace: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idPlace',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false, 
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  idCategorie: {
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
  idSocialMedia: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
}, {
  tableName: 'Place', 
  timestamps: true,
});

export default PlaceModel;