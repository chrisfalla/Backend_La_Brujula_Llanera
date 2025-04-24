import express from 'express';
import { PlaceController } from '../controllers/PlaceController.js';
import { LogVisitedController } from '../controllers/LogVisitedController.js';

const router = express.Router();

/**
 * @swagger
 * /places/top-rated-by-tags:
 *   post:
 *     summary: Obtiene los lugares mejor valorados filtrados por múltiples tags
 *     tags: [Places]
 *     requestBody:
 *       required: false
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


/**
 * @swagger
 * /places/log-visited/more-visited:
 *   get:
 *     summary: Get the most visited places with their image and visit tags.
 *     tags:
 *       - Places
 *     responses:
 *       200:
 *         description: A list of most visited places.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Parque Central"
 *                   idPlace:
 *                     type: integer
 *                     example: 1
 *                   idImagen:
 *                     type: integer
 *                     example: 10
 *                   tagsAmount:
 *                     type: integer
 *                     example: 152
 *       404:
 *         description: No popular places found.
 *       500:
 *         description: Server error.
 */

router.get("/log-visited/more-visited", LogVisitedController.getMoreVisitedPlaces);



export default router;
