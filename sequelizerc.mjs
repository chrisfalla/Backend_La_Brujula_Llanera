import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  'config': path.resolve(__dirname, 'config', 'config.js'),
  'models-path': path.resolve(__dirname, 'src', 'models'),
  'seeders-path': path.resolve(__dirname, 'src', 'database', 'seeders'),
  'migrations-path': path.resolve(__dirname, 'src', 'database', 'migrations')
};