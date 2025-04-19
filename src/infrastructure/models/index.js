import { CategoryModel } from './CategoryModel.js'; 
import { TagModel } from './TagModel.js';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.SUPABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const models = {
  Category: CategoryModel(sequelize, Sequelize.DataTypes), 
  Tag: TagModel(sequelize, Sequelize.DataTypes),
};

export { sequelize, models };
