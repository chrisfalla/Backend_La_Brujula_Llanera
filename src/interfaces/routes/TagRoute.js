import { Router } from 'express';
/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Operations on Tags
 */

class TagRoute {
  constructor(tagController) {
    this.router = Router();
    this.tagController = tagController;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.getAllTags();
    this.getDefaultTags();
    this.getTagById();
    this.createTag();
    this.deleteTag();
    this.updateTag();
  }
  getAllTags(){
    /**
     * @swagger
     * /tags:
     *   get:
     *     summary: Get all Tags
     *     tags: [Tags]
     *     responses:
     *       200:
     *         description: List of Tags
     *       500:
     *         description: Error while getting the Tags
     */
    this.router.get('/', (req, res) => this.tagController.getAllTags(req, res));
  }

  getDefaultTags(){
    /**
     * @swagger
     * /tags/default:
     *   get:
     *     summary: Get default Tags
     *     tags: [Tags]
     *     responses:
     *       200:
     *         description: List of default Tags
     *       500:
     *         description: Error while getting the default  Tags
     */

    this.router.get('/default', (req, res) => this.tagController.getDefaultTags(req, res));
  }

  getTagById(){
    /**
     * @swagger
     * /tags/{id}:
     *   get:
     *     summary: Get a Tag by ID
     *     tags: [Tags]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the Tag
     *     responses:
     *       200:
     *         description: Tag was found
     *       404:
     *         description: Tag not found
     *       500:
     *         description: Error while getting the Tag
     */

    this.router.get('/:id', (req, res) => this.tagController.getTagById(req, res));
  }

  createTag(){
    /**
     * @swagger
     * /tags:
     *   post:
     *     summary: Create a new Tag
     *     tags: [Tags]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Name of the Tag
     *     responses:
     *       201:
     *         description: Tag created successfully
     *       500:
     *         description: Error while creating the Tag
     */
    this.router.post('/', (req, res) => this.tagController.createTag(req, res));
  }

  updateTag(){
    /**
     * @swagger
     * /tags/{id}:
     *   put:
     *     summary: Update a Tag by ID
     *     tags: [Tags]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the Tag
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Name of the Tag
     *     responses:
     *       200:
     *         description: Tag updated successfully
     *       404:
     *         description: Tag not found
     *       500:
     *         description: Something went wrong while updating the Tag
     */
    this.router.put('/:id', (req, res) => this.tagController.updateTag(req, res));
  }

  deleteTag(){
    /**
     * @swagger
     * /tags/{id}:
     *   delete:
     *     summary: Delete a Tag by ID
     *     tags: [Tags]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the Tag
     *     responses:
     *       200:
     *         description: Tag Deleted successfully
     *       404:
     *         description: Tag not found
     *       500:
     *         description: Somenthing went wrong while deleting the Tag
     */

    this.router.delete('/:id', (req, res) => this.tagController.deleteTag(req, res));
  }
  
  getRouter() {
    return this.router;
  }
}

export default TagRoute;
