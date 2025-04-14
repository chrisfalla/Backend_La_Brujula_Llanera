import db from '../models/index.js'; // ✅ Ruta correcta al archivo index.js en modelos
import { QueryTypes } from 'sequelize';

const { Categorie } = db;

if (!Categorie) {
  console.error("❌ El modelo 'Categorie' no está disponible en 'CategoryService.js'. Verifica su inicialización.");
}

export const getAllCategories = async () => {
  try {
    return await Categorie.findAll({
      attributes: ['id_Categoria', 'name'],
    });
  } catch (error) {
    console.error("❌ Error en 'getAllCategories':", error.message);
    throw error;
  }
};

export const findCategoryByName = async (name) => {
  try {
    return await Categorie.findOne({
      where: { name },
      attributes: ['id_Categoria', 'name'],
    });
  } catch (error) {
    console.error("❌ Error en 'findCategoryByName':", error.message);
    throw error;
  }
};

// Función para reiniciar la secuencia de IDs
export const resetCategorySequence = async () => {
  try {
    // Obtener el máximo ID actual
    const result = await db.sequelize.query(
      'SELECT MAX("id_Categoria") as max_id FROM "Categorias"',
      { type: QueryTypes.SELECT }
    );
    
    const maxId = result[0].max_id || 0;
    
    // Reiniciar la secuencia al siguiente valor después del máximo
    await db.sequelize.query(
      `ALTER SEQUENCE "Categorias_id_Categoria_seq" RESTART WITH ${maxId + 1}`,
      { type: QueryTypes.RAW }
    );
    
    console.log(`✅ Secuencia de categorías reiniciada a ${maxId + 1}`);
  } catch (error) {
    console.error('❌ Error al reiniciar la secuencia:', error.message);
    throw error;
  }
};

export const createCategory = async ({ name }) => {
  try {
    // Primero reiniciamos la secuencia para asegurar que el ID sea el siguiente disponible
    await resetCategorySequence();
    
    const newCategory = await Categorie.create({
      name // Esto se mapeará a nombre_categoria gracias al mapeo en el modelo
    });
    
    return {
      id: newCategory.id_Categoria,
      name: newCategory.name
    };
  } catch (error) {
    console.error("❌ Error en 'createCategory':", error.message);
    throw error;
  }
};
