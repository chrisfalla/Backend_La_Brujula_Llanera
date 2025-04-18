import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController.js';

const categoryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operaciones sobre categorías
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       500:
 *         description: Error al obtener las categorías
 */
categoryRouter.get('/', CategoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al obtener la categoría
 */
categoryRouter.get('/:id', CategoryController.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *               isActive:
 *                 type: boolean
 *                 description: Estado de la categoría
 *     responses:
 *       201:
 *         description: Categoría creada con éxito
 *       500:
 *         description: Error al crear la categoría
 */
categoryRouter.post('/', CategoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualiza una categoría existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *               isActive:
 *                 type: boolean
 *                 description: Estado de la categoría
 *     responses:
 *       200:
 *         description: Categoría actualizada con éxito
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al actualizar la categoría
 */
categoryRouter.put('/:id', CategoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Elimina una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al eliminar la categoría
 */
categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;
