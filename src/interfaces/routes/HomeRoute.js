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
        this.getRatedByCategory();
        this.PromotedPlacesByTag();
        this.PromotedPlacesByCategory();
    }
    PromotedPlacesByCategory(){
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

    PromotedPlacesByTag(){
        /**
         * @swagger
         * /home/top-rated-by-tags:
         *   get:
         *     summary: Obtiene los lugares mejor valorados filtrados por un tag
         *     tags: [Home]
         *     parameters:
         *       - in: query
         *         name: tagId
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID del tag a filtrar
         *     responses:
         *       200:
         *         description: Lista de lugares mejor valorados con el tag especificado
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
        this.router.get("/top-rated-by-tags", (req, res) => this.placeController.PromotedPlacesByTagCT(req, res));
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
        this.router.get("/top-rated/:idCategory?", (req, res) => this.placeController.PromotedPlacesByCategoryCT(req, res));
    }
    getRouter() {
        return this.router;
    }
}
