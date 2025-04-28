import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operations related to categories
 */

class CategoryRoute {
  constructor(categoryController) {
    this.router = Router();
    this.categoryController = categoryController;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.createCategory();
    this.getAllCategories();
    this.getDefaultCategory();
    this.getCategoryById();
    this.updateCategory();
    this.deleteCategory();
  }

  getAllCategories() {
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
    this.router.get('/', (req, res) => this.categoryController.getAllCategories(req, res));
  }

  getDefaultCategory() {
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
    this.router.get('/default', (req, res) => this.categoryController.getDefaultCategory(req, res));
  }

  createCategory() {
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
    this.router.post('/', (req, res) => this.categoryController.createCategory(req, res));
  }

  getCategoryById() {
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
    this.router.get('/:id', (req, res) => this.categoryController.getCategoryById(req, res));
  }

  updateCategory() {
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
    this.router.put('/:id', (req, res) => this.categoryController.updateCategory(req, res));
  }

  deleteCategory() {
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
     *         description: Something went wrong while deleting the category
     */
    this.router.delete('/:id', (req, res) => this.categoryController.deleteCategory(req, res));
  }

  getRouter() {
    return this.router; // Retornamos el router con las rutas ya configuradas
  }
}

export default CategoryRoute;
