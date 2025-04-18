import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.SUPABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // o true si quieres ver logs de SQL
});