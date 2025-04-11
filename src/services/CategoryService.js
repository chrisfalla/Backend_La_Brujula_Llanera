import db from '../models/index.js'; // ✅ Ruta correcta al archivo index.js en modelos

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
