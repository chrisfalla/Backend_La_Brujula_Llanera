import express from 'express';
import { findCategoryByName, getAllCategories } from '../services/CategoryService.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operaciones relacionadas con categorías
 */

/**
 * @swagger
 * /categories/:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /categories/name:
 *   get:
 *     summary: Buscar una categoría por nombre
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la categoría a buscar
 *     responses:
 *       200:
 *         description: Detalles de la categoría
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/name', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const category = await findCategoryByName(name.trim());
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error searching category:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
