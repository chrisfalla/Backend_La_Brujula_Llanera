import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController.js';

const categoryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operations on categories
 */


/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Error while getting the categories
 */
categoryRouter.get('/', CategoryController.getAllCategories);

/**
 * @swagger
 * /categories/default:
 *   get:
 *     summary: Get Default Categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List with Default categories
 *       500:
 *         description: Error while getting the categories
 */
categoryRouter.get('/default', CategoryController.getDefaultCategory);  // Asegúrate de que esta ruta sea la primera

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
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
 *                 description: Name of the Category
 *               isActive:
 *                 type: boolean
 *                 description: Status of the Category
 *               isDefault:
 *                 type: boolean
 *                 description: Default Category
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Error while creating the category
 */
categoryRouter.post('/', CategoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Category
 *     responses:
 *       200:
 *         description: Category was found
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error while getting the Category
 */
categoryRouter.get('/:id', CategoryController.getCategoryById);  // Se mantiene como está


/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the Category
 *               isActive:
 *                 type: boolean
 *                 description: Status of the Category
 *               isDefault:
 *                 type: boolean
 *                 description: Default Category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Something went wrong while updating the category
 */
categoryRouter.put('/:id', CategoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *     responses:
 *       200:
 *         description: Category Deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Somenthing went wrong while deleting the category
 */
categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;
