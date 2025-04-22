import express from 'express';
import { PlaceController } from '../controllers/PlaceController.js';

const router = express.Router();

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
router.get("/top-rated/:idCategory?", PlaceController.getTopRatedPlaces);

export default router;
