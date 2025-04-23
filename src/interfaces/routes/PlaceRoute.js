import express from 'express';
import { PlaceController } from '../controllers/PlaceController.js';

const router = express.Router();

/**
 * @swagger
 * /places/top-rated-by-tags:
 *   post:
 *     summary: Obtiene los lugares mejor valorados filtrados por múltiples tags
 *     tags: [Places]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs de los tags a filtrar
 *             example:
 *               tags: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Lista de lugares mejor valorados con los tags especificados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idPlace:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   idCategorie:
 *                     type: integer
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error del servidor
 */

router.post("/top-rated-by-tags", PlaceController.getTopRatedPlacesByTags)




/**
 * @swagger
 * /places/top-rated/{idCategory}:
 *   get:
 *     summary: Obtiene los lugares mejor valorados de una categoría
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Lista de lugares mejor valorados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idPlace:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   idCategorie:
 *                     type: integer
 *       404:
 *         description: No se encontraron lugares
 *       500:
 *         description: Error del servidor
 */
router.get("/top-rated/:idCategory?", PlaceController.getTopRatedPlacesByCategory);

export default router;
