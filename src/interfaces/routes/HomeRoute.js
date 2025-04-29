import express from 'express';

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Get all the EndPoints for Home
 */

export default class HomeRoute{
    constructor(placeController) {
        this.router = express.Router();
        this.placeController = placeController;
        this.initializeRoutes();

    }
    initializeRoutes() {
        this.getMoreVisitedPlaces();
        this.postRatedByTags();
        this.getRatedByCategory();
    }
    getMoreVisitedPlaces(){
        /**
         * @swagger
         * /home/log-visited/more-visited:
         *   get:
         *     summary: Get the most visited places with their image and visit tags.
         *     tags:
         *       - Home
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
        this.router.get("/log-visited/more-visited", (req, res) => this.placeController.getMoreVisitedPlacesUC(req, res));
    }
    postRatedByTags(){
        /**
         * @swagger
         * /home/top-rated-by-tags:
         *   post:
         *     summary: Obtiene los lugares mejor valorados filtrados por múltiples tags
         *     tags: [Home]
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
        this.router.post("/top-rated-by-tags", (req, res) => this.placeController.getTopRatedPlacesByTagsUC(req, res));
    }
    getRatedByCategory(){
        /**
         * @swagger
         * /home/top-rated/{idCategory}:
         *   get:
         *     summary: Obtiene los lugares mejor valorados de una categoría
         *     tags: [Home]
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
        this.router.get("/top-rated/:idCategory?", (req, res) => this.placeController.getTopRatedPlacesByCategoryUC(req, res));
    }
    getRouter() {
        return this.router;
    }
}
