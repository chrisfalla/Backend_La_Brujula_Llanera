import { findCategoryByName, createCategory } from '../services/CategoryService.js';

export const searchCategory = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const category = await findCategoryByName(name);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error searching category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validación: asegurarse de que el nombre esté presente
    if (!name) {
      return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
    }

    // Llamada al servicio con los datos validados
    const newCategory = await createCategory({ name });

    // Respuesta al cliente
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
