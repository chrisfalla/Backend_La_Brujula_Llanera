import { Router } from 'express';
import { TagController } from '../controllers/TagController.js';

const tagRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Operations on Tags
 */

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
tagRouter.get('/', TagController.getAllTags);

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
tagRouter.get('/:id', TagController.getTagById);

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
tagRouter.post('/', TagController.createTag);

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
tagRouter.put('/:id', TagController.updateTag);

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
tagRouter.delete('/:id', TagController.deleteTag);

export default tagRouter;

