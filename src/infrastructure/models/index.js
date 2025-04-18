import { CategoryModel } from './CategoryModel.js'; 
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.SUPABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const models = {
  Category: CategoryModel(sequelize, Sequelize.DataTypes), 
};

export { sequelize, models };
