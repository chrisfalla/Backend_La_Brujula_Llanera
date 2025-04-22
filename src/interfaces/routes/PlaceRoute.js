import express from 'express';
import { PlaceController } from '../controllers/PlaceController.js';
import { PlaceRepository } from '../../infrastructure/repositories/PlaceRepository.js';
import { ReviewRepository } from "../../infrastructure/repositories/ReviewRepository.js";
import { GetTopRatedPlaces } from "../../application/use-cases/GetTopRatedPlaces.js";

const router = express.Router();

const placeRepo = new PlaceRepository();
const reviewRepo = new ReviewRepository();
const useCase = new GetTopRatedPlaces(placeRepo, reviewRepo);
const controller = new PlaceController(useCase);

/**
 * @swagger
 * /places/top-rated/{idCategory}:
 *   get:
 *     summary: Obtiene los lugares mejor valorados de una categoría
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         required: true
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
router.get("/top-rated/:idCategory", (req, res) => controller.getTopRatedPlaces(req, res));


export default router;
