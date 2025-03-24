export const env = {
  node: true, // Habilita variables globales de Node.js como `process`
  es2021: true, // Soporte para características de ES2021
};
export const extendsConfig = [
  'airbnb-base', // Usa el estilo de Airbnb
];
export const rules = {
  // Reglas personalizadas para tu proyecto
  'no-console': 'warn', // Permite console.log pero con advertencia
  'no-underscore-dangle': 'off', // Sequelize usa guiones bajos (ej. `Sequelize.Op`)
  'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], // Ignora parámetros como `next` en middleware de Express
  'consistent-return': 'off', // Relaja esta regla para funciones de Express que no siempre necesitan retorno explícito
};